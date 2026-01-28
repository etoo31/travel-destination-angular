import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinationService } from '../../services/destination-service';
import { UnApprovedDestinations } from '../../models/unApprovedDestination.type';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';

@Component({
  selector: 'app-search-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './search-destination.html',
  styleUrl: './search-destination.css',
})
export class SearchDestination {
  destinationService = inject(DestinationService);

  searchQuery = signal('');
  destinations = computed(() => this.destinationService.unApprovedDestinations());

  canUpdate = computed(() => {
    return this.destinations().some((destination) => destination.isFav !== destination.wasFav);
  });

  toggleWantToVisit(destinationId: number) {
    this.destinationService.toggleUnApprovedDestinationFav(destinationId);
  }
}
