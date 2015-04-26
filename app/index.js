'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: require('./prompting'),

  writing: require('./writing'),

  install: function () {
    this.installDependencies();
  }
});
