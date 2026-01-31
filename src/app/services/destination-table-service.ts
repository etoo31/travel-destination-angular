import { inject, Injectable, signal } from '@angular/core';
import { Destination } from '../models/destinations.type';
import { LoginService } from './login-service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UnApprovedDestinations } from '../models/unApprovedDestination.type';

@Injectable({
  providedIn: 'root',
})
export class DestinationTableService {
  loginService = inject(LoginService);
  http = inject(HttpClient);

  approvedDestinations = signal<Destination[]>([]);

  pendingDestinations = signal<Destination[]>([]);

  unApprovedDestinations = signal<UnApprovedDestinations[]>([]);

  getDestinationsByType(type: string): Destination[] {
    if (type === 'approved') {
      return this.approvedDestinations();
    } else if (type === 'pending') {
      return this.pendingDestinations();
    } else {
      return [];
    }
  }

  async getApprovedDestinations() {
    try {
      const user = this.loginService.getCurrentUser();
      const apiUrl = 'http://localhost:8080/users/approved-destinations';

      const response: HttpResponse<any> = await firstValueFrom(
        this.http.get<any>(apiUrl, {
          headers: new HttpHeaders({
            authorization: user?.token || '',
            userId: user?.userId || 0,
          }),
          observe: 'response',
        }),
      );

      console.log(response.body);

      this.approvedDestinations.set(this.parseApprovedDestinationsResponse(response.body));
    } catch (error) {
      console.log('Failed to fetch approved destinations');
    }
  }

  parseApprovedDestinationsResponse(response: { destinations: any[] }): Destination[] {
    if (!response || !response.destinations) {
      return [];
    }

    const mappedDestinations: Destination[] = response.destinations.map((d: any) => {
      const destination = new Destination();
      destination.country = d.country;
      destination.capital = d.capital;
      destination.region = d.region;
      destination.population = d.population;
      destination.currency = d.currency;
      destination.flagUrl = d.flag ?? '';
      return destination;
    });

    return mappedDestinations;
  }

  async getPendingDestinations() {
    try {
      const user = this.loginService.getCurrentUser();
      const apiUrl = 'http://localhost:8080/admin/pending-destinations';

      const response: HttpResponse<any> = await firstValueFrom(
        this.http.get<any>(apiUrl, {
          headers: new HttpHeaders({
            authorization: user?.token || '',
            userId: user?.userId || 0,
          }),
          observe: 'response',
        }),
      );

      console.log(response.body);

      this.pendingDestinations.set(this.parsePendingDestinationsResponse(response.body));
    } catch (error) {
      console.log('Failed to fetch pending destinations');
    }
  }

  parsePendingDestinationsResponse(response: any[]): Destination[] {
    if (!response) {
      return [];
    }

    const mappedDestinations: Destination[] = response.map((d: any) => {
      const destination = new Destination();
      destination.country = d.country;
      destination.capital = d.capital;
      destination.region = d.region;
      destination.population = d.population;
      destination.currency = d.currency;
      destination.flagUrl = d.flagUrl ?? '';
      destination.noOfSuggestions = d.noOfSuggestions;
      return destination;
    });

    return mappedDestinations;
  }

  async getUnApprovedDestinations() {
    const user = this.loginService.getCurrentUser();
    const apiUrl = 'http://localhost:8080/users/unapproved-destinations';

    try {
      const response: HttpResponse<any> = await firstValueFrom(
        this.http.get<any>(apiUrl, {
          headers: new HttpHeaders({
            authorization: user?.token || '',
            userId: user?.userId || 0,
          }),
          observe: 'response',
        }),
      );
      console.log(response);
      this.unApprovedDestinations.set(this.parseUnApprovedDestinationsResponse(response.body));
      return this.unApprovedDestinations();
    } catch (error) {
      console.log('fetch failed');
    }
    return this.unApprovedDestinations();
  }

  parseUnApprovedDestinationsResponse(body: any[]): UnApprovedDestinations[] {
    if (!body || body.length == 0) {
      return [];
    }

    const mappedDestinations: UnApprovedDestinations[] = body.map((d: any) => {
      const destination = new UnApprovedDestinations();
      destination.country = d.country;
      destination.capital = d.capital;
      destination.region = d.region;
      destination.population = d.population;
      destination.currency = d.currency;
      destination.flagUrl = d.flagUrl ?? '';
      destination.isFav = d.isFav;
      destination.wasFav = d.wasFav;

      return destination;
    });

    return mappedDestinations;
  }

  async approveSelectedDestinations(destinations: Destination[]) {
    const user = this.loginService.getCurrentUser();
    const apiUrl = 'http://localhost:8080/admin/approve-multiple-destinations';

    try {
      const response: HttpResponse<any> = await firstValueFrom(
        this.http.post<any>(apiUrl, destinations, {
          headers: new HttpHeaders({
            authorization: user?.token || '',
            userId: user?.userId || 0,
          }),
          observe: 'response',
        }),
      );
      console.log(response);
      //remove them from unApprovedDestination
      this.removeFromUnApprovedDestinationList(destinations);

      //remove them from pending destinations
      this.removeFromPendingDestinationList(destinations);

      //add them to approved destination
      this.addToApprovedDestinationList(destinations);
    } catch (error) {
      console.log('approve failed');
    }
  }

  approveUnApprovedDestination(destinationId: number): void {
    const unApproved = this.unApprovedDestinations().find((d) => d.id === destinationId);
    if (unApproved) {
      // Add to approved destinations
      this.approvedDestinations.update((destinations) => [...destinations, unApproved as any]);
      // Remove from unapproved
      this.unApprovedDestinations.update((destinations) =>
        destinations.filter((d) => d.id !== destinationId),
      );
    }
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

  removeFromUnApprovedDestinationList(destinations: Destination[]) {
    this.unApprovedDestinations.update((prev) => {
      const countriesToRemove = new Set(destinations.map((d) => d.country));

      return prev.filter((d) => !countriesToRemove.has(d.country));
    });
  }

  removeFromPendingDestinationList(destinations: Destination[]) {
    this.pendingDestinations.update((prev) => {
      const countriesToRemove = new Set(destinations.map((d) => d.country));

      return prev.filter((d) => !countriesToRemove.has(d.country));
    });
  }

  addToApprovedDestinationList(destinations: Destination[]) {
    this.approvedDestinations.update((prev) => {
      const existingCountries = new Set(prev.map((d) => d.country));

      const newOnes = destinations.filter((d) => !existingCountries.has(d.country));

      return [...prev, ...newOnes];
    });
  }
}
