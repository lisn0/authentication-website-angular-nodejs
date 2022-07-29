import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {EventService} from "../services/events/event.service";
import {EventModel} from "../models/event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  pipe = new DatePipe('en-US');
  eventsList:EventModel[] = [];

  datePointer = new Date();

  constructor(private eventService:EventService, private route:Router) { }

  ngOnInit(): void {
    let now = Date.now();
    let myDate = this.pipe.transform(now, 'yyy-MM-dd');
   // console.log(myDate);
    this.eventService.showEventsByWeek(myDate).subscribe(
      (data)=>{
        this.eventsList = data;
        this.eventsList.forEach(value => value.range = (new Date(value.eventDate).getDay()))

       // console.log("list",this.eventsList);
      }
    )


  }

  removeEventFromEventList(item: any){
   // console.log('rec  ', item)
    const index = this.eventsList.indexOf(item,0);
    if(index > -1){
      this.eventsList.splice(index,1);
    }
    //console.log('new list  ', this.eventsList)
  }

  redirectToAddEvent(){
    this.route.navigate(['calendar/add']);
  }

  showPreviousWeekEvents(){
    this.datePointer = new Date(this.datePointer.setDate(this.datePointer.getDate()-7));

    let myDate = this.pipe.transform(this.datePointer, 'yyy-MM-dd');
   // console.log("mydate", myDate);
  //  console.log(myDate);
    this.eventService.showEventsByWeek(myDate).subscribe(
      (data)=>{

        this.eventsList = data;
        this.eventsList.forEach(value => value.range = (new Date(value.eventDate).getDay()))

       // console.log("list",this.eventsList);
      }
    )
  }

  showNextWeekEvents(){
    this.datePointer = new Date(this.datePointer.setDate(this.datePointer.getDate()+7));
    let myDate = this.pipe.transform(this.datePointer, 'yyy-MM-dd');
    this.eventService.showEventsByWeek(myDate).subscribe(
      (data)=>{

        this.eventsList = data;
        this.eventsList.forEach(value => value.range = (new Date(value.eventDate).getDay()))

      //  console.log("list",this.eventsList);
      }
    )
  }

  reloadComponent(){
    this.ngOnInit();
  }

}
