import { IProduct } from "./IProduct";

export interface IShoppingList {
    id?: number;
    products: IProduct[];
}