/*jslint node:true */

'use strict';

const express = require('express');
const path = require('path');

module.exports = function (router) {
  const ROOT = path.join(__dirname, '/../..');

  router.use('/lfw', express.static(ROOT + '/nchome/hotwebs/lfw'));
  router.use('/portal', express.static(ROOT + '/nchome/hotwebs/portal'));
};
