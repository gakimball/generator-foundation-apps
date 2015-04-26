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

      if (props.sass === 'ruby') {
        this.npmInstall(['gulp-ruby-sass'], { 'saveDev': true });
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // HTML files
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('client/index.html')
      );
      this.fs.copy(
        this.templatePath('home.html'),
        this.destinationPath('client/templates/home.html')
      );

      // Static assets
      this.fs.copy(
        this.templatePath('app.scss'),
        this.destinationPath('client/assets/scss/app.scss')
      );
      this.fs.copy(
        this.templatePath('_settings.scss'),
        this.destinationPath('client/assets/scss/_settings.scss')
      );
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('client/assets/js/app.js')
      );

      // Gulpfile
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        { props: this.props }
      );

      // Dependenices
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { name: this.props.name }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { name: this.props.name }
      );

      // Config files
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },

    projectfiles: function () {

    }
  },

  install: function () {
    this.installDependencies();
  }
});
