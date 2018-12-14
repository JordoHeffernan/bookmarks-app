/* global $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';

  const getItems = function (callback) {
    console.log('getItems ran');
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createItem = function(formData, callback, error) {
    console.log('createItem ran');
    $.ajax({
      'url': `${BASE_URL}`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': formData,
      'success': callback,
      'error': error
    });
  };

  const updateItem = function(id, updateData, callback, error){
    console.log('updateItem ran');
    const newData = JSON.stringify(
      updateData
    );
    $.ajax({
      'url': `${BASE_URL}/${id}`,
      'method': 'PATCH',
      'contentType': 'application/json',
      'data': newData,
      'success': callback,
      'error': error
    });
  };

  const deleteItem = function (id, callback, error) {
    console.log('deleteItem ran');
    $.ajax({
      'url': `${BASE_URL}/${id}`,
      'method': 'DELETE',
      'success': callback,
      'error': error
    });
  };



  return {
    BASE_URL,
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
}());