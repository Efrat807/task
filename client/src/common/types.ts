import { IProduct } from "../ApiService/Interfaces/IProduct";

export type categoryCardType = {categoryName: string, products: IProduct[]}
export interface ISize {
    width: number | undefined;
    height: number | undefined;
  }