import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import adminClients from './adminClients.reducer';
import employeeClientsReducer from './EmployeeDashboard.reducer';
import adminemployeesview from './adminemployeesview.reducer';
import employeedetails from './employeedetails.reducer'
import clientlist from './clientlist.reducer'
import clockInData from './employeeClockIn.reducer';
import adminAllTimesheetsReducer from './adminAllTimesheets.reducer';
import clientInfoClockIn from './clientInfoClockIn.reducer';
import employeeClockInStatus from './employeeClockInStatus.reducer';
import employeeAllTimesheets from './employeeAllTimesheets.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  adminClients,
  employeeClientsReducer,
  adminemployeesview,
  employeedetails,
  clientlist,
  clockInData, // will have all geo location data.
  adminAllTimesheetsReducer,
  clientInfoClockIn, // will hold client name, address, and bio for clock in screen.
  employeeClockInStatus, // will hold all of the info on the open timesheets where user has not clocked out.
  employeeAllTimesheets, // will hold all of the timesheet submissions for a specific user.
  employeeClockInStatus //will hold all of the info on the open timesheets where user has not clocked out.
});

export default rootReducer;
