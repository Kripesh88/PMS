const getCompletedAppointmentsServices= require('../../../services/user/appointment/get-completed-appointments');
const http= require('http-status');

module.exports= async(req,res,next)=>{
    try{
        const completedAppointment= await getCompletedAppointmentsServices({
            user: req.user,
        });
        res.status(http.status.OK).json({
            message:'success',
            data:completedAppointment,
        });
    }catch(err){
        next(err);
    }
}