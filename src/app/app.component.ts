import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdbService} from "./db/core/idb.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Wist2021';

  dataPlayersSubscription: Subscription | undefined;

  constructor(
    private dbService: IdbService
  ) {

  }

  ngOnInit(): void {
    this.dbService.connectToIDB().then();
    this.dataPlayersSubscription = this.dbService.dataPlayers().subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    if (this.dataPlayersSubscription) {
      this.dataPlayersSubscription.unsubscribe();
    }
  }
}
