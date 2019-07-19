import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getTasksFromService();
    this.newTask = {}
  }
  tasks = [];
  newTask: any;
  editTask: any;
  isClicked = false;
  title = 'RESTful Tasks';

  getTasksFromService(){
    this._httpService.getTasks().subscribe(data => {
      console.log(data);
      this.tasks = DataView['tasks'];
    })
  };

  getTaskFromService(id){
    this._httpService.getTask(id).subscribe(data => {
      console.log(data);
      this.editTask = data['tasks'];
      this.isClicked = true;
    })
  }

  deleteTaskFromService(id){
    this._httpService.deleteTask(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  };

  onSubmit(id?:Number){
    if(id){
      this._httpService.updateTask(this.editTask,id).subscribe(data =>{
        console.log(data);
        this.isClicked = false;
      });
    } else {
      this._httpService.createTask(this.newTask).subscribe(data =>{
        console.log(data);
      })
    }
    this.ngOnInit();
  }
}
