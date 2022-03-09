import * as schema from "../generated/schema";
import { License, LicenseCreated } from "../generated/License/License";

export function handleLicenseCreated(event: LicenseCreated): void {
  const contract = License.bind(event.address);
  const metaURI = contract.metaByID(event.params._licenseID);

  const license = new schema.License(event.params._licenseID.toHex());
  license.name = event.params._licenseName;
  license.team = event.params._teamName;
  license.project = event.params._projectName;
  license.metaURI = metaURI;
  license.mintPrice = event.params._mintPrice.toHex();
  license.createdTx = event.transaction.hash.toHex();
  license.updatedTx = event.transaction.hash.toHex();
  license.save();

  const log = new schema.Log(event.transaction.hash.toHex());
  log.type = 'LicenseCreated';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.license = event.params._licenseName;
  // log.sender = event.params._sender.toHex(); TODO
  log.save();
}
