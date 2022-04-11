import { BigInt } from "@graphprotocol/graph-ts";

export function toPaddedHex(input: BigInt): string {
    return "0x" + input.toHex().substr(2).padStart(64, '0');
}