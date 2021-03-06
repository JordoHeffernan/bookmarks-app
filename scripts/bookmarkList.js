/* global api, store, $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {

  function generateItemElement(item) {
    
    let itemTitle = `<span tabindex="0" class="bookmark-name"><span class="bold">Title: </span>${item.title}</span>`;
    let itemRating = `<span tabindex="0" class="bookmark-rating"><span class="bold">Rating: </span> ${item.rating}</span>`;
    let itemDesc = `<span tabindex="0" class="bookmark-desc"><span class="bold">Description: </span>${item.desc}</span>`;
    let itemURL = `<span tabindex="0" class="bookmark-url"><span class="bold">Visit Site: </span><a href="${item.url}" target="_blank">${item.url}</a></span>`;
    console.log(itemURL)
    
    console.log(itemDesc)
    let displayDetail = item.displayDetail;
    
    if (item.isEditing && item.displayDetail) {
      return `
      <li class ="js-item-element" data-item-id="${item.id}">
      <div class="item-div">
        <form class="edit-item js-edit-item">
          <label for="edit-title">Title</label>
          <input name="title" id="edit-title"class="edit-bookmark-name js-edit-bookmar-name" type="text" value="${item.title}" />
          <label for="edit-desc">Description</label>
          <textarea maxlength="420" name="desc" id="edit-desc" class="edit-bookmark-desc js-edit-bookmark-desc">${item.desc}</textarea>
          <label for="edit-rating">Rating</label>
          <select name="rating" id="edit-rating" class="edit-rating js-edit-rating" setDefault="${item.rating}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit" class="edit-item-submit-button js-edit-item-submit-button">Submit Changes</button>
        </form>
        <div class ="url-div">
          ${itemURL}
        </div>
        <div class="bookmark-controls">
          <button type="submit" class="detail-button js-detail-button">Display Detail</button>
          <button class="bookmark-delete js-bookmark-delete">
            <span class="button-label">Delete</span>
          </button>
        </div>
      </li>`;
    } else if (displayDetail) {
      return `
        <li class="js-item-element" data-item-id="${item.id}">
          <div class="item-div">
            <div class="title-div">
              ${itemTitle}
            </div>
            <div class="rating-div">
              ${itemRating}
            </div>
            <div class="desc-div">
              ${itemDesc}
            </div>
            <div class="url-div">
              ${itemURL}
            </div>
            <div class="bookmark-controls">
              <button type="submit" class="detail-button js-detail-button">Display Detail</button>
              <button class="bookmark-edit js-bookmark-edit">
                <span class="button-label">Edit</span>
              </button>
              <button class="bookmark-delete js-bookmark-delete">
                <span class="button-label">Delete</span>
              </button>
            </div>
          </div>
        </li>`;
    } else {
      return`
        <li class ="js-item-element" data-item-id="${item.id}">
          <div class="item-div">
            <div class="title-div">
            ${itemTitle}
            </div>
            <div class ="rating-div">
            ${itemRating}
            </div>
            <div class="bookmark-controls">
              <button type="submit" class="detail-button js-detail-button">Display Detail</button>
            </div>
          </div>
        </li>`;
    }
  }
 
  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  let addBookmarkModal = `<div class="add-bookmark-modal js-add-bookmark-modal">
    <h3 class="new-bookmark-title">New Bookmark</h3>
      <form id="new-bookmark-form">
      <label for="title">Title</label>
      <input type="text" name="title" class="js-title-entry" placeholder="Google">
      <label for="url">Webpage Address</label>
      <input type="text" name="url" class="js-url-entry" value="https://">
      <label for="desc">Description</label>
      <textarea name="desc" class="desc js-desc-entry" maxlength="420" placeholder="A powerful search engine"></textarea>
      <label for="rating">Rating</label>
      <select name="rating">
        <option value="0">Set Page Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <div class="modal-controls">
        <button type="submit" class="submit-new-bookmark js-submit-new-bookmark">Submit</button>
        <button type="reset" class="cancel-new-bookmark js-cancel-new-bookmark">Cancel</button>
      </div>
    </form>
  </div>`;

  function render() {
    console.log('render ran');
    let items = [ ...store.items];

    if (store.ratingsDisplayed > 1) {
      items = items.filter(item => item.rating >= store.ratingsDisplayed);
    }    

    const bookarmarkListItemString = generateBookmarkString(items);

    if (store.addBookmarkModal) {
      $('.js-bookmarks-list').html(addBookmarkModal);
      //$('.js-bookmarks-list').toggleClass('hidden');
    } else {
      $('.js-bookmarks-list').html(bookarmarkListItemString);
    }
    
  }

  function getItemIdFromElement(item) {
    return $(item).closest('.js-item-element').data('item-id');
  }

  function handleDetailClicked() {
    $('.js-bookmarks-list').on('click', '.js-detail-button', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      const editingStatus = item.isEditing;
      if (editingStatus) {
        store.setItemEditing(id);
      }
      store.setDisplayDetail(id);
      render();
    });
  }

  function handleDeleteClicked() {
    $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, store.findAndDelete(id), (message) => store.error(message));
      render();
    });
  }

  function handleItemStartEditing() {
    $('.js-bookmarks-list').on('click', '.js-bookmark-edit', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.setItemEditing(id);
      render();
    });
  }

  function handleEditBookmarkSubmit() {
    $('.js-bookmarks-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      console.log(event.currentTarget)
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      const formData = new FormData(event.currentTarget);
      console.log(formData);
      const newData = {};
      formData.forEach((val, key) => {
        newData[key] = val;});
      console.log(newData);
      //const dataStr = JSON.stringify(newData);
      //console.log(dataStr);
      api.updateItem(id, newData, () => {
        store.findAndUpdate(id, newData);
        store.setItemEditing(id);
        store.setDisplayDetail(id);
        render();
      }, (message) => store.error(message));
    });
  }

  function handleAddBookmarkClicked () {
    $('#page-controls').on('click', '.js-add-bookmark-bttn', event => {
      console.log('addbookmark was clicked');
      event.preventDefault();
      store.setAddBookmarkModal();
      render();
    });
  }


  function handleNewBookmarkSubmit() {
    $(document).on('submit', '#new-bookmark-form', event => {
      console.log('submit was clicked');
      event.preventDefault();
      const formData = new FormData(event.target);
      const obj = {};
      formData.forEach((val, key) => {
        obj[key] = val;});
      const str = JSON.stringify(obj);
      api.createItem(str, (newItem) => {
        store.addItem(newItem);
        store.setAddBookmarkModal();
        render();
      }, (message) => store.error(message));
      
    });
  }

  function handleCancleClicked() {
    $(document).on('click', '.js-cancel-new-bookmark', event => {
      console.log('cancel was clicked');
      event.preventDefault();
      store.setAddBookmarkModal();
      render();
    });
  }

  function handleRatingChange() {
    $('#ratings-to-display').on('change', event => {
      const rating = $(event.target).val();
      store.updateRatingsDisplayed(rating);
      render();
    });
  }

  function bindEventListeners () {
    handleAddBookmarkClicked();
    handleNewBookmarkSubmit();
    handleCancleClicked();
    handleRatingChange();
    handleDetailClicked();
    getItemIdFromElement();
    handleDeleteClicked();
    handleItemStartEditing();
    handleEditBookmarkSubmit();
  }
    
  return {
    render,
    bindEventListeners,

  };
}());