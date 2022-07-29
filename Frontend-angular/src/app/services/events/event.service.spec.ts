import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {EventModel} from "../../models/event";
import {of} from "rxjs";

describe('EventService', () => {
  let service: EventService;

  const http = jest.fn();


  describe('showEventsByWeek', () => {
it('should returns events by week', done => {
   const reponse: EventModel[] = [];

   const httpMock = {
     get: jest.fn().mockReturnValue(of(reponse))
   };
   const serviceMock = new EventService(httpMock as any);
   serviceMock.showEventsByWeek("2022-07-25").subscribe((data)=>{
     expect(httpMock.get).toBeDefined();
     expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/events/show/week/2022-07-25');
     expect(data).toEqual(reponse);
     done();
   })

})


  });


  describe('showEventById', () => {
    it('should returns event object', done => {
      const reponse = {} as EventModel;

      const httpMock = {
        get: jest.fn().mockReturnValue(of(reponse))
      };
      const serviceMock = new EventService(httpMock as any);
      serviceMock.showEventById("123456789").subscribe((data)=>{
        expect(httpMock.get).toBeDefined();
        expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/events/show/123456789');
        expect(data).toEqual(reponse);
        done();
      })

    })


  });

  describe('addEvent', () => {
    it('should add an object', done => {
      const eventToAdd = {eventTitle:'title'} as EventModel;
      const reponse = {} as EventModel;

      const httpMock = {
        post: jest.fn().mockReturnValue(of(reponse))
      };
      const serviceMock = new EventService(httpMock as any);
      serviceMock.addEvent(eventToAdd).subscribe((data)=>{
        expect(httpMock.post).toBeDefined();
        expect(httpMock.post).toHaveBeenCalledWith('http://localhost:3000/events/add/',eventToAdd);
        expect(data).toEqual(reponse);
        done();
      })

    })


  });

  describe('deleteEvent', () => {
    it('should delete an object', done => {

      const reponse = {} as EventModel;

      const httpMock = {
        delete: jest.fn().mockReturnValue(of(reponse))
      };
      const serviceMock = new EventService(httpMock as any);
      serviceMock.deleteEvent("123456789").subscribe((data)=>{
        expect(httpMock.delete).toBeDefined();
        expect(httpMock.delete).toHaveBeenCalledWith('http://localhost:3000/events/delete/123456789');
        expect(data).toEqual(reponse);
        done();
      })

    })


  });

  describe('updateEvent', () => {
    it('should update an object', done => {
      const eventToUpdate = {eventTitle:'title'} as EventModel;
      const reponse = {} as EventModel;

      const httpMock = {
        put: jest.fn().mockReturnValue(of(reponse))
      };
      const serviceMock = new EventService(httpMock as any);
      serviceMock.updateEvent(eventToUpdate,"123456789").subscribe((data)=>{
        expect(httpMock.put).toBeDefined();
        expect(httpMock.put).toHaveBeenCalledWith('http://localhost:3000/events/update/123456789',eventToUpdate);
        expect(data).toEqual(reponse);
        done();
      })

    })


  });


});
