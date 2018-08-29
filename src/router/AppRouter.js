/*
* 路由控制类
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';
import MarketPlace from '../views/MarketPlace';
import BotDetail from '../views/BotDetail';
import ExpectView from '../views/ExpectView';
import Partner from '../views/Partner';
import Home from '../views/Home';
import ArticleContent from '../views/ArticleContent';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home }></Route>
        <Route exact path="/login" component={ Login }></Route>
        <Route exact path="/login/:previous" component={ Login }></Route>
        <Route exact path="/marketplace/:id" component={ MarketPlace }></Route>
        <Route exact path="/marketplace" component={ MarketPlace }></Route>
        <Route exact path="/register" component={ Register }></Route>
        <Route exact path="/botdetail/:id" component={ BotDetail }></Route>
        <Route exact path="/expect" component={ ExpectView }></Route>
        <Route exact path="/partner" component={ Partner }></Route>
        <Route exact path="/about/:id" component={ ArticleContent }></Route>
        <Route render={() => <Redirect to="/" />}/>
      </Switch>
    )
  }
}

export default AppRouter;
