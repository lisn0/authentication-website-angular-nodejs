import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import {of} from "rxjs";
import {EventBoxComponent} from "../event-box/event-box.component";
import {EventModel} from "../models/event";
import {UserModel} from "../models/user";

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let eventServiceMock: any;
  let routeMock: any;
  let activatedRouteMock: any;
  let userServiceMock: any;
  // @ts-ignore
  let event = { eventTitle:"test", eventDescription:"desc", eventDate:'2022-07-25', eventStartTime:"10:00",
    eventEndTime:"11:00", eventLocation:"location", eventParticipants:[{ firstname:"nada"}]} as EventModel;
  let users = [{ firstname:"nada"} as UserModel , {firstname: "amal"} as UserModel]

  beforeEach( () => {
    eventServiceMock = {
      showEventById: jest.fn().mockReturnValue(of(event)),
      updateEvent: jest.fn().mockReturnValue(of(true))
    }
    userServiceMock = {
      getAllUsers: jest.fn().mockReturnValue(of(users))
    }
    routeMock = {
      navigate: jest.fn().mockReturnValue(of(true))
    }
    activatedRouteMock = {
      snapshot: {
        params:{
          eventId:'1'
        }
      }
    }
    component = new EventDetailsComponent(eventServiceMock, routeMock, activatedRouteMock, userServiceMock)

    component.ngOnInit()

  });

  describe('Test Component creation', () => {
    it('should component be created', () => {
      expect(component).toBeTruthy();
    });
  })

 describe('Test updateEvent method', () => {
    it('should event be updated', () => {
      // @ts-ignore
      let f = {_id: "1234",eventTitle: "test", eventParticipants:[{ firstName:"nada"}]} as EventModel;
      component.eventId = 12345;
      // @ts-ignore
      component.selectedItem = ["0000","1111"]
      component.updateEvent(f);
      expect(f.eventParticipants).toEqual(component.selectedItem)
      expect(eventServiceMock.updateEvent).toHaveBeenCalled()

    });

  })


});
