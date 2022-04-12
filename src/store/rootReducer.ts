import { combineReducers } from "@reduxjs/toolkit";
import caseReducer from "./case/reducer";
import casesReducer from "./cases/reducer";
import formReducer from "./form/reducer";

export const rootReducer = combineReducers({
    form: formReducer,
    cases: casesReducer,
    case: caseReducer
})

export type RootState = ReturnType<typeof rootReducer>;