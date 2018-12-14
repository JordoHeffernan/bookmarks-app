/* global api, store, $ */
'use strict';

// eslint-disable-next-line no-unused-vars

  function serializeJSON (form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, key) => {
      obj[key] = val;
    });
    return JSON.stringify(obj);
  }
  


// function serializeJSON (form) {
//   const formData = new FormData(form);
//   const obj = {};
//   formData.forEach((val, key)=> {
//     obj[key] = val;
//   });
//   return JSON.stringify(obj);
// }