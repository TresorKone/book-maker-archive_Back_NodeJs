const express = require('express');

const profileController = require('../controllers/profile');
const jwtCheck = require('../middleware/check-auth');

const router = express.Router();

// POST /profile/add
router.post('/add', jwtCheck, profileController.postAddProfile);

// GET /profile/info/:id
router.get('/info/:profileId', profileController.getProfile);

// PATCH /profile/edit/:id
router.patch('/edit/:profileId', jwtCheck, profileController.editProfile);

// DELETE /profile/delete/:id
router.delete('/delete/:profileId', jwtCheck, profileController.deleteProfile);

module.exports = router;