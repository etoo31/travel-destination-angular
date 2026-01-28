import { Component, input } from '@angular/core';

@Component({
  selector: 'app-destination-table',
  imports: [],
  templateUrl: './destination-table.html',
  styleUrl: './destination-table.css',
})
export class DestinationTable {
  //pending || approved
  type = input.required<string>();
}
