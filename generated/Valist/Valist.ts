// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class MetaUpdate extends ethereum.Event {
  get params(): MetaUpdate__Params {
    return new MetaUpdate__Params(this);
  }
}

export class MetaUpdate__Params {
  _event: MetaUpdate;

  constructor(event: MetaUpdate) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _repoName(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get _signer(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _metaCID(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class OrgCreated extends ethereum.Event {
  get params(): OrgCreated__Params {
    return new OrgCreated__Params(this);
  }
}

export class OrgCreated__Params {
  _event: OrgCreated;

  constructor(event: OrgCreated) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _metaCIDHash(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get _metaCID(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class RepoCreated extends ethereum.Event {
  get params(): RepoCreated__Params {
    return new RepoCreated__Params(this);
  }
}

export class RepoCreated__Params {
  _event: RepoCreated;

  constructor(event: RepoCreated) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _repoNameHash(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get _repoName(): string {
    return this._event.parameters[2].value.toString();
  }

  get _metaCIDHash(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get _metaCID(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class VoteKeyEvent extends ethereum.Event {
  get params(): VoteKeyEvent__Params {
    return new VoteKeyEvent__Params(this);
  }
}

export class VoteKeyEvent__Params {
  _event: VoteKeyEvent;

  constructor(event: VoteKeyEvent) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _repoName(): string {
    return this._event.parameters[1].value.toString();
  }

  get _signer(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _operation(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get _key(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get _sigCount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get _threshold(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class VoteReleaseEvent extends ethereum.Event {
  get params(): VoteReleaseEvent__Params {
    return new VoteReleaseEvent__Params(this);
  }
}

export class VoteReleaseEvent__Params {
  _event: VoteReleaseEvent;

  constructor(event: VoteReleaseEvent) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _repoName(): string {
    return this._event.parameters[1].value.toString();
  }

  get _tag(): string {
    return this._event.parameters[2].value.toString();
  }

  get _releaseCID(): string {
    return this._event.parameters[3].value.toString();
  }

  get _metaCID(): string {
    return this._event.parameters[4].value.toString();
  }

  get _signer(): Address {
    return this._event.parameters[5].value.toAddress();
  }

  get _sigCount(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get _threshold(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class VoteThresholdEvent extends ethereum.Event {
  get params(): VoteThresholdEvent__Params {
    return new VoteThresholdEvent__Params(this);
  }
}

export class VoteThresholdEvent__Params {
  _event: VoteThresholdEvent;

  constructor(event: VoteThresholdEvent) {
    this._event = event;
  }

  get _orgID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _repoName(): string {
    return this._event.parameters[1].value.toString();
  }

  get _signer(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _pendingThreshold(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _sigCount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _threshold(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Valist__getLatestReleaseResult {
  value0: string;
  value1: string;
  value2: string;
  value3: Array<Address>;

  constructor(
    value0: string,
    value1: string,
    value2: string,
    value3: Array<Address>
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromAddressArray(this.value3));
    return map;
  }
}

export class Valist__getPendingVotesResult {
  value0: BigInt;
  value1: Array<Address>;

  constructor(value0: BigInt, value1: Array<Address>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddressArray(this.value1));
    return map;
  }
}

export class Valist__orgsResult {
  value0: BigInt;
  value1: BigInt;
  value2: string;

  constructor(value0: BigInt, value1: BigInt, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }
}

export class Valist__pendingReleaseRequestsResult {
  value0: string;
  value1: string;
  value2: string;

  constructor(value0: string, value1: string, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }
}

export class Valist__releasesResult {
  value0: string;
  value1: string;

  constructor(value0: string, value1: string) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    return map;
  }
}

export class Valist__reposResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;
  value3: string;

  constructor(value0: boolean, value1: BigInt, value2: BigInt, value3: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    return map;
  }
}

export class Valist extends ethereum.SmartContract {
  static bind(address: Address): Valist {
    return new Valist("Valist", address);
  }

  getLatestRelease(
    _orgID: Bytes,
    _repoName: string
  ): Valist__getLatestReleaseResult {
    let result = super.call(
      "getLatestRelease",
      "getLatestRelease(bytes32,string):(string,string,string,address[])",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromString(_repoName)
      ]
    );

    return new Valist__getLatestReleaseResult(
      result[0].toString(),
      result[1].toString(),
      result[2].toString(),
      result[3].toAddressArray()
    );
  }

  try_getLatestRelease(
    _orgID: Bytes,
    _repoName: string
  ): ethereum.CallResult<Valist__getLatestReleaseResult> {
    let result = super.tryCall(
      "getLatestRelease",
      "getLatestRelease(bytes32,string):(string,string,string,address[])",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromString(_repoName)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__getLatestReleaseResult(
        value[0].toString(),
        value[1].toString(),
        value[2].toString(),
        value[3].toAddressArray()
      )
    );
  }

  getPendingReleaseCount(_selector: Bytes): BigInt {
    let result = super.call(
      "getPendingReleaseCount",
      "getPendingReleaseCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );

    return result[0].toBigInt();
  }

  try_getPendingReleaseCount(_selector: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPendingReleaseCount",
      "getPendingReleaseCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPendingVotes(_selector: Bytes): Valist__getPendingVotesResult {
    let result = super.call(
      "getPendingVotes",
      "getPendingVotes(bytes32):(uint256,address[])",
      [ethereum.Value.fromFixedBytes(_selector)]
    );

    return new Valist__getPendingVotesResult(
      result[0].toBigInt(),
      result[1].toAddressArray()
    );
  }

  try_getPendingVotes(
    _selector: Bytes
  ): ethereum.CallResult<Valist__getPendingVotesResult> {
    let result = super.tryCall(
      "getPendingVotes",
      "getPendingVotes(bytes32):(uint256,address[])",
      [ethereum.Value.fromFixedBytes(_selector)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__getPendingVotesResult(
        value[0].toBigInt(),
        value[1].toAddressArray()
      )
    );
  }

  getReleaseTags(
    _selector: Bytes,
    _page: BigInt,
    _resultsPerPage: BigInt
  ): Array<string> {
    let result = super.call(
      "getReleaseTags",
      "getReleaseTags(bytes32,uint256,uint256):(string[])",
      [
        ethereum.Value.fromFixedBytes(_selector),
        ethereum.Value.fromUnsignedBigInt(_page),
        ethereum.Value.fromUnsignedBigInt(_resultsPerPage)
      ]
    );

    return result[0].toStringArray();
  }

  try_getReleaseTags(
    _selector: Bytes,
    _page: BigInt,
    _resultsPerPage: BigInt
  ): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getReleaseTags",
      "getReleaseTags(bytes32,uint256,uint256):(string[])",
      [
        ethereum.Value.fromFixedBytes(_selector),
        ethereum.Value.fromUnsignedBigInt(_page),
        ethereum.Value.fromUnsignedBigInt(_resultsPerPage)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getRepoNames(
    _orgID: Bytes,
    _page: BigInt,
    _resultsPerPage: BigInt
  ): Array<string> {
    let result = super.call(
      "getRepoNames",
      "getRepoNames(bytes32,uint256,uint256):(string[])",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromUnsignedBigInt(_page),
        ethereum.Value.fromUnsignedBigInt(_resultsPerPage)
      ]
    );

    return result[0].toStringArray();
  }

  try_getRepoNames(
    _orgID: Bytes,
    _page: BigInt,
    _resultsPerPage: BigInt
  ): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getRepoNames",
      "getRepoNames(bytes32,uint256,uint256):(string[])",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromUnsignedBigInt(_page),
        ethereum.Value.fromUnsignedBigInt(_resultsPerPage)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getRoleMembers(_selector: Bytes): Array<Address> {
    let result = super.call(
      "getRoleMembers",
      "getRoleMembers(bytes32):(address[])",
      [ethereum.Value.fromFixedBytes(_selector)]
    );

    return result[0].toAddressArray();
  }

  try_getRoleMembers(_selector: Bytes): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getRoleMembers",
      "getRoleMembers(bytes32):(address[])",
      [ethereum.Value.fromFixedBytes(_selector)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getRoleRequestCount(_selector: Bytes): BigInt {
    let result = super.call(
      "getRoleRequestCount",
      "getRoleRequestCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );

    return result[0].toBigInt();
  }

  try_getRoleRequestCount(_selector: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getRoleRequestCount",
      "getRoleRequestCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getThresholdRequestCount(_selector: Bytes): BigInt {
    let result = super.call(
      "getThresholdRequestCount",
      "getThresholdRequestCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );

    return result[0].toBigInt();
  }

  try_getThresholdRequestCount(_selector: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getThresholdRequestCount",
      "getThresholdRequestCount(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_selector)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isOrgAdmin(_orgID: Bytes, _address: Address): boolean {
    let result = super.call(
      "isOrgAdmin",
      "isOrgAdmin(bytes32,address):(bool)",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromAddress(_address)
      ]
    );

    return result[0].toBoolean();
  }

  try_isOrgAdmin(
    _orgID: Bytes,
    _address: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isOrgAdmin",
      "isOrgAdmin(bytes32,address):(bool)",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromAddress(_address)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isRepoDev(_orgID: Bytes, _repoName: string, _address: Address): boolean {
    let result = super.call(
      "isRepoDev",
      "isRepoDev(bytes32,string,address):(bool)",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromString(_repoName),
        ethereum.Value.fromAddress(_address)
      ]
    );

    return result[0].toBoolean();
  }

  try_isRepoDev(
    _orgID: Bytes,
    _repoName: string,
    _address: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isRepoDev",
      "isRepoDev(bytes32,string,address):(bool)",
      [
        ethereum.Value.fromFixedBytes(_orgID),
        ethereum.Value.fromString(_repoName),
        ethereum.Value.fromAddress(_address)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  orgCount(): BigInt {
    let result = super.call("orgCount", "orgCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_orgCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("orgCount", "orgCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  orgIDs(param0: BigInt): Bytes {
    let result = super.call("orgIDs", "orgIDs(uint256):(bytes32)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBytes();
  }

  try_orgIDs(param0: BigInt): ethereum.CallResult<Bytes> {
    let result = super.tryCall("orgIDs", "orgIDs(uint256):(bytes32)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  orgs(param0: Bytes): Valist__orgsResult {
    let result = super.call("orgs", "orgs(bytes32):(uint256,uint256,string)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);

    return new Valist__orgsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toString()
    );
  }

  try_orgs(param0: Bytes): ethereum.CallResult<Valist__orgsResult> {
    let result = super.tryCall(
      "orgs",
      "orgs(bytes32):(uint256,uint256,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__orgsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toString()
      )
    );
  }

  pendingReleaseRequests(
    param0: Bytes,
    param1: BigInt
  ): Valist__pendingReleaseRequestsResult {
    let result = super.call(
      "pendingReleaseRequests",
      "pendingReleaseRequests(bytes32,uint256):(string,string,string)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new Valist__pendingReleaseRequestsResult(
      result[0].toString(),
      result[1].toString(),
      result[2].toString()
    );
  }

  try_pendingReleaseRequests(
    param0: Bytes,
    param1: BigInt
  ): ethereum.CallResult<Valist__pendingReleaseRequestsResult> {
    let result = super.tryCall(
      "pendingReleaseRequests",
      "pendingReleaseRequests(bytes32,uint256):(string,string,string)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__pendingReleaseRequestsResult(
        value[0].toString(),
        value[1].toString(),
        value[2].toString()
      )
    );
  }

  pendingRoleRequests(param0: Bytes, param1: BigInt): Address {
    let result = super.call(
      "pendingRoleRequests",
      "pendingRoleRequests(bytes32,uint256):(address)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_pendingRoleRequests(
    param0: Bytes,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "pendingRoleRequests",
      "pendingRoleRequests(bytes32,uint256):(address)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  pendingThresholdRequests(param0: Bytes, param1: BigInt): BigInt {
    let result = super.call(
      "pendingThresholdRequests",
      "pendingThresholdRequests(bytes32,uint256):(uint256)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_pendingThresholdRequests(
    param0: Bytes,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pendingThresholdRequests",
      "pendingThresholdRequests(bytes32,uint256):(uint256)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  releases(param0: Bytes): Valist__releasesResult {
    let result = super.call("releases", "releases(bytes32):(string,string)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);

    return new Valist__releasesResult(
      result[0].toString(),
      result[1].toString()
    );
  }

  try_releases(param0: Bytes): ethereum.CallResult<Valist__releasesResult> {
    let result = super.tryCall(
      "releases",
      "releases(bytes32):(string,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__releasesResult(value[0].toString(), value[1].toString())
    );
  }

  repos(param0: Bytes): Valist__reposResult {
    let result = super.call(
      "repos",
      "repos(bytes32):(bool,uint256,uint256,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new Valist__reposResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toString()
    );
  }

  try_repos(param0: Bytes): ethereum.CallResult<Valist__reposResult> {
    let result = super.tryCall(
      "repos",
      "repos(bytes32):(bool,uint256,uint256,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Valist__reposResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toString()
      )
    );
  }

  roleModifiedTimestamps(param0: Bytes): BigInt {
    let result = super.call(
      "roleModifiedTimestamps",
      "roleModifiedTimestamps(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toBigInt();
  }

  try_roleModifiedTimestamps(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "roleModifiedTimestamps",
      "roleModifiedTimestamps(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  versionRecipient(): string {
    let result = super.call(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );

    return result[0].toString();
  }

  try_versionRecipient(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get metaTxForwarder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClearPendingKeyCall extends ethereum.Call {
  get inputs(): ClearPendingKeyCall__Inputs {
    return new ClearPendingKeyCall__Inputs(this);
  }

  get outputs(): ClearPendingKeyCall__Outputs {
    return new ClearPendingKeyCall__Outputs(this);
  }
}

export class ClearPendingKeyCall__Inputs {
  _call: ClearPendingKeyCall;

  constructor(call: ClearPendingKeyCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _operation(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _key(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _requestIndex(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class ClearPendingKeyCall__Outputs {
  _call: ClearPendingKeyCall;

  constructor(call: ClearPendingKeyCall) {
    this._call = call;
  }
}

export class ClearPendingReleaseCall extends ethereum.Call {
  get inputs(): ClearPendingReleaseCall__Inputs {
    return new ClearPendingReleaseCall__Inputs(this);
  }

  get outputs(): ClearPendingReleaseCall__Outputs {
    return new ClearPendingReleaseCall__Outputs(this);
  }
}

export class ClearPendingReleaseCall__Inputs {
  _call: ClearPendingReleaseCall;

  constructor(call: ClearPendingReleaseCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _tag(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _releaseCID(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _metaCID(): string {
    return this._call.inputValues[4].value.toString();
  }

  get _requestIndex(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class ClearPendingReleaseCall__Outputs {
  _call: ClearPendingReleaseCall;

  constructor(call: ClearPendingReleaseCall) {
    this._call = call;
  }
}

export class ClearPendingThresholdCall extends ethereum.Call {
  get inputs(): ClearPendingThresholdCall__Inputs {
    return new ClearPendingThresholdCall__Inputs(this);
  }

  get outputs(): ClearPendingThresholdCall__Outputs {
    return new ClearPendingThresholdCall__Outputs(this);
  }
}

export class ClearPendingThresholdCall__Inputs {
  _call: ClearPendingThresholdCall;

  constructor(call: ClearPendingThresholdCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _threshold(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _requestIndex(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class ClearPendingThresholdCall__Outputs {
  _call: ClearPendingThresholdCall;

  constructor(call: ClearPendingThresholdCall) {
    this._call = call;
  }
}

export class CreateOrganizationCall extends ethereum.Call {
  get inputs(): CreateOrganizationCall__Inputs {
    return new CreateOrganizationCall__Inputs(this);
  }

  get outputs(): CreateOrganizationCall__Outputs {
    return new CreateOrganizationCall__Outputs(this);
  }
}

export class CreateOrganizationCall__Inputs {
  _call: CreateOrganizationCall;

  constructor(call: CreateOrganizationCall) {
    this._call = call;
  }

  get _orgMeta(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class CreateOrganizationCall__Outputs {
  _call: CreateOrganizationCall;

  constructor(call: CreateOrganizationCall) {
    this._call = call;
  }
}

export class CreateRepositoryCall extends ethereum.Call {
  get inputs(): CreateRepositoryCall__Inputs {
    return new CreateRepositoryCall__Inputs(this);
  }

  get outputs(): CreateRepositoryCall__Outputs {
    return new CreateRepositoryCall__Outputs(this);
  }
}

export class CreateRepositoryCall__Inputs {
  _call: CreateRepositoryCall;

  constructor(call: CreateRepositoryCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _repoMeta(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class CreateRepositoryCall__Outputs {
  _call: CreateRepositoryCall;

  constructor(call: CreateRepositoryCall) {
    this._call = call;
  }
}

export class SetOrgMetaCall extends ethereum.Call {
  get inputs(): SetOrgMetaCall__Inputs {
    return new SetOrgMetaCall__Inputs(this);
  }

  get outputs(): SetOrgMetaCall__Outputs {
    return new SetOrgMetaCall__Outputs(this);
  }
}

export class SetOrgMetaCall__Inputs {
  _call: SetOrgMetaCall;

  constructor(call: SetOrgMetaCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _metaCID(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetOrgMetaCall__Outputs {
  _call: SetOrgMetaCall;

  constructor(call: SetOrgMetaCall) {
    this._call = call;
  }
}

export class SetRepoMetaCall extends ethereum.Call {
  get inputs(): SetRepoMetaCall__Inputs {
    return new SetRepoMetaCall__Inputs(this);
  }

  get outputs(): SetRepoMetaCall__Outputs {
    return new SetRepoMetaCall__Outputs(this);
  }
}

export class SetRepoMetaCall__Inputs {
  _call: SetRepoMetaCall;

  constructor(call: SetRepoMetaCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _metaCID(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class SetRepoMetaCall__Outputs {
  _call: SetRepoMetaCall;

  constructor(call: SetRepoMetaCall) {
    this._call = call;
  }
}

export class VoteKeyCall extends ethereum.Call {
  get inputs(): VoteKeyCall__Inputs {
    return new VoteKeyCall__Inputs(this);
  }

  get outputs(): VoteKeyCall__Outputs {
    return new VoteKeyCall__Outputs(this);
  }
}

export class VoteKeyCall__Inputs {
  _call: VoteKeyCall;

  constructor(call: VoteKeyCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _operation(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _key(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class VoteKeyCall__Outputs {
  _call: VoteKeyCall;

  constructor(call: VoteKeyCall) {
    this._call = call;
  }
}

export class VoteReleaseCall extends ethereum.Call {
  get inputs(): VoteReleaseCall__Inputs {
    return new VoteReleaseCall__Inputs(this);
  }

  get outputs(): VoteReleaseCall__Outputs {
    return new VoteReleaseCall__Outputs(this);
  }
}

export class VoteReleaseCall__Inputs {
  _call: VoteReleaseCall;

  constructor(call: VoteReleaseCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _tag(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _releaseCID(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _metaCID(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class VoteReleaseCall__Outputs {
  _call: VoteReleaseCall;

  constructor(call: VoteReleaseCall) {
    this._call = call;
  }
}

export class VoteThresholdCall extends ethereum.Call {
  get inputs(): VoteThresholdCall__Inputs {
    return new VoteThresholdCall__Inputs(this);
  }

  get outputs(): VoteThresholdCall__Outputs {
    return new VoteThresholdCall__Outputs(this);
  }
}

export class VoteThresholdCall__Inputs {
  _call: VoteThresholdCall;

  constructor(call: VoteThresholdCall) {
    this._call = call;
  }

  get _orgID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _threshold(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class VoteThresholdCall__Outputs {
  _call: VoteThresholdCall;

  constructor(call: VoteThresholdCall) {
    this._call = call;
  }
}
