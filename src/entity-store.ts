export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE'
}

export class EntityState<T> {
  entities?: Array<T> = [];
  selected?: T;
  status?: Status;
  action?: string;
  error?: any;
  //[key: string]: any;

  constructor(entities: Array<T> = [], selected?: T) {
      this.entities = entities;
      this.selected = selected;
  }
}

import { Store } from './store';
import { Observable } from 'rxjs';

/**
 * Store for entities
 *
 * Constraint applied on type Parameter S to be only EntityState<T> type:
 *
 * S = EntityState<Entity>
 * T = Entity
 */

type T<S> = S extends EntityState<(infer R)> ? R : S;

export class EntityStore<S extends EntityState<any>> extends Store<S> {

  observer$: Observable<S>;

  constructor(initialState: S) {
    super(initialState);
  }

  public add(m: T<S> | T<S>[]) {
    const entities = [...this.state.entities.concat(m)];
    this.dispatchEntities(entities);
  }

  public update(fn: (entity: T<S>) => boolean, entity: T<S>): void {
    const idx = this.state?.entities?.findIndex(fn);

    if (idx === -1) {
      return;
    }
    // found, so entities equal to:
    // Clone of items before item being update.
    // updated item
    // Clone of items after item being updated.
    const entities = [...this.state?.entities?.slice(0, idx), entity, ...this.state?.entities?.slice(idx + 1)];
    this.dispatchEntities(entities);
  }

  public remove(fn: (entity: T<S>) => boolean): void {
    const idx = this.state?.entities?.findIndex(fn);
    if (idx === -1) {
      return;
    }
    // found, so entities equal to: clone of items before and clone of items after.
    const entities = [...this.state?.entities?.slice(0, idx), ...this.state?.entities?.slice((idx || 0) + 1)];
    this.dispatchEntities(entities);
  }

  public exists(fn: (entity: T<S>) => boolean): boolean {
    return this.state?.entities?.some(fn) || false;
  }

  /** By default actions start with status loading */
  public setAction(action: string) {
    const state: S = {
      ...(this.state),
      action,
      status: Status.LOADING
    };
    this.change(state);
  }

  public setStatus(status: Status) {
    const state: S = {
      ...(this.state),
      status
    };
    this.change(state);
  }

  private dispatchEntities(entities: T<S>[]) {
    this.change({ ...this.state, entities });
  }
}
