import React from 'react';
import Header from './common/header'
import { BrowserRouter, Route } from 'react-router-dom'
import { GlobalStyle } from './style'
import { GlobalStyleIcon } from './statics/iconfont/iconfont.js'
import store from './store'
import { Provider } from 'react-redux'

import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Write from './pages/write'



function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/write' exact component={Write}></Route>

        </BrowserRouter>
      </Provider>
      <GlobalStyle />
      <GlobalStyleIcon />
    </React.Fragment>
  );
}

export default App;
