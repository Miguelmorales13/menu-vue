import {ICategory} from "src/models/category";

export interface IProduct {
  id?: string;
  name?: string;
  lasName?: string;
  secondLastName?: string;
  password?: string;
  email?: string;
  photo?: string;
  active?: boolean;
  rolId?: number;
  images?: [];
  category?: ICategory;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
