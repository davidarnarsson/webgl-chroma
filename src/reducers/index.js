import { combineReducers } from "redux";
import { backgrounds } from "./backgrounds";
import { ui } from "./ui";
import { rendering } from "./rendering";

export default combineReducers({ backgrounds, ui, rendering });
