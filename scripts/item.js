/* global cuid */
'use strict';

// eslint-disable-next-line no-unused-vars
const item = (function(){

  const validateTitle = function(title) {
    if (!title) throw new TypeError('Title must not be blank');
  };

  const validateDesc = function(desc) {
    if (!desc) throw new TypeError('desc must not be blank');
  };

  const validateRating = function(rating) {
    if (rating < 1) throw new TypeError('Rating must be Set');
  };
  
  const create = function(title, rating, url, desc) {
    return {
      id: cuid(),
      displayDetail: false,
      isEditing: false,
      title,
      rating,
      url,
      desc
    };
  };
  
  return {
    validateTitle,
    validateRating,
    validateDesc,
    create,
  };
    
}());