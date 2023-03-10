import { Model } from "./model";

export class Image extends Model {
  
  constructor(attr: {}, idAttr: string = '') {
    super(attr);
  }

  get id(): number {
    return this.getValue('id');
  }

  set id(id: number) {
    this.setValue('id', id);
  }

  get url(): string {
    return this.getValue('url');
  }

  set url(url: string) {
    this.setValue('url', url);
  }
}
