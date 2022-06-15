export class Section {
  constructor(renderer, container){
    this._renderer = renderer;
    this._container = container;
  };

  addItemPrepend(element){
    this._container.prepend(element);
  };

  addItem(element){
    this._container.append(element);
  };

  render(item, userId) {
    item.forEach((item) => {
      this._renderer(item, userId);
    });
  };
};