#!/usr/bin/env node

var program = require('nomnom');

var config   = require(__dirname + '/config')
var profiles = require(__dirname + '/profiles')

var gandi = require(__dirname + '/controllers/gandi');
var tasks = require(__dirname + '/tasks')


var argv = process.argv.slice(2)

process.on('SIGINT', function() {
    console.log('Caught interrupt. Shutting down now.');
});

var g = new gandi(config.apiKey)
tasks.setController(g)
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
    .callback(function(options) {var self=this; tasks.boot(options);})
    .help('Boot server(s)')

program.command('shutdown')
    .option('server', {
        abbr: 's',
        help: 'Server name to boot'
    })
    .option('profile', {
        abbr: 'p',
        help: 'Proflie name to boot'
    })
    .callback(function(options) {var self=this; tasks.shutdown(options);})
    .help('Shutdown server(s)')

program.parse()
