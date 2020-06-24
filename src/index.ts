export  { Store } from './store';
export  { EntityStore, EntityState } from './entity-store';

// Types
export type customFn<T> = (s: T) => T;
export type ArrayFuncs = ((...a: any[]) => any)[];
export type ReturnTypes<T extends ArrayFuncs> = { [P in keyof T]: T[P] extends ( ...a: any[]) => infer R ? R : never };

export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE'
}


/* Actions */

export enum GenericAction {
  GET_ALL = 'GET_ALL',
  GET_BY_ID = 'GET_BY_ID',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  SOFT_DELETE = 'SOFT_DELETE'
}

export type Action = GenericAction; // | CustomerActions | OrderActions | etc..
