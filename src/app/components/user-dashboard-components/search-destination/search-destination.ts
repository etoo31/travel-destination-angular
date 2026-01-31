import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinationService } from '../../../services/destination-service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';

@Component({
  selector: 'app-search-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './search-destination.html',
  styleUrl: './search-destination.css',
})
export class SearchDestination implements OnInit {
  ngOnInit(): void {
    this.destinationService.getUnApprovedDestinations();
  }
  destinationService = inject(DestinationService);

  searchQuery = signal('');
  destinations = computed(() => this.destinationService.unApprovedDestinations());

  canUpdate = computed(() => {
    return this.destinations().some((destination) => destination.isFav !== destination.wasFav);
  });

  toggleWantToVisit(destinationId: string) {
    this.destinationService.toggleUnApprovedDestinationFav(destinationId);
  }

  AddToFav() {
    const changed = this.destinations().filter((d) => d.isFav !== d.wasFav);

    console.log(changed);
    this.destinationService.addToFavoriteDestination(changed);
  }
}
