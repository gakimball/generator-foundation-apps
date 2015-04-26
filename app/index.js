'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
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
          value: 'none',
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
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
