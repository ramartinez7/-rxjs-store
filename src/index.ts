export  { Store } from './store';
export  { EntityStore, EntityState, Status } from './entity-store';

// Types
export type customFn<T> = (s: T) => T;
export type ArrayFuncs = ((...a: any[]) => any)[];
export type ReturnTypes<T extends ArrayFuncs> = { [P in keyof T]: T[P] extends ( ...a: any[]) => infer R ? R : never };