
export class Collection<T> {

  private collection: T[];

  constructor(items: T[]) {
    this.collection = items;
  }

  getAllColection() {
    return this.collection;
  }

  getCollectionItem(index: number): T | undefined {
    return this.collection.at(index);
  }

  removeAll(): void {
    this.collection = [];
  }

  deletCollectionItem(index: number): void {
    this.collection = this.collection.filter((e: T) => this.collection.indexOf(e) !== index);
  }

  replaceCollectionItem(index: number, obj: T): void {
    this.collection = this.collection.map((e: T, elemIndex: number) =>
      elemIndex === index ? obj : e,
    );
  }
}
