/* global  */
'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {
  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };
  
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const updateRatingsDisplayed = function(num) {
    this.ratingsDisplayed = num;
  };

  const setAddBookmarkModal = function() {
    console.log('setAddBookmarkModal ran')
    this.addBookmarkModal = !this.addBookmarkModal;
    console.log(store.addBookmarkModal)
  };

  const setDisplayDetail = function (id) {
    const item = this.findById(id);
    item.displayDetail = !item.displayDetail;
  };

  const setItemEditing = function (id) {
    const item = this.findById(id);
    item.isEditing = !item.isEditing;
  };

  const error = function(error) {
    alert(error.responseJSON.message);
  };

  return {
    items: [],
    ratingsDisplayed: 1,
    addBookmarkModal: false,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    updateRatingsDisplayed,
    setAddBookmarkModal,
    setDisplayDetail,
    setItemEditing,
    error,
  };
}());