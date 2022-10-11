import { BigInt } from "@graphprotocol/graph-ts";
import { toPaddedHex, updateLicenseBalance } from "../common";

import { 
  Project, 
  Product, 
  Currency,
  Purchase,
  Log,
} from "../../generated/schema";

import { 
  PriceChanged,
  RoyaltyChanged,
  LimitChanged,
  BalanceWithdrawn,
  ProductPurchased,
  TransferSingle,
  TransferBatch,
} from "../../generated/v2.1/License/License";

export function handlePriceChanged(event: PriceChanged): void {
  const projectID = toPaddedHex(event.params._projectID);
  const token = event.params._token.toHex();
  const currencyID = projectID + "-" + token;

  const project = Project.load(projectID);
  if (project === null) return;

  let product = Product.load(projectID);
  if (product === null) product = new Product(projectID);

  let currency = Currency.load(currencyID);
  if (currency === null) currency = new Currency(currencyID);

  product.project = projectID;
  product.save();

  project.product = projectID;
  project.save();

  currency.product = projectID;
  currency.price = event.params._price;
  currency.token = token;
  currency.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'PriceChanged';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleRoyaltyChanged(event: RoyaltyChanged): void {
  const projectID = toPaddedHex(event.params._projectID);

  const project = Project.load(projectID);
  if (project === null) return;

  let product = Product.load(projectID);
  if (product === null) product = new Product(projectID);

  product.project = projectID;
  product.royaltyAmount = event.params._amount;
  product.royaltyRecipient = event.params._recipient.toHex();
  product.save();

  project.product = projectID;
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'RoyaltyChanged';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleLimitChanged(event: LimitChanged): void {
  const projectID = toPaddedHex(event.params._projectID);

  const project = Project.load(projectID);
  if (project === null) return;

  let product = Product.load(projectID);
  if (product === null) product = new Product(projectID);

  product.project = projectID;
  product.limit = event.params._limit;
  product.save();

  project.product = projectID;
  project.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'LimitChanged';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleBalanceWithdrawn(event: BalanceWithdrawn): void {
  const projectID = toPaddedHex(event.params._projectID);
  const token = event.params._token.toHex();
  const currencyID = projectID + "-" + token;

  const currency = Currency.load(projectID);
  if (currency === null) return;

  currency.balance -= event.params._balance;
  currency.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'BalanceWithdrawn';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleProductPurchased(event: ProductPurchased): void {
  const projectID = toPaddedHex(event.params._projectID);
  const token = event.params._token.toHex();
  const currencyID = projectID + "-" + token;

  const product = Product.load(projectID);
  if (product === null) return;

  const currency = Currency.load(currencyID);
  if (currency === null) return;

  product.supply += BigInt.fromU64(1);
  product.save();

  currency.balance += event.params._price;
  currency.save();

  const purchase = new Purchase(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  purchase.sender = event.params._sender.toHex();
  purchase.recipient = event.params._recipient.toHex();
  purchase.product = projectID;
  purchase.token = token;
  purchase.price = event.params._price;
  purchase.logIndex = event.logIndex;
  purchase.blockTime = event.block.timestamp;
  purchase.blockNumber = event.block.number;
  purchase.save();

  const log = new Log(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  log.type = 'ProductPurchased';
  log.project = projectID;
  log.sender = event.params._sender.toHex();
  log.logIndex = event.logIndex;
  log.blockTime = event.block.timestamp;
  log.blockNumber = event.block.number;
  log.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  const value = event.params.value;
  const projectID = toPaddedHex(event.params.id);

  const to = event.params.to.toHex();
  const from = event.params.from.toHex();

  updateLicenseBalance(to, projectID, value);
  updateLicenseBalance(from, projectID, value.neg());
}

export function handleTransferBatch(event: TransferBatch): void {
  const values = event.params.values;
  const projectIDs = event.params.ids;

  const to = event.params.to.toHex();
  const from = event.params.from.toHex();

  for (let i = 0; i < projectIDs.length; i++) {
    const value = values[i];
    const projectID = toPaddedHex(projectIDs[i]);

    updateLicenseBalance(to, projectID, value);
    updateLicenseBalance(from, projectID, value.neg());
  }
}