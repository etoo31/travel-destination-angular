import { Injectable, signal } from '@angular/core';
import { Destination } from '../models/destinations.type';

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

  getDestinations() {
    return this.destinations();
  }
}
