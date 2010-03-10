var Layer = require("geoscript/layer").Layer;
var COMMON = require("./common");
var ADMIN = require("../../admin");
var FILE = require("file");

exports.setup = ADMIN.h2.setup;
exports.teardown = ADMIN.h2.teardown;

var database = FILE.join(ADMIN.h2.dest, "geoscript");

var getLayer = function() {
    return new Layer({
        workspace: {type: "h2", database: database},
        name: "states"
    });
};

// pull in all common tests
for (var test in COMMON) {
    exports[test] = COMMON[test](getLayer);
}

if (require.main == module) {
    require("test/runner").run(exports);
}
