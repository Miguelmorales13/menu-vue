export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface ImageCanvas {
  image: HTMLImageElement;
  width: number;
  height: number;
}

export interface IFabric<T> {
  id: string;
  object: T;
}

export enum actionEnum {
  Update = 'Update',
  Add = 'Add',
  Delete = 'Delete',
  Show = 'Show',
  Images = 'Images'
}

export type actionType = 'Update' | 'Add' | 'Delete' | 'Show' | 'Images'
