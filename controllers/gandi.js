var xmlrpc = require('xmlrpc')

function Gandi(apiKey) {
    this.apiKey = apiKey
    this.api    = xmlrpc.createSecureClient({
        host: 'rpc.gandi.net',
        port: '443',
        path: '/xmlrpc/'
    })
}

Gandi.prototype = {
    startupByName : function (serverName) {
        var self = this
        console.log("Looking up server " + serverName);
        this.api.methodCall('hosting.vm.list', [this.apiKey], function (error, value) {

            if(error != null) {
                console.log(error)
                throw error
                return;
            }

            for (i = 0; i < value.length; i++) {
                if (value[i].hostname == serverName) {
                    console.log('Found it!')
                    self.startup(value[i].id)
                    return
                }
            }
            throw "Servername not found"
        });

    },

    startup : function (serverKey) {
        var self = this
        console.log('Checking for VM with id ' + serverKey + '...');
        this.api.methodCall('hosting.vm.list', [this.apiKey], function (error, value) {

            if (error != null) {
                console.log(error)
                throw error
                return;
            }

            for (i = 0; i < value.length; i++) {
                if (value[i].id == serverKey) {
                    console.log('Found it!')
                    self.bootVM(value[i])
                    return
                }
            }
        });
    },

    bootVM : function (server) {

        if (server.state != 'running') {
            this.boot(server.id);
        } else {
            console.log('Server already running.')
        }

        console.log('Adding connection to ping-back pool');

        // initial ping back
        setTimeout(this.pingBack, 30000, [server]);

        // If no connections have been made for 30 minutes, server will shut down
        // ping back every 5 minutes
        setInterval(this.pingBack, 5*60*1000, [server]);

    },

    boot : function (serverKey) {
        console.log('Starting server...')

        // this.api.methodCall('hosting.vm.start', [this.apiKey, serverKey], function (error, value) {
        //     if(error != null) {
        //         console.log(error);
        //         return;
        //     }
        // });
    },

    shutdown : function (serverkey) {
        // this.api.methodCall('hosting.vm.stop', [this.apiKey, serverKey], function (error, value) {
        // });
    },

    // TODO
    pingBack : function (server) {
        console.log('*ping*');
    }
}

module.exports = Gandi
