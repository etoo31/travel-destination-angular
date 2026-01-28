import { Component, computed, inject, input } from '@angular/core';
import { DestinationTableService } from '../../services/destination-table-service';

@Component({
  selector: 'app-destination-table',
  imports: [],
  templateUrl: './destination-table.html',
  styleUrl: './destination-table.css',
})
export class DestinationTable {
  //pending || approved
  type = input.required<string>();
  destinationTableService = inject(DestinationTableService);

  destinations = computed(() => this.destinationTableService.getDestinationsByType(this.type()));

  handleApprove(destinationId: number) {
    this.destinationTableService.handleApproveDestination(destinationId);
  }

  handleRemove(destinationId: number) {
    this.destinationTableService.handleRemoveDestination(destinationId);
  }
}
