import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker functions
function* addClient (action) {
    try {
    yield axios.post('api/adminClients', action.payload);
    yield put({ type: 'FETCH_CLIENTS', payload: response.data });

    } catch (error) {
         console.log('Add client post failed', error);
    }
}//end of addClient

function* fetchClients () {
    try {
        const response = yield axios.get('/api/adminClients');
        console.log('this  is payload', response.data);
        yield put({ type: 'SET_CLIENTS', payload: response.data });
        
    } catch (error) {
        console.log('error  in get clients', error);
    }

}//end of fetchClients

function* adminClients (){
    yield takeEvery('FETCH_CLIENTS', fetchClients);
    yield takeEvery('ADD_CLIENT', addClient);
    

}//end of AdminAddClient saga

export default adminClients;