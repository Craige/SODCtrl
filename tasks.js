exports.setController = function (controller) {
    this.controller = controller
}

exports.getController = function () {
    return this.controller
}

exports.setProfiles = function (profiles) {
    this.profiles = profiles
}

exports.getProfiles = function () {
    return this.profiles
}

exports.boot = function (options) {
    servers = this.createServerList(options)
    for (i = 0; i < servers.length; i++) {
        this.getController().bootByName(servers[i])
    }
}

exports.shutdown = function (program) {
    servers = this.createServerList(options)
    for (i = 0; i < servers.length; i++) {
        this.getController().shutdownByName(servers[i])
    }
}

exports.createServerList = function (options) {
    servers = [];
    if (options.profile) {
        console.log('Looking for \'' + options.profile + '\' profile')
        profiles = this.getProfiles();
        for (profile in profiles) {
            if (profile == options.profile) {
                servers = profiles[profile]['servers']
            }
        }
    } else if (options.server) {
        servers = [options.server]
    }

    return servers;
}
