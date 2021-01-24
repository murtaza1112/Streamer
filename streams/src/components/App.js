import React from "react";
import { Router, Route,Switch } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from '../history';

// browser router dosent support passing a custom history obj so router used

function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          {/* only return one component to render,ex = /streams/new and /streams/:id */}
          <Route exact path="/" component={StreamList}></Route>
          <Route
            exact
            path="/streams/delete/:id"
            component={StreamDelete}
          ></Route>
          <Route exact path="/streams/edit/:id" component={StreamEdit}></Route>
          <Route exact path="/streams/new" component={StreamCreate}></Route>
          <Route exact path="/streams/:id" component={StreamShow}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
