import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from 'src/app/Models/CalenderDais';
import { ShiloApiService } from 'src/app/servises/shilo-api.service';
import { Orders,Students } from 'src/app/Models/DataObjects';
import { map,finalize, retry, switchMap } from 'rxjs/operators';
import * as _ from "lodash";
import { forEach, has, isEqual } from 'lodash';
@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: [ './calender.component.css' ]
  })
  export class CalenderComponent implements OnInit {
    // Builder for the communication  with the service
    constructor(private data:ShiloApiService){}
   
    // Build variables that represented: the dates, what the date is today and whether
    // it passed and the names of the months    
    public myDats!:Array<Students|Orders>;
    public myDatsCon!:Array<Students|Orders>|null;
    public calendar: CalendarDay[] = [];
    public monthNames = ["ינואר", "פברואר ", "מרץ ", "אפריל ", "מאי ", "יוני ",
      "יולי ", "אוגוסט ", "ספטמבר ", "אוקטובר ", "נובמבר ", "דצמבר "
    ];
    public displayMonth!: string;
    private monthIndex: number = 0;
    
    ngOnInit(): void {
        // Initialize state
        this.data.changeCompstat({compName:"יומן",stat:true})
        // Initialize the calendar and tasks on the relevant dates
        this.generateCalendarDays(this.monthIndex);
        this.contans();
      }
    contans(){
        var $myDats!:Array<Students|Orders>|null;
        // Goes over the dates and what exists as a catcher marks it in the dates show in order to influence the color of the day
        this.data.getDats().subscribe({
            next:(resp)=>{
              // Also places the order variable or student that allows it to be added to the list of objects that represent what needs to be done on that date
                $myDats= resp;
                let st:string='';
                 if($myDats!=null){
                 for(let n = 0; n < this.calendar.length; n++){
                   if((this.calendar[n].date.getMonth()+1)<10)
                   st='-0';
                   else if((this.calendar[n].date.getMonth()+1)>10)
                   st='-';
                   let stDay:string='';
                   if((this.calendar[n].date.getDate())<10)
                   stDay='0';
                    var strDat:string= this.calendar[n].date.getFullYear()+st+(this.calendar[n].date.getMonth()+1)+'-'+stDay+this.calendar[n].date.getDate();
                    for(let i=0 ;i<$myDats.length;i ++)
                     {
                         if($myDats[i].date.includes(strDat))
                         this.calendar[n].isBisy=true;

                     }
                 }
                }
            }
         })
    }
    // A method that checks if the manager has what to do that day and 
    //gives by clicking on that day's schedule
    isDate(Date:Date){
      // Because the ShiloAPI server brings dates in a certain way and the interface of the objects 
      //turns the date into a string we build a match of the date variable to the string (by building a string that 
      //matches the variable obtained in the object) to see if they match
      let st:string='';
      let stDay:string='';
      if((Date.getDate())<10)
        stDay='0';
      if((Date.getMonth()+1)<10)
        st='-0';
      else if((Date.getMonth()+1)>10)
        st='-';
        let strDat:string= Date.getFullYear()+st+(Date.getMonth()+1)+'-'+stDay+Date.getDate();
        
        this.data.getDats().subscribe({
           next:(resp)=>{
               this.myDats= resp;
               this.myDatsCon=this.myDats.filter(x => _.includes(x.date, strDat));
           }
        })
    }
    // Splits the string so that you only see the time
    getHouer(str:string):string{
        const  dateTime:string[]=str.split('T');
        return dateTime[1];
        }
        // Adjusts the schedule description so that whether it is a student or a show
    getSubject(Obj:Students|Orders): string{
      
        var Obj1=Obj as Students;
         var Obj2 =Obj as Orders;
        if(Obj1.name!=undefined)
        return " שם: "+Obj1.name+"   כלי: "+ Obj1.instrument;
        if(Obj2.custumerAddres!=undefined)
        return " כתובת מופע: " +Obj2.custumerAddres+ " :שם המופע "+ Obj2.prodactbandName;
        return '';

    }
    private generateCalendarDays(monthIndex: number): void {
      // we reset our calendar
      this.calendar = [];
  
      // we set the date 
      let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
  
      // set the dispaly month for UI
      this.displayMonth = this.monthNames[day.getMonth()];
  
      let startingDateOfCalendar = this.getStartDateForCalendar(day);
  
      let dateToAdd = startingDateOfCalendar;
      for (var i = 0; i < 35; i++) {
        this.calendar.push(new CalendarDay(new Date(dateToAdd)));
        dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
      }
    }
  
    private getStartDateForCalendar(selectedDate: Date){
      // for the day we selected let's get the previous month last day
      let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
  
      // start by setting the starting date of the calendar same as the last day of previous month
      let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
  
      // but since we actually want to find the last Monday of previous month
      // we will start going back in days intil we encounter our last Monday of previous month
      if (startingDateOfCalendar.getDay() !=0) {
        do {
          startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
        } while (startingDateOfCalendar.getDay() != 0);
      }
  
      return startingDateOfCalendar;
    }
  // Moves a page in the calendar, which means giving the calendar next month in the date system
    public increaseMonth() {
        this.monthIndex++;
        this.generateCalendarDays(this.monthIndex);
        this.contans();
      }
   // Moves back a page in the calendar, which means that it gives the previous calendar in the date system 
      public decreaseMonth() {
        this.monthIndex--
        this.generateCalendarDays(this.monthIndex);
        this.contans();
      }
    // Resets the calendar i.e. gives the date calendar the current calendar
      public setCurrentMonth() {
        this.monthIndex = 0;
        this.generateCalendarDays(this.monthIndex);
        this.contans();
      }
    // Deletes the task I have in the table
     async removOrderStudent(Date:string){
         await  this.data.deleteOS(Date);
      }
    }
    