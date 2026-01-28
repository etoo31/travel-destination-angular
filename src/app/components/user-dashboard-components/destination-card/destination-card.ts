import { Component, computed, inject } from '@angular/core';
import { DestinationService } from '../../../services/destination-service';

@Component({
  selector: 'app-destination-card',
  imports: [],
  templateUrl: './destination-card.html',
  styleUrl: './destination-card.css',
})
export class DestinationCard {
  destinationService = inject(DestinationService);

  destinations = computed(() => this.destinationService.getDestinations());
}
