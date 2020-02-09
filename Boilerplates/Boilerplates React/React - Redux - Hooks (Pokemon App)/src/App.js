
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configStore';
import Main from './views/Main';
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <Provider store={store()}>
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Main} />
      </BrowserRouter>
    </div>
  </Provider>
)

export default App;
