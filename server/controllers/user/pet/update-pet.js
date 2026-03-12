const updatePetService = require('../../../services/user/pet/update-pet');
const http = require('http-status');

module.exports = async (req, res, next) => {
    try {
        const pet = await updatePetService({
            user: req.user,
           body: req.body,
        });
        res.status(http.status.OK).json({
            message: 'Pet updated successfully',
            data: pet,
        });
    } catch (error) {
        next(error);
    }
};