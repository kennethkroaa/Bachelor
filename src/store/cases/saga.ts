import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getCasesFailure, getCasesRequest, getCasesSuccess } from "./reducer";

export function* watcherCasesRequest() {
    yield takeEvery(getCasesRequest, workerSubmitForm);
}

function* workerSubmitForm(action: any) {
    try {
        const response = yield call(getCases);

        yield put(getCasesSuccess(response));
    } catch(error) {
        yield put(getCasesFailure(error));
    }
}

const getCases = () => axios.get("https://api-test.jyhne.no/refundpersons?p=0&l=15");