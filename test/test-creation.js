/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('nomo generator', function () {
    this.timeout(10000);

    beforeEach(function (done) {
        var test = this;
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            test.app = helpers.createGenerator('nomo:app', [
                '../../app'
            ]);
            test.app.options['skip-install'] = true;
            done();
        });
    });

    it('creates expected files', function (done) {
        var expected = [
            'lib/mymodule.js',
            'test/mymodule.test.js',
            'example/mymodule_example.js',
            'cli.js',
            '.gitignore',
            '.jshintrc',
            '.travis.yml',
            'Gruntfile.js',
            'package.json',
            'README.md'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'mymodule',
            'description': 'awesome module',
            'license': 'MIT',
            'homepage': 'http://yeoman.io',
            'githubUsername': 'octocat',
            'authorName': 'Octo Cat',
            'authorEmail': 'octo@example.com',
            'authorUrl': 'http://yeoman.io',
            'keywords': 'keyword1,keyword2,keyword3',
            'cli': 'yes',
            'browser': 'yes',
            'reporter': 'spec',
            'assertionLib': 'chai-assert'
        });

        this.app.run({}, function () {
            assert.file(expected);
            assert.fileContent('package.json', /"name": "mymodule"/);
            done();
        });
    });
});
