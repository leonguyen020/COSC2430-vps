import { combineReducers } from "redux";
import user from "./userReducer";
import advertisements from "./advertisementReducer";
import projects from "./projectReducer";

const rootReducer = combineReducers({
  user,
  advertisements,
  projects,
});

export default rootReducer;
