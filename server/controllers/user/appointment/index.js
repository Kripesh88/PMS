const createAppointment= require('./create-appointment');
const getUpcomingAppointments= require('./get-upcoming-appointments');
const getCancelledAppointments= require('./get-cancelled-appointments');
const getCompletedAppointments= require('./get-completed-appointments');
module.exports={
    createAppointment,
    getUpcomingAppointments,
    getCancelledAppointments,
    getCompletedAppointments
};