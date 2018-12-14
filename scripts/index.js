/* global $, api, bookmarkList, store */
'use strict';

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    store.items = store.items.map(item => {
      let x = Object.assign({}, item);
      x.displayDetail = false;
      return x;});
    store.items = store.items.map(item => {
      let y = Object.assign({}, item);
      y.isEditing = false;
      return y;});
    bookmarkList.render();
  });
});