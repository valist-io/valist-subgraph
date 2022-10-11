import { BigInt } from "@graphprotocol/graph-ts";
import { User, License } from "../generated/schema";

export function toPaddedHex(input: BigInt): string {
  return "0x" + input.toHex().substr(2).padStart(64, '0');
}

export function updateLicenseBalance(userID: string, projectID: string, amount: BigInt): void {
  const licenseID = userID + '-' + projectID;
  
  let user = User.load(userID);
  if (user === null) {
    user = new User(userID);
    user.save();
  }

  let license = License.load(licenseID);
  if (license === null) {
    license = new License(licenseID);
    license.user = userID;
    license.project = projectID;
  }

  license.balance += amount;
  license.save();
}