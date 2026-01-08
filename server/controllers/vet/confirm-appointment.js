// const confirmVetAppointmentService = require('../../services/vet/confirm-appointment');

// module.exports = async (req, res, next) => {
//   try {
//     // Convert params to numbers to avoid NaN
//     const appointmentId = Number(req.params.appointmentId);
//     const vetId = Number(req.params.vetId);

//     // Validate IDs
//     if (isNaN(appointmentId) ) {
//       return res.status(400).json({ error: 'Invalid appointmentId ' });
//     }

//     if (isNaN(vetId) ) {
//       return res.status(400).json({ error: 'Invalid  groomerId' });
//     }

//     const appointment = await confirmVetAppointmentService({
//       appointmentId,
//       vetId,
//       status: req.body.status, // 'confirmed', 'completed', 'cancelled'
//     });

//     return res.status(200).json({
//       message: 'Appointment status updated successfully',
//       data: appointment,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const confirmAppointmentServices = require('../../services/vet/confirm-appointment');
const http = require('http-status');

module.exports = async (req, res, next) => {
  try {
    const confirmAppointment = await confirmAppointmentServices({
      appointmentId: Number(req.params.appointmentId),
      vetId: Number(req.params.vetId),
      status: req.body.status,
    });
    res.status(http.status.OK).json({
      success: true,
      message: 'Status updated by Groomer',
      data: confirmAppointment,
    });
  } catch (err) {
    next(err);
  }
};
