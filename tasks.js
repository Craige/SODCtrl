exports.boot = function (param) {
    if (param[0] == "-s") {
        this.getController().startupByName(param[1])
    } else if (param[0] == "-p") {

    }
}


exports.setController = function (controller) {
    this.controller = controller
}

exports.getController = function () {
    return this.controller
}

