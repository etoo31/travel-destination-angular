import { Component, computed, inject } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { DestinationCard } from '../../components/user-dashboard-components/destination-card/destination-card';
import { NoResult } from '../../components/user-dashboard-components/no-result/no-result';
import { DestinationService } from '../../services/destination-service';
import { SearchDestination } from '../../components/user-dashboard-components/search-destination/search-destination';

@Component({
  selector: 'app-user-dashboard-page',
  imports: [Nav, DestinationCard, NoResult, SearchDestination],
  templateUrl: './user-dashboard-page.html',
  styleUrl: './user-dashboard-page.css',
})
export class UserDashboardPage {
  destinationService = inject(DestinationService);

  destinations = computed(() => this.destinationService.getDestinations());
}
