import { BigInt } from "@graphprotocol/graph-ts";
import { Project, Product, Purchase, User } from "../generated/schema";
import { 
  PriceChanged,
  BalanceWithdrawn,
  ProductPurchased,
} from "../generated/License/License";

export function handlePriceChanged(event: PriceChanged): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const productID = projectID + "-" + event.params._token.toHex();

  let project = Project.load(projectID);
  if (project === null) {
    project = new Project(projectID)
    project.save();
  }

  let product = Product.load(productID);
  if (product === null) product = new Product(productID);

  product.project = projectID;
  product.price = event.params._price;
  product.token = event.params._token.toHex();
  product.save();
}

export function handleBalanceWithdrawn(event: BalanceWithdrawn): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const productID = projectID + "-" + event.params._token.toHex();

  const product = Product.load(productID);
  if (product === null) return;

  product.balance -= event.params._balance;
  product.save();
}

export function handleProductPurchased(event: ProductPurchased): void {
  const projectID = _toPaddedHex(event.params._projectID);
  const productID = projectID + "-" + event.params._token.toHex();

  const product = Product.load(productID);
  if (product === null) return;

  let user = User.load(event.params._recipient.toHex());
  if (user === null) user = new User(event.params._recipient.toHex());

  const products = user.products.reduce((s, v) => s.add(v), new Set<string>());
  products.add(productID);

  user.products = products.values();
  user.save();

  product.balance += event.params._price;
  product.save();

  const purchase = new Purchase(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  purchase.user = user.id;
  purchase.product = productID;
  purchase.project = projectID;
  purchase.price = event.params._price;
  purchase.save();
}

function _toPaddedHex(input: BigInt): string {
  return "0x" + input.toHex().substr(2).padStart(64, '0');
}