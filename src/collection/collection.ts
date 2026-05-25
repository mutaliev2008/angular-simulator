import { users } from '../auth/data/userData';

export class Collection<T> {
  private collection: T[];

  constructor(items: T[]) {
    this.collection = items;
  }

  getAllColection() {
    return this.collection;
  }

  getCollectionItem(value: string | number): T | undefined {
    for (let item of this.collection) {
      for (let key in item) {
        if (item[key] === value) {
          return item;
        }
      }
    }
    return undefined;
  }

  removeAll(): void {
    this.collection.splice(0);
  }

  deletCollectionItem(value: string | number): void {
    for (let item of this.collection) {
      for (let key in item) {
        if (item[key] === value) {
          this.collection.splice(this.collection.indexOf(item));
        }
      }
    }
  }

  replaceCollectionItem(value: string | number, obj: T): void {
    for (let item of this.collection) {
      for (let key in item) {
        if (item[key] === value) {
          this.collection.splice(this.collection.indexOf(item), 1, obj);
        }
      }
    }
  }
}
