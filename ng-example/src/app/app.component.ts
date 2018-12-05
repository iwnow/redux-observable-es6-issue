import { Component } from '@angular/core';

import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';

((win: any) => {

    const rootEpic = action$ => action$.pipe(
        filter((action: AnyAction) => action.type === 'PING'),
        mapTo({ type: 'PONG' })
      );
    let id = 0;
    win.testReduxCreateStore = () => {
        const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: `store${id++}`})  || compose;
        const epicMiddleware = createEpicMiddleware();
        const store = createStore(
            (state, action) => state,
            composeEnhancers(
                applyMiddleware(epicMiddleware)
            )
        );
        epicMiddleware.run(rootEpic);
    };

})(window);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-example';
}
