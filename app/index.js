"use strict";

var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');
        // have Yeoman greet the user.
        console.log(
                this.yeoman +
                '\nIf the module would publish to npmjs.org,' +
                '\nthe name of your project shouldn\'t contain "node" or "js" and' +
                '\nshould be a unique ID not already in use at search.npmjs.org.');
    },
    askForModuleName: function () {
        var done = this.async();
        var prompts = [
            {
                name: 'name',
                message: 'Module Name',
                default: path.basename(process.cwd())
            }
        ];

        var g = this;
        this.prompt(prompts, function (props) {
            g.slugname = g._.slugify(props.name);
            g.safeSlugname = g.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
                    return g[1].toUpperCase();
                }
            );
            done();
        });
    },

    askFor: function () {
        var done = this.async();

        var prompts = [
            {
                name: 'description',
                message: 'Description',
                default: 'The best module ever.'
            },
            {
                name: 'homepage',
                message: 'Homepage'
            },
            {
                name: 'license',
                message: 'License',
                default: 'MIT'
            },
            {
                name: 'githubUsername',
                message: 'GitHub username'
            },
            {
                name: 'authorName',
                message: 'Author\'s Name'
            },
            {
                name: 'authorEmail',
                message: 'Author\'s Email'
            },
            {
                name: 'authorUrl',
                message: 'Author\'s Homepage'
            },
            {
                name: 'keywords',
                message: 'Key your keywords (comma to split)'
            },
            {
                name: 'cli',
                message: 'Do you need cli tools?',
                default: 'no'
            },
            {
                name: 'browser',
                message: 'Do you need browserify?',
                default: 'no'
            },
            {
                type: 'list',
                name: 'reporter',
                message: 'Which Mocha reporter would you like to use?',
                choices: ['dot','spec','nyan','tap','landing','list', 'progress', 'json', 'json-stream', 'json-cov', 'html-cov', 'min', 'doc', 'xunit', 'markdown'/*, 'html'*/],
                default: 1
            }, {
                type: 'list',
                name: 'assertionLib',
                message: 'Which assertion library would you like to use?',
                choices: ['assert','chai-assert','chai-expect','chai-should','expect.js','should.js'],
                default: 0
            }
        ];

        this.currentYear = (new Date()).getFullYear();

        this.prompt(prompts, function (props) {
            if (props.githubUsername) {
                this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
            } else {
                this.repoUrl = 'user/repo';
            }

            if (!props.homepage) {
                props.homepage = this.repoUrl;
            }

            this.keywords = props.keywords.split(',');

            this.props = props;

            done();
        }.bind(this));
    },


    app: function () {
        this.config.save();
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('travis.yml', '.travis.yml');

        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.template('_jshintrc', '.jshintrc');
        this.template('_package.json', 'package.json');
        this.template('_README.md', 'README.md');

        if (this.props.cli === 'yes' || this.props.cli) {
            this.template('_cli.js', 'cli.js');
        }
    },

    projectfiles: function () {
        this.mkdir('lib');
        this.template('lib/_name.js', 'lib/' + this.slugname + '.js');
        this.assertionGuide = this.readFileAsString(path.join(this.sourceRoot(), '/test/_' + this._.slugify(this.props.assertionLib) + '.js'));
        this.mkdir('test');
        this.template('test/_name_test.js', 'test/' + this.slugname + '_test.js');
        this.mkdir('example');
        this.template('example/_name_example.js', 'example/' + this.slugname + '_example.js');
    },

    install: function () {
        this.installDependencies({
            bower: false,
            skipInstall: this.options['skip-install']
        });
    }
});
