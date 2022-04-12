import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface casesSlice {
    [key: string]: any;
}

const initialState: casesSlice = {
    requestInProgress: false,
    data: {},
    files: {}
}

const caseSlice = createSlice({
    name: 'case',
    initialState: initialState,
    reducers: {
        getCaseRequest: (state, action: PayloadAction<any>) => {
            state.requestInProgress = true;
        },
        getCaseSuccess: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
            state.data = action.payload.data;
        },
        getCaseFailure: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
        },
        getCaseFilesRequest: (state, action: PayloadAction<any>) => {
            
        },
        getCaseFilesSuccess: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
            state.files = action.payload.data;
        },
        getCaseFilesFailure: (state, action: PayloadAction<any>) => {

        },
        setCaseStatusRequest: (state, action: PayloadAction<any>) => {
            
        },
        setCaseStatusSuccess: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.data.status = action.payload;
        },
        setCaseStatusFailure: (state, action: PayloadAction<any>) => {

        },        
    }
});

const { actions, reducer } = caseSlice;

export const {
    getCaseRequest,
    getCaseSuccess,
    getCaseFailure,
    getCaseFilesRequest,
    getCaseFilesSuccess,
    getCaseFilesFailure,
    setCaseStatusRequest,
    setCaseStatusSuccess,
    setCaseStatusFailure
} = actions;

export default reducer;