'use strict';

module.exports = {
  app: function () {
    var appJS = this.props.javascript !== 'coffee' ? 'app.js' : 'app.coffee';

    // HTML files
    this.fs.copy(
      this.templatePath('pages/index.html'),
      this.destinationPath('client/index.html')
    );
    this.fs.copy(
      this.templatePath('pages/home.html'),
      this.destinationPath('client/templates/home.html')
    );

    // Static assets
    this.fs.copy(
      this.templatePath('assets/app.scss'),
      this.destinationPath('client/assets/scss/app.scss')
    );
    this.fs.copy(
      this.templatePath('assets/_settings.scss'),
      this.destinationPath('client/assets/scss/_settings.scss')
    );
    this.fs.copy(
      this.templatePath('assets/' + appJS),
      this.destinationPath('client/assets/js/' + appJS)
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
}