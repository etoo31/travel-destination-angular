import { Injectable, signal } from '@angular/core';
import { Destination } from '../models/destinations.type';

@Injectable({
  providedIn: 'root',
})
export class DestinationTableService {
  approvedDestinations = signal<Destination[]>([
    {
      id: 1,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'United States',
      capital: 'Washington D.C.',
      region: 'North America',
      population: 331000000,
      currency: 'USD',
      noOfSuggestions: 5,
    },
    {
      id: 2,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Canada',
      capital: 'Ottawa',
      region: 'North America',
      population: 38000000,
      currency: 'CAD',
      noOfSuggestions: 3,
    },
  ]);

  pendingDestinations = signal<Destination[]>([
    {
      id: 1,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'Egypt',
      capital: 'Cairo',
      region: 'Africa',
      population: 100000000,
      currency: 'EGP',
      noOfSuggestions: 5,
    },
    {
      id: 2,
      flagUrl: 'https://flagcdn.com/eg.svg',
      country: 'KSA',
      capital: 'Riyadh',
      region: 'Asia',
      population: 38000000,
      currency: 'SAR',
      noOfSuggestions: 3,
    },
  ]);

  getDestinationsByType(type: string): Destination[] {
    if (type === 'approved') {
      return this.getApprovedDestinations();
    } else if (type === 'pending') {
      return this.getPendingDestinations();
    } else {
      return [];
    }
  }

  getApprovedDestinations(): Destination[] {
    // here we can handle the request later
    return this.approvedDestinations();
  }

  getPendingDestinations(): Destination[] {
    // here we can handle the request later
    return this.pendingDestinations();
  }

  handleApproveDestination(id: number): void {
    const destinationToApprove = this.pendingDestinations().find((dest) => dest.id === id);
    if (destinationToApprove) {
      this.pendingDestinations.update((destinations) =>
        destinations.filter((dest) => dest.id !== id),
      );
      this.approvedDestinations.update((destinations) => [...destinations, destinationToApprove]);
    }
  }

  handleRemoveDestination(id: number): void {
    const destinationToRemove = this.approvedDestinations().find((dest) => dest.id === id);
    if (destinationToRemove) {
      this.approvedDestinations.update((destinations) =>
        destinations.filter((dest) => dest.id !== id),
      );
    }
  }
}
