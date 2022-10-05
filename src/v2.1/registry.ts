import { toPaddedHex } from "../common";

import {
  Account, 
  Release, 
  Project, 
  User, 
  Log 
} from "../../generated/schema";

import {
  AccountCreated,
  AccountUpdated,
  AccountMemberAdded,
  AccountMemberRemoved,
  ProjectCreated,
  ProjectUpdated,
  ProjectMemberAdded,
  ProjectMemberRemoved,
  ReleaseCreated,
  ReleaseApproved,
  ReleaseRevoked
} from "../../generated/v2.1/Registry/Registry";

export function handleAccountCreated(event: AccountCreated): void {
  const accountID = toPaddedHex(event.params._accountID);

  let account = Account.load(accountID);
  if (account === null) {
    account = new Account(accountID);
    account.logIndex = event.logIndex;
    account.blockTime = event.block.timestamp;
    account.blockNumber = event.block.number;
  }

  account.name = event.params._name;
  account.metaURI = event.params._metaURI;
  account.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'AccountCreated';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountUpdated(event: AccountUpdated): void {
  const accountID = toPaddedHex(event.params._accountID);
  const account = Account.load(accountID);
  if (account === null) return;

  account.metaURI = event.params._metaURI;
  account.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'AccountUpdated';
  log.account = accountID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountMemberAdded(event: AccountMemberAdded): void {
  const accountID = toPaddedHex(event.params._accountID);
  const userID = event.params._member.toHex();

  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const accounts = user.accounts.reduce((s, v) => s.add(v), new Set<string>());
  accounts.add(accountID);

  const members = account.members.reduce((s, v) => s.add(v), new Set<string>());
  members.add(event.params._member.toHex());

  user.accounts = accounts.values();
  user.save();

  account.members = members.values();
  account.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'AccountMemberAdded';
  log.account = accountID;
  log.member = userID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleAccountMemberRemoved(event: AccountMemberRemoved): void {
  const accountID = toPaddedHex(event.params._accountID);
  const userID = event.params._member.toHex();

  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const accounts = user.accounts.reduce((s, v) => s.add(v), new Set<string>());
  accounts.delete(accountID);

  const members = account.members.reduce((s, v) => s.add(v), new Set<string>());;
  members.delete(event.params._member.toHex());

  user.accounts = accounts.values();
  user.save();
  
  account.members = members.values();
  account.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'AccountMemberRemoved';
  log.account = accountID;
  log.member = userID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectCreated(event: ProjectCreated): void {
  const accountID = toPaddedHex(event.params._accountID);
  const projectID = toPaddedHex(event.params._projectID);

  let project = Project.load(projectID);
  if (project === null) {
    project = new Project(projectID);
    project.logIndex = event.logIndex;
    project.blockTime = event.block.timestamp;
    project.blockNumber = event.block.number;
  }

  project.name = event.params._name;
  project.account = accountID;
  project.metaURI = event.params._metaURI;
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ProjectCreated';
  log.account = accountID;
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectUpdated(event: ProjectUpdated): void {
  const projectID = toPaddedHex(event.params._projectID);
  const project = Project.load(projectID);
  if (project === null) return;

  project.metaURI = event.params._metaURI;
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ProjectUpdated';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectMemberAdded(event: ProjectMemberAdded): void {
  const projectID = toPaddedHex(event.params._projectID);
  const userID = event.params._member.toHex();

  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.add(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.add(userID);

  user.projects = projects.values();
  user.save();

  project.members = members.values();
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ProjectMemberAdded';
  log.project = projectID;
  log.member = userID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProjectMemberRemoved(event: ProjectMemberRemoved): void {
  const projectID = toPaddedHex(event.params._projectID);
  const userID = event.params._member.toHex();

  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.delete(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.delete(userID);

  user.projects = projects.values();
  user.save();

  project.members = members.values();
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ProjectMemberRemoved';
  log.project = projectID;
  log.member = userID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseCreated(event: ReleaseCreated): void {
  const projectID = toPaddedHex(event.params._projectID);
  const releaseID = toPaddedHex(event.params._releaseID);

  let release = Release.load(releaseID);
  if (release === null) {
    release = new Release(releaseID);
    release.logIndex = event.logIndex;
    release.blockTime = event.block.timestamp;
    release.blockNumber = event.block.number;
    release.sender = event.params._sender.toHex();
  }

  release.name = event.params._name;
  release.project = projectID;
  release.metaURI = event.params._metaURI;
  release.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ReleaseCreated';
  log.project = projectID;
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseApproved(event: ReleaseApproved): void {
  const releaseID = toPaddedHex(event.params._releaseID);
  const release = Release.load(releaseID);
  if (release === null) return;

  const signers = release.signers.reduce((s, v) => s.add(v), new Set<string>());
  signers.add(event.params._sender.toHex());

  release.signers = signers.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ReleaseApproved';
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleReleaseRevoked(event: ReleaseRevoked): void {
  const releaseID = toPaddedHex(event.params._releaseID);
  const release = Release.load(releaseID);
  if (release === null) return;

  const signers = release.signers.reduce((s, v) => s.add(v), new Set<string>());
  signers.delete(event.params._sender.toHex());

  release.signers = signers.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ReleaseRevoked';
  log.release = releaseID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}
