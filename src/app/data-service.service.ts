import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import * from '../assets/data/layout.json'
import { Observable, map,find,filter,of } from 'rxjs';
import { read } from 'fs';

export interface INavBarItem {
  isNav:boolean,
  link:string,
  icon:string
}
export interface ILayout {
  section: string;
  title: string;
  navigation: INavBarItem
  className:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private filePath = '../assets/data/layoutdata.json'
  private data:ILayout[] = new Array<ILayout>();

  constructor(private http:HttpClient) { 
      
      //#Method 1
      // this.getData().subscribe((d) => {
      //   this.data = d;
      //   console.log('Service constructor');
      //   console.log(d);
      //   console.log(this.data);
      // })

    //#Method 2 await reading
    this.readData();
  }

 //#Method 1: Intialize in constructor
  getData():Observable<ILayout[]>{
    return this.http.get<ILayout[]>(this.filePath);
  }

  getSectionParameters(section: string): ILayout {
    
    const emptyLayout = {} as ILayout;
    
    console.log('getSection method');
    console.log(this.data);

    const item = this.data.find(item => item.section === section);
    if (!item) {
      console.error(`Item with section '${section}' not found.`);
      return emptyLayout;
    }
    
    return item
  }

  //#Method 2 await reading
  async readData()
  {
    await this.getData().subscribe((d) => {
      this.data = d;
      console.log('Service constructor -> readData');
      console.log(d);
      console.log(this.data);
    })
  } 

  //#Method 3 return
  getSectionParametersOb(sectionName: string):Observable<ILayout | null | undefined> 
  {
    return this.getData().pipe(
      map(data=>data.find(item => item.section === sectionName))
    )
  }
     
}
