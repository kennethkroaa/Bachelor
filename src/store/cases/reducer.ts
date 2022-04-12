import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface casesSlice {
    [key: string]: any;
}

const initialState: casesSlice = {
    requestInProgress: false,
    list: [],
}

const casesSlice = createSlice({
    name: 'cases',
    initialState: initialState,
    reducers: {
        getCasesRequest: (state) => {
            state.requestInProgress = true;
        },
        getCasesSuccess: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
            state.list = action.payload.data;
        },
        getCasesFailure: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
        },
    }
});

const { actions, reducer } = casesSlice;

export const { 
    getCasesRequest,
    getCasesSuccess,
    getCasesFailure,
} = actions;

export default reducer;