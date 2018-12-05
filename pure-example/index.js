"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_observable_1 = require("redux-observable");
var operators_1 = require("rxjs/operators");
(function (win) {
    var rootEpic = function (action$) { return action$.pipe(operators_1.filter(function (action) { return action.type === 'PING'; }), operators_1.mapTo({ type: 'PONG' })); };
    var id = 0;
    win.testReduxCreateStore = function () {
        var composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: "store" + id++ }) || redux_1.compose;
        var epicMiddleware = redux_observable_1.createEpicMiddleware();
        var store = redux_1.createStore(function (state, action) { return state; }, composeEnhancers(redux_1.applyMiddleware(epicMiddleware)));
        epicMiddleware.run(rootEpic);
    };
})(window);
