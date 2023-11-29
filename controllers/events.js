const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const Event = require('../models/Event')

const getEvent = async( req, res = response ) => {

    const getEvents = await Event.find()
                                 .populate('user', 'name');
    res.json({
        ok: true,
        getEvents
    })
};

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body )

    try {
        
        event.user = req.uid;

        const eventSaved = await event.save()

        res.json({
            ok: true,
            event: eventSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'contact support'
        })
    }
    //verify the event
    console.log( req.body )
};

const updateEvent = async( req, res = response ) => {
    const eventId = req.params.id;
    const uid = req.uid
    
    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'this event doesnt exist'
            })
        };

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'unauthorized'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contact support'
        });
    }
};

const deleteEvent = async( req, res = response ) => {
    const eventId = req.params.id;
    const uid = req.uid
    
    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'this event doesnt exist'
            })
        };

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'unauthorized'
            });
        }

        const eventDeleted = await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            msg: 'Deleted succesfully',
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contact support'
        });
    }
};

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};