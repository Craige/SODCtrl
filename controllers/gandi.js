var xmlrpc = require('xmlrpc')

function Gandi(apiKey) {
    this.apiKey = apiKey
    this.api    = xmlrpc.createSecureClient({
        host: 'rpc.gandi.net',
        port: '443',
        path: '/xmlrpc/'
    })
    this.serverList = null
    this.activeQuery = false
}

Gandi.prototype = {

    init : function () {

        // this.queryServerList()
    },

    queryServerList : function (fn) {
        this.activeQuery = true
        var self = this
        var callback = fn
        this.api.methodCall('hosting.vm.list', [this.apiKey], function (error, value) {

            if(error != null) {
                console.log(error)
                throw error
                return;
            }

            servers = [] 
            for (i = 0; i < value.length; i++) {
                servers[i] = {
                    id       : value[i].id,
                    hostname : value[i].hostname
                }
            }
            self.setServerList(servers);
            this.activeQuery = false

            callback(servers)
        });

    },

    setServerList : function (servers) {
        this.serverList = servers
    },

    getServerList : function (fn) {
        if (this.serverList == null) {
            this.queryServerList(fn)
        } else {
            fn(this.serverList)
        }
    },

    getServerId : function (serverName, fn) {
        console.log("Looking up server " + serverName);
        var callback = fn

        this.getServerList(function (servers) {
            for (i = 0; i < servers.length; i++) {
                if (servers[i].hostname == serverName) {
                    console.log('Found it!')
                    callback(servers[i].id);
                    return
                }
            }

            throw "Servername not found"
        })
    },

    getServerInfo : function (serverId, fn) {
        var callback = fn

        this.getServerList(function(servers) {
            for (i = 0; i < servers.length; i++) {
                if (servers[i].id == serverId) {
                    callback(servers[i])
                    return
                }
            }
        })
    },

    boot : function (serverId) {

        var self = this
        this.getServerInfo(serverId, function (server) {
            if (server.state != 'running') {
                console.log('Starting server...')

                self.api.methodCall('hosting.vm.start', [self.apiKey, server.id], function (error, value) {
                    if(error != null) {
                        console.log(error);
                        return;
                    }
                });
            } else {
                console.log('Server already running.')
            }

            // console.log('Adding connection to ping-back pool');

            // initial ping back
            // setTimeout(this.pingBack, 30000, [server]);

            // If no connections have been made for 30 minutes, server will shut down
            // ping back every 5 minutes
            // setInterval(this.pingBack, 5*60*1000, [server]);

        })
    },

    shutdown : function (serverId) {
        this.api.methodCall('hosting.vm.stop', [this.apiKey, serverId], function (error, value) {
            if(error != null) {
                console.log(error);
                return;
            }
        });
    },

    // TODO
    pingBack : function (server) {
        console.log('*ping*');
    }
}

module.exports = Gandi
