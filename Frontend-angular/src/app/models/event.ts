import {UserModel} from "./user";

export class EventModel{
  eventTitle!: string;
  eventDescription!: string;
  eventDate!: Date;
  eventStartTime!: string;
  eventEndTime!: string;
  eventLocation!: string;
  eventCreator!: string;
  eventParticipants!: [];
  range!: number;
}
