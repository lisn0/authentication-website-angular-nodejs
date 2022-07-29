import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBoxComponent } from './event-box.component';
import {of} from "rxjs";
import {EventModel} from "../models/event";

describe('ShowEventsByDateComponent', () => {
  let component: EventBoxComponent;
  let eventServiceMock: any;
  let routeMock: any;

  beforeEach(() => {

    eventServiceMock = {
      deleteEvent: jest.fn().mockReturnValue(of(true))
    }
    routeMock = {
      navigate: jest.fn().mockReturnValue(of(true))
    }
    component = new EventBoxComponent(eventServiceMock, routeMock)

    // @ts-ignore
    component.event = { "_id":12345 }

    component.ngOnInit()
  });


  describe('Test Component creation', () => {
    it('should component be created', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Test deleteEvent method', () => {
    it('should event be deleted', () => {
      // @ts-ignore
      let f = {eventTitle: "test"} as EventModel;
      component.deleteEvent(f);
      expect(eventServiceMock.deleteEvent).toHaveBeenCalled()
    });

  })

  describe('Test getEventId method', () => {
    it('should event be get', () => {
      // @ts-ignore
      let f = {_id: "123456"} as EventModel;
      component.eventId = "1234"
      component.getEventId(f);
      expect(component.eventId).toEqual("123456")
    });

  })

});
