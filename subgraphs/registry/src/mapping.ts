import { BigInt } from "@graphprotocol/graph-ts";
import { Account, Release, Project, User, Log } from "../generated/schema";
import {
  AccountCreated,
  AccountUpdated,
  AccountMemberAdded,
  AccountMemberRemoved,
  BeneficiaryUpdated,
  ProjectCreated,
  ProjectUpdated,
  ProjectMemberAdded,
  ProjectMemberRemoved,
  ReleaseCreated,
  ReleaseApproved,
  ReleaseRevoked
} from "../generated/Registry/Registry";

export function handleAccountCreated(event: AccountCreated): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const account = new Account(accountID);
  account.name = event.params._name;
  account.metaURI = event.params._metaURI;
  account.beneficiary = event.params._beneficiary.toHex();
  account.logIndex = event.logIndex;
  account.blockNumber = event.block.number;
  account.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'AccountCreated';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountUpdated(event: AccountUpdated): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const account = Account.load(accountID);
  if (account === null) return;

  account.metaURI = event.params._metaURI;
  account.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'AccountUpdated';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountMemberAdded(event: AccountMemberAdded): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(event.params._member.toHex());
  if (user === null) user = new User(event.params._member.toHex());

  const accounts = user.accounts.reduce((s, v) => s.add(v), new Set<string>());
  accounts.add(accountID);

  const members = account.members.reduce((s, v) => s.add(v), new Set<string>());
  members.add(event.params._member.toHex());

  user.accounts = accounts.values();
  user.save();

  account.members = members.values();
  account.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'AccountMemberAdded';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountMemberRemoved(event: AccountMemberRemoved): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(event.params._member.toHex());
  if (user === null) user = new User(event.params._member.toHex());

  const accounts = user.accounts.reduce((s, v) => s.add(v), new Set<string>());
  accounts.delete(accountID);

  const members = account.members.reduce((s, v) => s.add(v), new Set<string>());;
  members.delete(event.params._member.toHex());

  user.accounts = accounts.values();
  user.save();
  
  account.members = members.values();
  account.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'AccountMemberRemoved';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleBeneficiaryUpdated(event: BeneficiaryUpdated): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const account = Account.load(accountID);
  if (account === null) return;

  account.beneficiary = event.params._beneficiary.toHex();
  account.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'BeneficiaryUpdated';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectCreated(event: ProjectCreated): void {
  const accountID = _toPaddedHex(event.params._accountID);
  const projectID = _toPaddedHex(event.params._projectID);

  const project = new Project(projectID);
  project.name = event.params._name;
  project.account = accountID;
  project.metaURI = event.params._metaURI;
  project.logIndex = event.logIndex;
  project.blockNumber = event.block.number;
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectCreated';
  log.account = accountID;
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectUpdated(event: ProjectUpdated): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const project = Project.load(projectID);
  if (project === null) return;

  project.metaURI = event.params._metaURI;
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectUpdated';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectMemberAdded(event: ProjectMemberAdded): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(event.params._member.toHex());
  if (user === null) user = new User(event.params._member.toHex());

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.add(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.add(event.params._member.toHex());

  user.projects = projects.values();
  user.save();

  project.members = members.values();
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectMemberAdded';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectMemberRemoved(event: ProjectMemberRemoved): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(event.params._member.toHex());
  if (user === null) user = new User(event.params._member.toHex());

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.delete(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.delete(event.params._member.toHex());

  user.projects = projects.values();
  user.save();

  project.members = members.values();
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectMemberRemoved';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseCreated(event: ReleaseCreated): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const releaseID = _toPaddedHex(event.params._releaseID);

  const release = new Release(releaseID);
  release.name = event.params._name;
  release.project = projectID;
  release.metaURI = event.params._metaURI;
  release.logIndex = event.logIndex;
  release.blockNumber = event.block.number;
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseCreated';
  log.project = projectID;
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseApproved(event: ReleaseApproved): void {
  const releaseID = _toPaddedHex(event.params._releaseID);
  const release = Release.load(releaseID);
  if (release === null) return;

  const signers = release.signers.reduce((s, v) => s.add(v), new Set<string>());
  signers.add(event.params._sender.toHex());

  release.signers = signers.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseApproved';
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseRevoked(event: ReleaseRevoked): void {
  const releaseID = _toPaddedHex(event.params._releaseID);
  const release = Release.load(releaseID);
  if (release === null) return;

  const signers = release.signers.reduce((s, v) => s.add(v), new Set<string>());
  signers.delete(event.params._sender.toHex());

  release.signers = signers.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseRevoked';
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockNumber = event.block.number;
  log.save();
}

function _toPaddedHex(input: BigInt): string {
    return "0x" + input.toHex().substr(2).padStart(64, '0');
}
