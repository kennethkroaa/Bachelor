import axios from "axios";
import { call, put, takeEvery } from 'redux-saga/effects';
import { formSubmissionFailure, formSubmissionRequest, formSubmissionSuccess } from './reducer';

export function* watcherSubmitForm() {
    yield takeEvery(formSubmissionRequest, workerSubmitForm);
}

function* workerSubmitForm(action: any) {
    try {
        const response = yield call(callSubmitForm, action.payload.values);

        action.payload.onSuccess();
        yield put(formSubmissionSuccess(response));
    } catch(error) {
        action.payload.onFailure();
        yield put(formSubmissionFailure(error));
    }
}

/*
    As our payload is both JSON data in addition to files,
    we have to send the data as a multipart/form-data
    with a JSON Blob and file Blobs

    Many, many regrets were had adding a comma separator to values
    with like a couple days remaning of the project
    It's passed into the store with commas and its chaos everywhere
*/
const callSubmitForm = (payload: any) => {
    const formData = new FormData();

    /*
        Desctructure our payload to not include the files array,
        as we add these separately to the FormData
    */
    const { files, dividends, ...excludeFiles } = payload;

    const formattedDividends: any = [];

    /* Total dividend sums */
    let dividendValues = {
        amount: 0,
        refundClaim: 0,
        withholdingTax: 0
    }

    Object.values(payload.dividends).forEach((dividend: any) => {
        dividendValues.amount += parseInt(dividend.amount.split(",").join(""));
        dividendValues.refundClaim += parseInt(dividend.refundClaim.split(",").join(""));
        dividendValues.withholdingTax += parseInt(dividend.withholdingTax.split(",").join(""));

        formattedDividends.push({
            VPSnumber: dividend.VPSnumber,
            dateOfPayment: dividend.dateOfPayment,
            ISINnumber: dividend.ISINnumber,
            nameOfNorwegianCompany: dividend.nameOfNorwegianCompany, //We have to remove the comma separation from our dividends first
            amount: parseInt(dividend.amount.split(",").join("")),
            refundClaim: parseInt(dividend.refundClaim.split(",").join("")),
            withholdingTax: parseInt(dividend.withholdingTax.split(",").join(""))
        })
    });

    /* 
        We stringify our JSON data to later send it as a blob
        that we can append to FormData
    */
    const JSONData = JSON.stringify({
        ...excludeFiles,
        dividends: formattedDividends,
        sumGrossAmount: dividendValues.amount,
        sumDividendWithholdingTax: dividendValues.withholdingTax,
        sumDividendRefundClaim: dividendValues.refundClaim,
    });

    console.log(JSONData);

    const blob = new Blob([JSONData], {
        type: 'application/json'
    });

    //Backend takes data by the refundperson key
    formData.append("refundperson", blob);

    for(const [key, value] of Object.entries(payload.files)){
        for(const file of (value as any)){
            //Append files depending on the dropzone name as key
            formData.append(key, dataURLtoBlob(file.data), file.name);
        }
    }

    return axios({
        method: 'post',
        url: 'https://api-test.jyhne.no/refundperson',
        data: formData,
        headers: { 'Accept': '*/*', 'Content-Type': 'multipart/form-data' }
    })
};

// https://stackoverflow.com/questions/12168909/blob-from-dataurl
function dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}