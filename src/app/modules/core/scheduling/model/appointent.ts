export class Appointment{
    endTime:Date;
    endTimezone: string
    id: number
    isAllDay: boolean
    recurrenceRule: string
    startTime: Date
    startTimezone: string
    subject: String
    isReadonly:boolean
    isBlock:boolean
    patientId:number
    physicianId:number
}