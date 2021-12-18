import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit {

  steps: MenuItem[] = [
    {label: 'Joueurs'},
    {label: 'Nombre de parties'},
    {label: 'Confirmation'}
  ];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

}
