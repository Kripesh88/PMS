const getUpcomingAppointmentsServices= require('../../../services/user/appointment/get-upcoming-appointments');
const http= require('http-status');

module.exports= async(req,res,next)=>{
    try{
        const upcomingAppointment= await getUpcomingAppointmentsServices({
            userId: req.params.userId,
        });
        res.status(http.status.OK).json({
            message:'success',
            data:upcomingAppointment,
        });
    }catch(err){
        next(err);
    }
}