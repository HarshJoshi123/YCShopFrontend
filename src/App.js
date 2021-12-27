import MainRouter from './router';
import Loader from './components/loading.js'
import './App.css';
import storage from "redux-persist/lib/storage"
import { Provider } from 'react-redux'
import { createStore,compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './redux/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  const persistConfig = {
    key: "root",
    storage
  }
  const middlewares = [];

  middlewares.push(thunk);
  const logger = createLogger({
    collapsed: true
  });

  const persistedReducer = persistReducer(persistConfig, reducers)
  const Store = createStore(persistedReducer,compose(applyMiddleware(...middlewares)));
  const persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
        <div className="App">
          <MainRouter />
        </div>
      </PersistGate >
    </Provider>
  );
}

export default App;
