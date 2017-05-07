import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { ADD_BACKGROUND } from "./constants";
import thunk from "redux-thunk";

const store = createStore(rootReducer,  applyMiddleware(thunk));

store.dispatch({
  type: ADD_BACKGROUND,
  payload: {
    src: "/assets/beach2.mp4",
    title: "Eyðieyja"
  }
});

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(App);
  });
}
