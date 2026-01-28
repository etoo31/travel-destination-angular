import { Pipe, PipeTransform } from '@angular/core';
import { UnApprovedDestinations } from '../models/unApprovedDestination.type';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(destinations: UnApprovedDestinations[], searchQuery: string): UnApprovedDestinations[] {
    if (!searchQuery || searchQuery.trim() === '') {
      return destinations;
    }

    const query = searchQuery.toLowerCase().trim();
    return destinations.filter((destination) =>
      destination.country.toLowerCase().startsWith(query),
    );
  }
}
