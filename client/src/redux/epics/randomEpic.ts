import { Epic } from "redux-observable";
import { from, of } from 'rxjs';
import { switchMap, filter, map, catchError } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';
import { RootState } from "../reducers";

import * as actions from "../actions";
import { LOCATION_SET } from "../constants";

type Action = ActionType<typeof actions>;

const locationEpic: Epic<Action, Action, RootState> = (action$, state$) => action$.pipe(
  filter(isActionOf(actions.setLocation)),
  map(action => {
    const { payload } = action;
    console.log('locationEpic', action);
    return { type: LOCATION_SET, payload };
  })
);

export default [
  locationEpic,
];
