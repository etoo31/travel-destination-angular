import { inject, Injectable, signal } from '@angular/core';
import { Destination } from '../models/destinations.type';
import { UnApprovedDestinations } from '../models/unApprovedDestination.type';
import { LoginService } from './login-service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  loginService = inject(LoginService);
  http = inject(HttpClient);

  destinations = signal<Destination[]>([]);

  unApprovedDestinations = signal<UnApprovedDestinations[]>([]);

  toggleUnApprovedDestinationFav(destinationCountry: string): void {
    this.unApprovedDestinations.update((destinations) =>
      destinations.map((destination) =>
        destination.country === destinationCountry
          ? { ...destination, isFav: !destination.isFav }
          : destination,
      ),
    );
  }

  async getApprovedDestinations() {
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

    this.destinations.set(this.parseApprovedDestinationsResponse(response.body));

    console.log(response.body);
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

  async addToFavoriteDestination(destinations: UnApprovedDestinations[]) {
    const user = this.loginService.getCurrentUser();
    const apiUrl = 'http://localhost:8080/users/manage-favorite-destinations';

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
    } catch (error) {
      console.log('fetch failed');
    }
  }
}
