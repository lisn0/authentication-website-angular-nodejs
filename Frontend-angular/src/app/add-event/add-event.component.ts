import { Component, OnInit } from '@angular/core';
import {EventService} from "../services/events/event.service";
import {Router} from "@angular/router";
import {EventModel} from "../models/event";
import {UserModel} from "../models/user";
import {UserService} from "../services/users/user.service";


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  selectedItem= [];
  usersList:UserModel[] = [];

//user!:UserModel;
userId= "62e25fc2e104d93371c04f15";



  constructor(private eventService:EventService, private route:Router, private userService:UserService) {
  }

  ngOnInit(): void {
    //this.user= new UserModel()

    this.userService.getAllUsers().subscribe(
      (data)=>{
        this.usersList = data;
       // console.log("users",this.usersList)
      }
    )

  }

  addEvent(f:any){
    //console.log('added ', this.selectedItem)
    f.eventParticipants= this.selectedItem
    console.log('f ', f)

     f.eventCreator = this.userId;
     this.eventService.addEvent(f).subscribe(
       ()=>{
         this.route.navigate(['calendar']);
       }
     )
  }

}
