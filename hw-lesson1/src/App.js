import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Component/Header';
import RegistrationForm from './Component/RegistrationForm';
import Login from './Component/Login';
import store from './Redux/Store/Store';
import { Provider } from 'react-redux';
import PictureList from './Component/PictureList'
import PictureHistory from './Component/PictureHistory';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/Register" >
                <RegistrationForm />
              </Route>
              <Route path="/" exact={true} >
                <Login />
              </Route>
              <Route path="/Pictures" exact={true}>
                <PictureList />
              </Route>
              <Route path="/FavoritesPictures" >
                <PictureHistory />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;











