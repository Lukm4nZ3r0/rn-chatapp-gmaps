import React, {Fragment} from 'react'
import Index from './sources/Index'

import {Provider} from 'react-redux'
import store from './sources/publics/redux/store'


const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
