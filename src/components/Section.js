export class Section {
  constructor({item, renderer}, container){
    this._items = item;
    this._renderer = renderer;
    this._container = container;
  };

  addItemPrepend(element){
    this._container.prepend(element);
  };

  addItem(element){
    this._container.append(element);
  };

  render() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };
};