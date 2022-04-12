import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/*
    This is awfully hard-coded and not very scalable
    Time issues! :( Gotta live with something that works quickly

    Stepper functionality, for example, could have been its own thing
    entirely, but for the sake of cutting down time we are just setting
    all values manually as required
*/

interface formSlice {
    [key: string]: any;
}

const initialState: formSlice = {
    requestInProgress: false,
    data: {}
}

const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        initializeForm: (state, action: PayloadAction<any>) => {
            const { id, stepper } = action.payload;

            state.data[id] = {
                values: {},
                errors: {},
                stepper: stepper
            }
        },
        setSubmissionStep: (state, action: PayloadAction<any>) => {
            const id = action.payload;

            state.data[id].stepper[0].completed = true;
            state.data[id].stepper[1].disabled = false;
        },
        setReceiptStep: (state, action: PayloadAction<any>) => {
            const id = action.payload;

            state.data[id].stepper[1].completed = true;
            state.data[id].stepper[2].completed = true;
            state.data[id].stepper[2].disabled = false;
        },
        setFormData: (state, action: PayloadAction<any>) => {
            const { id, values, errors } = action.payload;

            state.data[id].values = { ...values };
            state.data[id].errors = { ...errors }
        },
        deleteFormData: (state, action: PayloadAction<any>) => {
            const id = action.payload;

            state.data[id].values = {};
            state.data[id].errors = {}
            state.data[id].stepper[0].completed = false;
            state.data[id].stepper[1].completed = false;
            state.data[id].stepper[2].completed = false;
            state.data[id].stepper[1].disabled = true;
            state.data[id].stepper[2].disabled = true;
        },
        formSubmissionRequest: (state, action: PayloadAction<any>) => {
            state.requestInProgress = true;
        },
        formSubmissionSuccess: (state, action: PayloadAction<any>) => {
            state.requestInProgress = false;
        },
        formSubmissionFailure: (state, action: PayloadAction<any>) => {
            console.log("Failure: ", action);
            state.requestInProgress = false;
        },
        formReset: (state) => {
            state.data = {};
        }
    }
});

const { actions, reducer } = formSlice;

export const { 
    initializeForm, 
    setSubmissionStep, 
    setReceiptStep, 
    setFormData, 
    deleteFormData,
    formSubmissionRequest,
    formSubmissionSuccess,
    formSubmissionFailure,
    formReset
} = actions;

export default reducer;