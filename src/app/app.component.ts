import { Component, OnInit } from '@angular/core';
import { DataService, ILayout } from './data-service.service';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'class5-http-service-test';
  
  componentData:ILayout= {} as ILayout;
  componentDataOb:Observable<ILayout | null | undefined>  = EMPTY;
  error = false;

  constructor (private dataService:DataService){

  }
  ngOnInit(): void {
      this.componentData = this.dataService.getSectionParameters("education");
      this.componentDataOb = this.dataService.getSectionParametersOb("education").pipe(
        catchError(() => {
        this.error = true;
        return EMPTY;
      }));
  }
}
