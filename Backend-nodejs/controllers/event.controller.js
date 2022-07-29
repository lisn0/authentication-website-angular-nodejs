const { Event } = require("../models/event.model");
const {Participant} = require("../models/participant.model");
var nodemailer = require('nodemailer');
const {User} = require("../models/user.model");
//import  dateFormat, { masks } from "dateformat";
//const {dateFormat, masks} = require('dateformat');

module.exports = {

    createEvent: async (req, res) => {
        try{
            const event = new Event(req.body);
            //event.eventDate = dateFormat(req.body.eventDate, "dd.mmm.yyyy")
            //event.eventDate = dateFormat(req.body.eventDate, "paddedShortDate", true);
            await event.save();
            console.log("event id",event._id);

            for (const element of event.eventParticipants) {
                console.log(element);
                const participant = new Participant();
                participant.eventID = event._id;
                participant.userID = element._id;
                participant.save();

                const user = await User.findById(element._id);
                console.log("firstname",user.firstName);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'gharbi.nd@gmail.com',
                        pass: 'xufgsygbkwdffhnj'
                    }
                });

                var mailOptions = {
                    from: 'gharbi.nd@gmail.com',
                    to: `${user.email}`,//`${element.email}`, gharbi.ghada93@gmail.com,
                    subject: `Invitation to ${event.eventTitle}`,
                    text: `Hello ${user.firstName}! You are invited to the Event ${event.eventTitle} on ${event.eventDate.toUTCString()} From ${event.eventStartTime} to ${event.eventEndTime}`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            }


            res.json("/events/list");
        } catch{
           // console.log(err);
        }

    },

    showEvents: async (req, res) => {
        try{
            const events = await Event.find();

            res.send(events);
        } catch {
            console.log(err);
        }

    },

  showEventsByDate: async (req, res) => {
        try{
            console.log('yes')
            const { date } = req.params;
            console.log('dd  ', date);

            await Event.find(({ eventDate:  date }),function (err, events) {
                if(events != null) {
                    console.log('here 1')
                    console.log(events)
                    res.json(events);
                }else{
                    console.log('here 2')
                    res.json([]);
                }
            });
            //await Event.find(({ eventDate:  date }),function (err, events) {res.json(events);});
            console.log(events);
        } catch {
        }
  },

    showEventsByDateRange: async (req, res) => {
        try{
            const { mydate } = req.params;

            var date = new Date(mydate);

            const firstday = new Date(date.setDate(date.getDate() - date.getDay()+1 ));
            const lastday = new Date(date.setDate(date.getDate() - date.getDay() + 7));
            console.log(firstday, lastday)
            await Event.find(({ eventDate: {$gte: firstday, $lte: lastday }}),function (err, events) {

                res.json(events);

            });

        } catch {
        }
    },

    showOneEvent: async (req, res) => {
        const event = await Event.findById(req.params.id);
        res.send(event);
    },

    deleteEvent: async (req,res)=>{
        const { id } = req.params;
        const event = await Event.findById(id);
        for (const element of event.eventParticipants) {
            console.log(element);

            const user = await User.findById(element._id);
            console.log("firstname",user.firstName);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'gharbi.nd@gmail.com',
                    pass: 'xufgsygbkwdffhnj'
                }
            });

            var mailOptions = {
                from: 'gharbi.nd@gmail.com',
                to: `${user.email}`,//`${element.email}`, gharbi.ghada93@gmail.com,
                subject: `Canceled - ${event.eventTitle}`,
                text: `Hello ${user.firstName}! the Event ${event.eventTitle} on ${event.eventDate.toUTCString()} From ${event.eventStartTime} to ${event.eventEndTime} is canceled`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        }
        await Event.remove({ _id: id });
        await Participant.remove({ eventID: id });

        res.json('/events/list');
    },


    updateEvent : async (req, res) => {
        const event = await Event.findById(req.params.id);
        console.log(req.body)
        event.eventTitle = req.body.eventTitle;
        event.eventDescription = req.body.eventDescription;
        event.eventDate = req.body.eventDate;
        event.eventStartTime = req.body.eventStartTime;
        event.eventEndTime = req.body.eventEndTime;
        event.eventLocation = req.body.eventLocation;
        event.eventParticipants = req.body.eventParticipants;

        await event.save();
        res.json("/events/list");
    },

    /*sendEmail: (req, res)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gharbi.nd@gmail.com',
                pass: 'xufgsygbkwdffhnj'
            }
        });

        var mailOptions = {
            from: 'gharbi.nd@gmail.com',
            to: 'gharbi.ghada93@gmail.com',
            subject: 'Invitation',
            text: 'Hello! You are invited to the Event'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }*/




    }




