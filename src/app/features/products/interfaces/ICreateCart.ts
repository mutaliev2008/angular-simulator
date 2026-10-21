import { IModifiedProductCart } from "./IModifiedProductCart";

export interface ICreateCart {
  userId: number;
  products: IModifiedProductCart[];
}