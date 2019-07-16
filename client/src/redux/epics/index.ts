import { combineEpics } from "redux-observable";

import randomEpic from "./randomEpic";

const epics = combineEpics(
  ...randomEpic,
);

export default epics;
