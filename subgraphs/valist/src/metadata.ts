import { ipfs, json, JSONValueKind, TypedMap, JSONValue } from '@graphprotocol/graph-ts';

export function parseMetaJSON(uri: string): TypedMap<string, JSONValue> {
  const empty = new TypedMap<string, JSONValue>();
  if (!uri.includes('/ipfs/')) return empty;

  const index = uri.lastIndexOf('/ipfs/');
  const hash = uri.substring(index+6);

  const bytes = ipfs.cat(hash);
  if (!bytes) return empty;

  const value = json.fromBytes(bytes);
  if (value.kind != JSONValueKind.OBJECT) return empty;

  return value.toObject();
}

export function parseKeywords(metaJSON: TypedMap<string, JSONValue>): Array<string> {
  const empty = new Array<string>();
  if (!metaJSON.isSet('keywords')) return empty;

  const value = metaJSON.mustGet('keywords');
  if (value.kind != JSONValueKind.ARRAY) return empty;

  return value.toArray()
    .filter(v => v.kind == JSONValueKind.STRING)
    .map<string>(v => v.toString())
    .reduce((s, v) => s.add(v), new Set<string>())
    .values();
}
