
exports.run = function(task, param) {
    commands = {
        "boot"   : "boot",
        "help"   : "help",
        "--help" : "help",
    }
    this[commands[task]](param)
}

exports.boot = function (param) {
    if (param[0] == "-s") {
        this.getController().startupByName(param[1])
    } else if (param[0] == "-p") {

    }
}

exports.help = function () {
    help = "sodctrl boot [-p profile_name] | [-s servername]\n" +
        "        help | --help"
    console.log(help)
}

exports.setController = function (controller) {
    this.controller = controller
}

exports.getController = function () {
    return this.controller
}

