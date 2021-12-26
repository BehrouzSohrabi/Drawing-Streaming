import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const states = createStore(reducers, {}, applyMiddleware(thunk));
export default states;
