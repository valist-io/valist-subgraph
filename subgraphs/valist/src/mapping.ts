import { ipfs, json, JSONValueKind } from '@graphprotocol/graph-ts';
import { Team, Release, Project, User, Log } from "../generated/schema";
import {
  Valist,
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
} from "../generated/Valist/Valist";

export function handleTeamCreated(event: TeamCreated): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);

  const team = new Team(teamID.toHex());
  team.name = event.params._teamName;
  team.metaURI = event.params._metaURI;
  team.createdTx = event.transaction.hash.toHex();
  team.updatedTx = event.transaction.hash.toHex();
  team.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'TeamCreated';
  log.team = event.params._teamName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleTeamUpdated(event: TeamUpdated): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);

  let team = Team.load(teamID.toHex());
  if (team == null) team = new Team(teamID.toHex());

  team.name = event.params._teamName;
  team.metaURI = event.params._metaURI;
  team.updatedTx = event.transaction.hash.toHex();
  team.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'TeamUpdated';
  log.team = event.params._teamName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleTeamMemberAdded(event: TeamMemberAdded): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);

  let team = Team.load(teamID.toHex());
  if (team == null) team = new Team(teamID.toHex());

  let user = User.load(event.params._member.toHex());
  if (user == null) user = new User(event.params._member.toHex());

  const teams = _arrayToSet(user.teams);
  teams.add(teamID.toHex());

  const members = _arrayToSet(team.members);
  members.add(event.params._member.toHex());

  user.teams = teams.values();
  user.save();

  team.name = event.params._teamName;
  team.members = members.values();
  team.updatedTx = event.transaction.hash.toHex();
  team.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'TeamMemberAdded';
  log.team = event.params._teamName;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.save();
}

export function handleTeamMemberRemoved(event: TeamMemberRemoved): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);

  let team = Team.load(teamID.toHex());
  if (team == null) team = new Team(teamID.toHex());

  let user = User.load(event.params._member.toHex());
  if (user == null) user = new User(event.params._member.toHex());

  const teams = _arrayToSet(user.projects);
  teams.delete(teamID.toHex());

  const members = _arrayToSet(team.members);
  members.delete(event.params._member.toHex());

  user.teams = teams.values();
  user.save();

  team.name = event.params._teamName;
  team.members = members.values();
  team.updatedTx = event.transaction.hash.toHex();
  team.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'TeamMemberRemoved';
  log.team = event.params._teamName;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.save();
}

export function handleProjectCreated(event: ProjectCreated): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);

  const project = new Project(projectID.toHex());
  project.name = event.params._projectName;
  project.team = teamID.toHex();
  project.metaURI = event.params._metaURI;
  project.createdTx = event.transaction.hash.toHex();
  project.updatedTx = event.transaction.hash.toHex();
  project.createdAt = event.block.number.toU32();
  project.keywords = _parseKeywords(event.params._metaURI);
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectCreated';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleProjectUpdated(event: ProjectUpdated): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);

  let project = Project.load(projectID.toHex())
  if (project == null) project = new Project(projectID.toHex());

  project.name = event.params._projectName;
  project.team = teamID.toHex();
  project.metaURI = event.params._metaURI;
  project.updatedTx = event.transaction.hash.toHex();
  project.keywords = _parseKeywords(event.params._metaURI);
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectUpdated';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleProjectMemberAdded(event: ProjectMemberAdded): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);

  let project = Project.load(projectID.toHex())
  if (project == null) project = new Project(projectID.toHex());

  let user = User.load(event.params._member.toHex());
  if (user == null) user = new User(event.params._member.toHex());

  const projects = _arrayToSet(user.projects);
  projects.add(projectID.toHex());

  const members = _arrayToSet(project.members);
  members.add(event.params._member.toHex());

  user.projects = projects.values();
  user.save();

  project.name = event.params._projectName;
  project.team = teamID.toHex();
  project.members = members.values();
  project.updatedTx = event.transaction.hash.toHex();
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectMemberAdded';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.save();
}

export function handleProjectMemberRemoved(event: ProjectMemberRemoved): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);

  let project = Project.load(projectID.toHex())
  if (project == null) project = new Project(projectID.toHex());

  let user = User.load(event.params._member.toHex());
  if (user == null) user = new User(event.params._member.toHex());

  const projects = _arrayToSet(user.projects);
  projects.delete(projectID.toHex());

  const members = _arrayToSet(project.members);
  members.delete(event.params._member.toHex());

  user.projects = projects.values();
  user.save();

  project.name = event.params._projectName;
  project.team = teamID.toHex();
  project.members = members.values();
  project.updatedTx = event.transaction.hash.toHex();
  project.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ProjectMemberRemoved';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.sender = event.params._sender.toHex();
  log.member = event.params._member.toHex();
  log.save();
}

