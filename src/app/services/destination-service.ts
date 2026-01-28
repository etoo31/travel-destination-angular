import { Injectable, signal } from '@angular/core';
import { Destination } from '../models/destinations.type';
import { UnApprovedDestinations } from '../models/unApprovedDestination.type';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  destinations = signal<Destination[]>([
    {
      id: 1,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'United States',
      capital: 'Washington D.C.',
      region: 'North America',
      population: 331000000,
      currency: 'USD',
    },
    {
      id: 2,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Canada',
      capital: 'Ottawa',
      region: 'North America',
      population: 38000000,
      currency: 'CAD',
    },
  ]);

  unApprovedDestinations = signal<UnApprovedDestinations[]>([
    {
      id: 1,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Brazil',
      capital: 'Brasília',
      region: 'South America',
      population: 213000000,
      currency: 'BRL',
      wasFav: false,
      isFav: false,
    },
    {
      id: 2,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Argentina',
      capital: 'Buenos Aires',
      region: 'South America',
      population: 45000000,
      currency: 'ARS',
      wasFav: false,
      isFav: false,
    },
    {
      id: 3,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Chile',
      capital: 'Santiago',
      region: 'South America',
      population: 19000000,
      currency: 'CLP',
      wasFav: true,
      isFav: true,
    },
  ]);

  getUnApprovedDestinations() {
    return this.unApprovedDestinations();
  }

  toggleUnApprovedDestinationFav(destinationId: number): void {
    this.unApprovedDestinations.update((destinations) =>
      destinations.map((destination) =>
        destination.id === destinationId
          ? { ...destination, isFav: !destination.isFav }
          : destination,
      ),
    );
  }

  approveUnApprovedDestination(destinationId: number): void {
    const unApproved = this.unApprovedDestinations().find((d) => d.id === destinationId);
    if (unApproved) {
      // Add to approved destinations
      this.destinations.update((destinations) => [...destinations, unApproved as any]);
      // Remove from unapproved
      this.unApprovedDestinations.update((destinations) =>
        destinations.filter((d) => d.id !== destinationId),
      );
    }
  }

  getDestinations() {
    return this.destinations();
  }
}
