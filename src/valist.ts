import {
  Valist,
  MetaUpdate,
  OrgCreated,
  RepoCreated,
  VoteKeyEvent,
  VoteReleaseEvent,
  VoteThresholdEvent
} from "../generated/Valist/Valist"
import { Organization, OrgMeta, Release, Repository } from "../generated/schema"
// import { ipfs, json } from "@graphprotocol/graph-ts";

export function handleMetaUpdate(event: MetaUpdate): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let org = Organization.load(event.params._orgID.toHexString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (org) {
    org.metaCID = event.params._metaCID;
    org.save();
  }

  // Entities can be written to the store with `.save()`

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getLatestRelease(...)
  // - contract.getPendingReleaseCount(...)
  // - contract.getPendingVotes(...)
  // - contract.getReleaseTags(...)
  // - contract.getRepoNames(...)
  // - contract.getRoleMembers(...)
  // - contract.getRoleRequestCount(...)
  // - contract.getThresholdRequestCount(...)
  // - contract.isOrgAdmin(...)
  // - contract.isRepoDev(...)
  // - contract.isTrustedForwarder(...)
  // - contract.orgCount(...)
  // - contract.orgIDs(...)
  // - contract.orgs(...)
  // - contract.pendingReleaseRequests(...)
  // - contract.pendingRoleRequests(...)
  // - contract.pendingThresholdRequests(...)
  // - contract.releases(...)
  // - contract.repos(...)
  // - contract.roleModifiedTimestamps(...)
  // - contract.versionRecipient(...)
}

export function handleOrgCreated(event: OrgCreated): void {
  const org = new Organization(event.params._orgID.toHexString());
  // const orgMeta = new OrgMeta(event.params._orgID.toHexString());

  org.orgID = event.params._orgID;

  org.metaCID = event.params._metaCID;

  // const metaBytes = ipfs.cat(org.metaCID);
  // if (metaBytes) {
  //   const metaJSON = json.fromBytes(metaBytes).toObject();
    
  //   const name = metaJSON.get("name");
  //   if (name) orgMeta.name = name.toString();

  //   const description = metaJSON.get("description");
  //   if (description) orgMeta.description = description.toString();

  //   const homepage = metaJSON.get("homepage");
  //   if (homepage) orgMeta.homepage = homepage.toString();
  // }
  
  // org.meta = orgMeta.id;
  // orgMeta.save();
  org.save();
}

export function handleRepoCreated(event: RepoCreated): void {
  const org = Organization.load(event.params._orgID.toHexString());

  if (!org) return

  const repoID = `${org.name}/${event.params._repoName}`;
  let repo = new Repository(repoID);
  repo.org = event.params._orgID.toHexString();

  repo.name = event.params._repoName;
  repo.metaCID = event.params._metaCID;
  repo.save();
}

export function handleVoteKeyEvent(event: VoteKeyEvent): void {}

export function handleVoteReleaseEvent(event: VoteReleaseEvent): void {
    const org = Organization.load(event.params._orgID.toHexString());

    if (!org) return

    const repo = Repository.load(`${org.name}/${event.params._repoName}`);

    if (!repo) return

    const releaseID = `${org.name}/${event.params._repoName}/${event.params._tag}`;

    let release = Release.load(releaseID);

    if (!release) {
      release = new Release(releaseID);
    }

    release.repo = `${org.name}/${event.params._repoName}`;
    release.tag = event.params._tag;
    release.releaseCID = event.params._releaseCID;

    let signers = release.signers;
    signers.push(event.params._signer.toHexString());
    release.signers = signers;
    release.save();
}

export function handleVoteThresholdEvent(event: VoteThresholdEvent): void {}
