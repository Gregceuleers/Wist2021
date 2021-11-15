import {Component, OnInit} from '@angular/core';
import {IdbService} from "./db/core/idb.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Wist2021';

  constructor(
    private dbService: IdbService
  ) {

  }

  ngOnInit(): void {
    this.dbService.connectToIDB().then();
    this.dbService.dataPlayers().subscribe(data => console.log(data))
  }
}
