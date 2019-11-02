
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";

import {store} from './store/configStore';

import Main from './views/Main';
import Worklist from './views/Worklist';
import Travels from './views/Travels';

const App = () => (
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Route exact path="/index/:id1/:id2/" component={Main} />
        <Route exact path="/index/workList/:id1/:id2/" component={Worklist} />
        <Route exact path="/index/travels/:id1/:id2/" component={Travels} />
      </BrowserRouter>
    </div>
  </Provider>
)

export default App;
