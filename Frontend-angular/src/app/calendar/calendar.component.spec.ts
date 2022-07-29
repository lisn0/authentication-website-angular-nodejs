import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import {of} from "rxjs";
import {EventBoxComponent} from "../event-box/event-box.component";
import spyOn = jest.spyOn;
import {EventModel} from "../models/event";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let eventServiceMock: any;
  let routeMock: any;
let events = [{eventTitle: "title"} as EventModel]
  let range = 1;
  beforeEach(async () => {

    eventServiceMock = {
      showEventsByWeek: jest.fn().mockReturnValue(of(events))
    }
    routeMock = {
      navigate: jest.fn().mockReturnValue(of(true))
    }
    component = new CalendarComponent(eventServiceMock, routeMock)
    component.ngOnInit()

  });

  describe('Test Component creation', () => {
    it('should component be created', () => {
      expect(component).toBeTruthy();
    });
  })

});
