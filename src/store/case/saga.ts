import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { getCaseFailure, getCaseFilesFailure, getCaseFilesRequest, getCaseFilesSuccess, getCaseRequest, getCaseSuccess, setCaseStatusRequest } from "./reducer";

export function* watcherCaseStatusRequest() {
    yield takeEvery(setCaseStatusRequest, workerSetCaseStatus);
}

export function* watcherCaseFilesRequest() {
    yield takeEvery(getCaseFilesRequest, workerGetCaseFiles);
}

export function* watcherCaseRequest() {
    yield takeEvery(getCaseRequest, workerGetCase);
}

function* workerSetCaseStatus(action: any) {
    try {
        const response = yield call(setStatus, action.payload);

        yield put(getCaseSuccess(response));
    } catch (error) {
        yield put(getCaseFailure(error))
    }
}

function* workerGetCase(action: any) {
    try {
        const response = yield call(getCase, action.payload);

        /* After fetching our case, fetch files */
        yield all([
            put(getCaseSuccess(response)),
            put(getCaseFilesRequest(action.payload))
        ]);
    } catch (error) {
        yield put(getCaseFailure(error))
    }
}

function* workerGetCaseFiles(action: any) {
    try {
        const response = yield call(getCaseFiles, action.payload);

        yield put(getCaseFilesSuccess(response));
    } catch (error) {
        yield put(getCaseFilesFailure(error))
    }
}

const setStatus = (payload: any) =>
    axios.get("https://api-test.jyhne.no/refundperson/" + payload.id + "/status/" + payload.status)

const getCase = (payload: any) => 
    axios.get("https://api-test.jyhne.no/refundperson/" + payload)

const getCaseFiles = (payload: any) => 
    axios.get("https://api-test.jyhne.no/refundperson/" + payload + "/files")