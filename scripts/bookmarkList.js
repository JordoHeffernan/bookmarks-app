/* global api, store, $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {

  function generateItemElement(item) {
    
    let itemTitle = `<span class="bookmark-name">Title: ${item.title}</span>`;
    let itemRating = `<span class="bookmark-rating">Rating: ${item.rating}</span>`;
    let itemURL = `<span class="bookmark-url">${item.url}</span>`;
    let itemdesc = `<span class="bookmark-desc>${item.desc}</span>`;
    
    // if (item.isEditing) {
    //   itemTitle = `
    //     <form class="js-edit-name">
    //         <input class="bookmark-name type="text" value="${item.title}" />
    //     </from>`;
    //   itemdesc = `
    //     <form class="js-edit-desc">
    //       <input class="bookmark-desc> type="text" value="${item.desc}" />
    //     </form>`;
    //   itemRating = `
    //   <select>
    //     <option value="1">1</option>
    //     <option value="2">2</option>
    //     <option value="3">3</option>
    //     <option value="4">4</option>
    //     <option value="5">5</option>
    //   </select>`;
    // }

    // if (item.displayDetail) {
    //   return `
    //     <li class ="js-item-element" data-item-id="${item.id}>
    //       ${itemTitle}
    //       ${itemRating}
    //       ${itemURL}
    //       ${itemdesc}
    //       <div class="bookmark-controls">
    //         <button class="bookmark-edit js-bookmark-edit">
    //           <span class="button-label">Edit</span>
    //         </button>
    //         <button class="bookmark-delete js-bookmark-delete">
    //           <span class="button-label">Delete</span>
    //         </button>
    //       </div>
    //     </li>`;
    // } else {
    return`
        <li class ="js-item-element" data-item-id=${item.id}">
          ${itemTitle}
          ${itemRating}
        </li>`;
    //}
  }
 
  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  let addBookmarkModal = `<div class="add-bookmark-modal js-add-bookmark-modal">
    <h3 class="new-bookmark-title">New Bookmark</h3>
      <form id="new-bookmark-form">
      <label for="title-entry">Title</label>
      <input type="text" name="title-entry" class="js-title-entry" placeholder="Google">
      <label for="url-entry">Webpage Address</label>
      <input type="text" name="url-entry" class="js-url-entry" placeholder="https://www.google.com">
      <label for="desc-entry">desc</label>
      <textarea name="desc-entry" class="desc-entry js-desc-entry" maxlength="420" placeholder="A powerful search engine"></textarea>
      <label for="rating-entry">Rating</label>
      <select>
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

  function handleAddBookmarkClicked () {
    $('#page-controls').on('click', '.js-add-bookmark-bttn', event => {
      console.log('addbookmark was clicked');
      event.preventDefault();
      store.setAddBookmarkModal();
      render();
      
    });
  }

  function serializeJSON (form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, key) => {
      obj[key] = val;
    });
    return JSON.stringify(obj);
  }

  function handleNewBookmarkSubmit() {
    $(document).on('submit', '#new-bookmark-form', event => {
      console.log('submit was clicked');
      event.preventDefault();
      const formData = $(event.target).serializeJSON();
      api.createItem(formData, (newItem) => {
        store.addItem(newItem);
        render();
      });
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
  }
    
  return {
    render,
    bindEventListeners,
    serializeJSON,
  };
}());