import { BigInt, dataSource } from "@graphprotocol/graph-ts";
import { toPaddedHex } from "../common";

import { 
  Account, 
  Release, 
  Project, 
  User, 
  Log 
} from "../../generated/schema";

import {
  Registry,
  TeamCreated,
  TeamUpdated,
  TeamMemberAdded,
  TeamMemberRemoved,
  ProjectCreated,
  ProjectUpdated,
  ProjectMemberAdded,
  ProjectMemberRemoved,
  ReleaseCreated,
  ReleaseApproved,
  ReleaseRejected
} from "../../generated/v2/Registry/Registry";

export function handleTeamCreated(event: TeamCreated): void {
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);

  const accountID = toPaddedHex(_accountID);
  const account = new Account(accountID);
  account.name = event.params._teamName;
  account.metaURI = event.params._metaURI;
  account.logIndex = event.logIndex;
  account.blockTime = event.block.timestamp;
  account.blockNumber = event.block.number;
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

export function handleTeamUpdated(event: TeamUpdated): void {
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);

  const accountID = toPaddedHex(_accountID);
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

export function handleTeamMemberAdded(event: TeamMemberAdded): void {
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);

  const accountID = toPaddedHex(_accountID);
  const userID = event.params._member.toHex();

  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(userID);
  if (user == null) user = new User(userID);

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

export function handleTeamMemberRemoved(event: TeamMemberRemoved): void {
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);

  const accountID = toPaddedHex(_accountID);
  const userID = event.params._member.toHex();

  const account = Account.load(accountID);
  if (account === null) return;

  let user = User.load(userID);
  if (user == null) user = new User(userID);

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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);
  
  const accountID = toPaddedHex(_accountID);
  const projectID = toPaddedHex(_projectID);

  const project = new Project(projectID);
  project.name = event.params._projectName;
  project.account = accountID;
  project.metaURI = event.params._metaURI;
  project.logIndex = event.logIndex;
  project.blockTime = event.block.timestamp;
  project.blockNumber = event.block.number;
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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);
  
  const accountID = toPaddedHex(_accountID);
  const projectID = toPaddedHex(_projectID);

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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);

  const accountID = toPaddedHex(_accountID);
  const projectID = toPaddedHex(_projectID);
  const userID = event.params._member.toHex();

  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.add(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.add(event.params._member.toHex());

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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);

  const accountID = toPaddedHex(_accountID);
  const projectID = toPaddedHex(_projectID);
  const userID = event.params._member.toHex();

  const project = Project.load(projectID);
  if (project === null) return;

  let user = User.load(userID);
  if (user === null) user = new User(userID);

  const projects = user.projects.reduce((s, v) => s.add(v), new Set<string>());
  projects.delete(projectID);

  const members = project.members.reduce((s, v) => s.add(v), new Set<string>());
  members.delete(event.params._member.toHex());

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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);
  const _releaseID = registry.getReleaseID(_projectID, event.params._releaseName);

  const accountID = toPaddedHex(_accountID);
  const projectID = toPaddedHex(_projectID);
  const releaseID = toPaddedHex(_releaseID);

  const release = new Release(releaseID);
  release.name = event.params._releaseName;
  release.project = projectID;
  release.metaURI = event.params._metaURI;
  release.logIndex = event.logIndex;
  release.blockTime = event.block.timestamp;
  release.blockNumber = event.block.number;
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
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);
  const _releaseID = registry.getReleaseID(_projectID, event.params._releaseName);

  const releaseID = toPaddedHex(_releaseID);
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

export function handleReleaseRejected(event: ReleaseRejected): void {
  if (isMigrated(event.block.number)) return;

  const registry = Registry.bind(event.address);
  const _accountID = registry.getTeamID(event.params._teamName);
  const _projectID = registry.getProjectID(_accountID, event.params._projectName);
  const _releaseID = registry.getReleaseID(_projectID, event.params._releaseName);

  const releaseID = toPaddedHex(_releaseID);
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

function isMigrated(blockNumber: BigInt): boolean {
  const network = dataSource.network();
  if (network === 'mumbai') {
    return blockNumber >= BigInt.fromU64(25936829);
  }
  if (network === 'matic') {
    return blockNumber >= BigInt.fromU64(25936829);
  }
  return false;
}
