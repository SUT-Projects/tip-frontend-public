import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'COS60010-Quiz-App';

  myObservable = new Observable((observer) => {
    console.log("Observable starts")
    setTimeout(()=>{observer.next("1")}, 1000)
    setTimeout(()=>{observer.next("2")}, 2000)
    setTimeout(()=>{observer.next("3")}, 3000)
    setTimeout(()=>{observer.next("4")}, 4000)
    setTimeout(()=>{observer.next("5")}, 5000)
  });

  ngOnInit(){
    this.myObservable.subscribe((val) => {
      console.log(val);
    });
  }
}
