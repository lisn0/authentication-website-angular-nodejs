import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventComponent } from './add-event.component';
import {of} from "rxjs";
import {EventModel} from "../models/event";
import {UserModel} from "../models/user";

describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let eventServiceMock: any;
  let userServiceMock: any;
  let routeMock: any;
  let listUsers = [{ firstName: "nada", _id:"123456789"} as UserModel, { firstName: "amal", _id:"987654321"} as UserModel ]

  beforeEach( () => {
    eventServiceMock = {
      addEvent: jest.fn().mockReturnValue(of(true))
    }

    userServiceMock = {
      getAllUsers: jest.fn().mockReturnValue(of(listUsers))
    }

    routeMock = {
      navigate: jest.fn().mockReturnValue(of(true))
    }

    component = new AddEventComponent(eventServiceMock,routeMock,userServiceMock)

    component.ngOnInit();

  });

describe('Test Component creation', () =>{
  it('should component be created', () =>{
    expect(component).toBeTruthy();
  });
})

  describe('Test addEvent method', () =>{
    it('should event be created', () =>{
       // @ts-ignore
      component.selectedItem = ["0000","1111"]
      component.userId = "1234"
      let f = {eventTitle: "test" } as EventModel;
      component.addEvent(f);
      expect(f.eventCreator).toEqual(component.userId)
      expect(f.eventParticipants).toEqual(component.selectedItem)
      expect(eventServiceMock.addEvent).toHaveBeenCalled()
      expect(routeMock.navigate).toHaveBeenCalled()

    });
  })



});
