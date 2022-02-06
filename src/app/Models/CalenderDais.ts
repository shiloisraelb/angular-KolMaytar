export class CalendarDay {
    //the parameters of the date in calender
    public date: Date;
    public title!: string;
    public isPastDate: boolean;
    public isToday: boolean;
    public isBisy:boolean=false;
    constructor(d: Date) {
    //this constractor is saying if the day is pased or not and bild th new date
      this.date = d;
      this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
      this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    }
}