export function handleReleaseCreated(event: ReleaseCreated): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);
  const releaseID = valist.getReleaseID(projectID, event.params._releaseName);

  const release = new Release(releaseID.toHex());
  release.name = event.params._releaseName;
  release.project = projectID.toHex();
  release.metaURI = event.params._metaURI;
  release.createdTx = event.transaction.hash.toHex();
  release.updatedTx = event.transaction.hash.toHex();
  release.createdAt = event.block.number.toU32();
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseCreated';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.release = event.params._releaseName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleReleaseApproved(event: ReleaseApproved): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);
  const releaseID = valist.getReleaseID(projectID, event.params._releaseName);

  let release = Release.load(releaseID.toHex());
  if (release == null) release = new Release(releaseID.toHex());

  let user = User.load(event.params._sender.toHex());
  if (user == null) user = new User(event.params._sender.toHex());

  const approvers = _arrayToSet(release.approvers);
  approvers.add(event.params._sender.toHex());

  const rejectors = _arrayToSet(release.rejectors);
  rejectors.delete(event.params._sender.toHex());

  const approved = _arrayToSet(user.approved);
  approved.add(releaseID.toHex());

  const rejected = _arrayToSet(user.rejected);
  rejected.delete(releaseID.toHex());

  user.rejected = rejected.values();
  user.approved = approved.values();
  user.save();

  release.name = event.params._releaseName;
  release.project = projectID.toHex();
  release.approvers = approvers.values();
  release.rejectors = rejectors.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseApproved';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.release = event.params._releaseName;
  log.sender = event.params._sender.toHex();
  log.save();
}

export function handleReleaseRejected(event: ReleaseRejected): void {
  const valist = Valist.bind(event.address);
  const teamID = valist.getTeamID(event.params._teamName);
  const projectID = valist.getProjectID(teamID, event.params._projectName);
  const releaseID = valist.getReleaseID(projectID, event.params._releaseName);

  let release = Release.load(releaseID.toHex());
  if (release == null) release = new Release(releaseID.toHex());

  let user = User.load(event.params._sender.toHex());
  if (user == null) user = new User(event.params._sender.toHex());

  const approvers = _arrayToSet(release.approvers);
  approvers.delete(event.params._sender.toHex());

  const rejectors = _arrayToSet(release.rejectors);
  rejectors.add(event.params._sender.toHex());

  const approved = _arrayToSet(user.approved);
  approved.delete(releaseID.toHex());

  const rejected = _arrayToSet(user.rejected);
  rejected.add(releaseID.toHex());

  user.rejected = rejected.values();
  user.approved = approved.values();
  user.save();

  release.name = event.params._releaseName;
  release.project = projectID.toHex();
  release.rejectors = rejectors.values();
  release.approvers = approvers.values();
  release.save();

  const log = new Log(event.transaction.hash.toHex());
  log.type = 'ReleaseRejected';
  log.team = event.params._teamName;
  log.project = event.params._projectName;
  log.release = event.params._releaseName;
  log.sender = event.params._sender.toHex();
  log.save();
}

function _parseKeywords(uri: string): Array<string> {
  const keywords = new Array<string>();
  if (!uri.includes('/ipfs/')) return keywords;

  const index = uri.lastIndexOf('/ipfs/');
  const hash = uri.substring(index+6);

  const metaBytes = ipfs.cat(hash);
  if (!metaBytes) return keywords;

  const metaValue = json.fromBytes(metaBytes);
  if (metaValue.kind != JSONValueKind.OBJECT) return keywords;

  const metaObject = metaValue.toObject();
  if (!metaObject.isSet('keywords')) return keywords;

  const keywordsValue = metaObject.mustGet('keywords');
  if (keywordsValue.kind != JSONValueKind.ARRAY) return keywords;

  const keywordsArray = keywordsValue.toArray();
  for (let i = 0; i < keywordsArray.length; i++) {
    if (keywordsArray[i].kind != JSONValueKind.STRING) continue;
    keywords.push(keywordsArray[i].toString());
  }

  return keywords;
}

function _arrayToSet(arr: Array<string>): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i]);
  }
  return set;
}
