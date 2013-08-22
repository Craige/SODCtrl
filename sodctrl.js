#!/usr/bin/env node

var program = require('nomnom');

var config   = require(__dirname + '/config')
var profiles = require(__dirname + '/profiles')

var gandi = require(__dirname + '/controllers/gandi');
var tasks = require(__dirname + '/tasks')

// process.on('SIGINT', function() {
//     console.log('Caught interrupt. Shutting down now.');
// });

var controller = new gandi(config.apiKey)
    controller.init()

tasks.setController(controller)
tasks.setProfiles(profiles)

program.command('boot')
    .option('server', {
        abbr: 's',
        help: 'Server name to boot'
    })
    .option('profile', {
        abbr: 'p',
        help: 'Proflie name to boot'
    })
    .callback(function(options) {tasks.boot(options);})
    .help('Boot server(s)')

program.command('shutdown')
    .option('server', {
        abbr: 's',
        help: 'Server name to shutdown'
    })
    .option('profile', {
        abbr: 'p',
        help: 'Proflie name to shutdown'
    })
    .callback(function(options) {tasks.shutdown(options);})
    .help('Shutdown server(s)')

program.command('execute')
    .option('server', {
        abbr: 's',
        help: 'Server execute command on'
    })
    .option('profile', {
        abbr: 'p',
        help: 'Proflie execute command on'
    })
    .option('command', {
        abbr: 'c',
        help: 'Proflie execute command on'
    })
    .callback(function(options) {throw 'Not implemented'})
    .help('Execute a command on a server or profile')

program.parse()
