var extend = require("raptor-util/extend");
var expect = require("chai").expect;

exports.templateData = {
    outer: function(callback) {
        setTimeout(function() {
            callback(null, {});
        }, 40);
    },
    inner1: function(callback) {
        setTimeout(function() {
            callback(null, {});
        }, 50);
    },
    inner2: function(callback) {
        setTimeout(function() {
            callback(null, {});
        }, 60);
    }
};

exports.checkEvents = function(events, snapshot, out) {
    events = events.map(function(eventInfo) {
        var arg = extend({}, eventInfo.arg);
        expect(arg.out != null).to.equal(true);

        delete arg.out; // Not serializable
        delete arg.asyncValue; // Not serializable

        return {
            event: eventInfo.event,
            arg: arg
        };
    });

    snapshot(events, out.isVDOM ? "-events-vdom.json" : "-events.json");
};
