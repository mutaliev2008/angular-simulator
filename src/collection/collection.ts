
export class Collection<T> {

  private collection: T[];

  constructor(items: T[]) {
    this.collection = items;
  }

  getAllColection() {
    return this.collection;
  }

  getCollectionItem(index:number): T | undefined {
      return this.collection.at(index)
  }

  removeAll(): void {
    this.collection.splice(0);
  }

  deletCollectionItem(index:number): void {
    this.collection.splice(index, 1)   
  }

  replaceCollectionItem(index:number, obj: T): void {
        if (this.collection.at(index)) {
          this.collection.splice(index, 1, obj);
        }
  }
}
