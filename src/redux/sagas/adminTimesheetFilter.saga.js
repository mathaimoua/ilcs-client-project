import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//post that does a select for the filtering
function* fetchTimesheetFilter(action) {
    try{
        console.log('in fetchTimesheetFilter saga...', action.payload);
        let response = yield axios.post('/api/adminTimesheets', action.payload);
        console.log(response.data);
        yield put ({type: 'SET_ADMIN_TIMESHEETS', payload: response.data});
    }catch(err) {
        console.log('error in fetchTimesheetFilter', err)
    }
}

function* adminTimesheetFilterSaga() {
    yield takeEvery('FETCH_FILTER', fetchTimesheetFilter)
}

export default adminTimesheetFilterSaga;