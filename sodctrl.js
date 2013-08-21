#!/usr/bin/env node

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

tasks.run(argv[0], argv.slice(1))


