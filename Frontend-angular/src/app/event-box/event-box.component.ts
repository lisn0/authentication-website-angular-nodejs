import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../services/events/event.service";
import {EventModel} from "../models/event";
import {Router} from "@angular/router";



@Component({
  selector: 'app-event-box',
  templateUrl: './event-box.component.html',
  styleUrls: ['./event-box.component.css']
})
export class EventBoxComponent implements OnInit {

  @Input() event!:EventModel;
  userId= "62e25fc2e104d93371c04f15";
  @Output() eventToDelete = new EventEmitter<EventModel>();
  eventId!:any;

  constructor(private eventService:EventService, private route:Router) {
    }


  ngOnInit(): void {
this.getEventId(this.event);
   // console.log('received  ', this.event)

  }

  deleteEvent(e:any){
    this.eventToDelete.emit(e);
    this.eventService.deleteEvent(e._id).subscribe(res =>{

    }, err=>{

    }, ()=>{
      this.eventToDelete.emit(e);
    });
  }

  getEventId(e:any){
    this.eventId = e._id;
  }



}
