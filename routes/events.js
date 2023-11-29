//! Event Routes / EVENT --- Host + /api/event
const { Router } = require('express');
const { check } = require('express-validator');
const { getEvent, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = Router()

//*All petitions gonna be validated
router.use( validateJWT )

//*Get events 
router.get('/', getEvent)

//*Create new event
router.post(
    '/',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ],  
    createEvent)

//*Update event
router.put('/:id', updateEvent)

//*Delete event
router.delete('/:id', deleteEvent)

module.exports = router;
