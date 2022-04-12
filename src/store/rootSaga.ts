import { all, fork } from 'redux-saga/effects';
import * as caseSagas from "./case/saga";
import * as casesSagas from "./cases/saga";
import * as formSagas from "./form/saga";

export default function* rootSaga() {
    yield all([
        ...Object.values(formSagas),
        ...Object.values(casesSagas),
        ...Object.values(caseSagas)
    ].map(fork));
}
