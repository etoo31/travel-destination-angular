import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DestinationTableService } from '../../services/destination-table-service';
import { Destination } from '../../models/destinations.type';

@Component({
  selector: 'app-destination-table',
  imports: [],
  templateUrl: './destination-table.html',
  styleUrl: './destination-table.css',
})
export class DestinationTable implements OnInit {
  ngOnInit(): void {
    if (this.type() === 'pending') this.destinationTableService.getApprovedDestinations();
    else if (this.type() === 'approved') {
      this.destinationTableService.getPendingDestinations();
    }
  }
  //pending || approved
  type = input.required<string>();
  destinationTableService = inject(DestinationTableService);

  destinations = computed(() => this.destinationTableService.getDestinationsByType(this.type()));

  handleApprove(destination: Destination) {
    this.destinationTableService.handleApproveDestination(destination);
  }

  handleRemove(destination: Destination) {
    this.destinationTableService.handleRemoveDestination(destination);
  }
}
