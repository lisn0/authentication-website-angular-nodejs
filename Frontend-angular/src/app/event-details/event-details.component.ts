import { Component, OnInit } from '@angular/core';
import {EventService} from "../services/events/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventModel} from "../models/event";
import {DatePipe} from "@angular/common";
import {UserService} from "../services/users/user.service";
import {UserModel} from "../models/user";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  pipe = new DatePipe('en-US');
  event!:EventModel;
  eventId!:any;
  eventTitle!:any;
  eventDescription!:any;
  eventDate!:any;
  eventStartTime!:any;
  eventEndTime!:any;
  eventLocation!:any;
  eventParticipants= [];

  selectedItem= [];
  usersList:UserModel[] = [];
  constructor(private eventService:EventService, private route:Router, private ar:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.showAllUsers();

    this.eventId = this.ar.snapshot.params['eventId'];

    this.showEventsById(this.ar.snapshot.params['eventId']);

  }

  updateEvent(f:any){
    f.eventParticipants= this.selectedItem
    //console.log("Object to be updated",f);
    this.eventId = this.ar.snapshot.params['eventId'];
  //  console.log("Object to be updated ID",this.eventId);
    this.eventService.updateEvent(f,this.eventId).subscribe(
  ()=>{
    //console.log("updaaate");
  }

)
    this.route.navigate(['calendar']);
  }

  showAllUsers(){
    this.userService.getAllUsers().subscribe(
      (data)=>{
        this.usersList = data;
      //  console.log("users",this.usersList)
      }
    )

  }

  showEventsById(id:string){
    this.eventService.showEventById(id).subscribe(
      (res) =>{
        this.event = res;
        // console.log("date", this.eventDate);

      },()=>{

      },()=>{
        this.eventTitle = this.event.eventTitle;
        this.eventDescription = this.event.eventDescription;
        this.eventDate = this.pipe.transform(this.event.eventDate, 'yyy-MM-dd')
        //this.eventDate = this.event.eventDate;
        this.eventStartTime = this.event.eventStartTime;
        this.eventEndTime = this.event.eventEndTime;
        this.eventLocation = this.event.eventLocation;
        this.eventParticipants = this.event.eventParticipants;
        this.selectedItem = [...this.eventParticipants]

       // console.log("event",this.event)
        //console.log("participants",this.eventParticipants)
        //console.log("selected",this.selectedItem)

      });
  }




}
