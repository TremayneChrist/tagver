#! /usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const api = require('./api');
const options = Object.create(null);

const argv = yargs
.usage('\nDefault:\n  Shows the current version number, if any.')
.command('major', 'Bump the major version.')
.command('minor', 'Bump the minor version.')
.command('patch', 'Bump the patch version.')
.command('x.x.x', 'Bump to the specified version.')
.option('message', {
  alias: 'm',
  string: true,
  default: 'Release v%s',
  description: 'Optional message to use for git tags'
})
.help()
.version()
.argv;

const command = argv._[0];

options.tag = argv.gitTag !== false;
options.publish = !options.tag ? false : argv.gitPublish !== false;
options.message = argv.message;

if (command) {
  api.bump(command, options)
  .then(version => console.log(version))
  .catch(error => console.error(chalk.red(error)));
}
else {
  api.version(options)
  .then(version => version ? console.log(version) : Promise.reject('No version found'))
  .catch(error => console.error(chalk.red(error)));
}
