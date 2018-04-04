import modules from './modules';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

let devTools = null;
if (typeof window !== 'undefined') {
  devTools =
    window &&
    (window).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window).__REDUX_DEVTOOLS_EXTENSION__();
}

export default function configureStore() {
  const middlewares = [sagaMiddleware];

  const composed = devTools
    ? compose(applyMiddleware(...middlewares), devTools)
    : compose(applyMiddleware(...middlewares));

  const store = createStore(modules, composed);

  sagaMiddleware.run(rootSaga);
  return store;
}
