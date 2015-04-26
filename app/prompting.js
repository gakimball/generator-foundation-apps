'use strict';

var yosay = require('yosay');
var path = require('path');
var chalk = require('chalk');

module.exports = function() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the divine ' + chalk.red('FoundationApps') + ' generator!'
  ));

  var prompts = [];

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'What\'s the name of your project?',
    default: process.cwd().split(path.sep).pop()
  })

  prompts.push({
    type: 'list',
    name: 'sass',
    message: 'How would you like Sass to be compiled?',
    choices: [
      {
        value: 'libsass',
        name: 'Libsass (via node-sass)'
      },
      {
        value: 'ruby',
        name: 'Ruby Sass'
      }
    ],
    default: 'libsass'
  });

  prompts.push({
    type: 'list',
    name: 'javascript',
    message: 'Would you like to add a JavaScript preprocessor?',
    choices: [
      {
        value: 'none',
        name: 'Just plain JavaScript'
      },
      {
        value: 'es6',
        name: 'ES6 compiled with Babel.js'
      },
      {
        value: 'coffee',
        name: 'CoffeeScript'
      }
    ]
  });

  prompts.push({
    type: 'list',
    name: 'templating',
    message: 'Would you like to add an HTML templating language?',
    choices: [
      {
        value: 'html',
        name: 'Just plain HTML'
      },
      {
        value: 'haml',
        name: 'HAML'
      },
      {
        value: 'jade',
        name: 'Jade'
      },
      {
        value: 'slim',
        name: 'Slim'
      }
    ]
  });

  this.prompt(prompts, function (props) {
    this.props = props;

    // Extra dependencies for Sass
    if (props.sass === 'ruby') {
      this.npmInstall(['gulp-ruby-sass'], { 'saveDev': true });
    }

    // Extra dependencies for JavaScript
    if (props.javascript === 'es6') {
      this.npmInstall(['gulp-babel'], { 'saveDev': true });
    } else if (props.javascript === 'coffee') {
      this.npmInstall(['gulp-coffee'], { 'saveDev': true });
    }

    // Extra dependencies for templating
    if (props.templating === 'haml') {
      this.npmInstall(['gulp-haml'], { 'saveDev': true });
    } else if (props.templating === 'jade') {
      this.npmInstall(['gulp-jade'], { 'saveDev': true });
    } else if (props.templating === 'slim') {
      this.npmInstall(['gulp-slim'], { 'saveDev': true });
    }

    done();
  }.bind(this));
}