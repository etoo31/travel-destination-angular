import { Component, computed, inject, OnInit } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { DestinationCard } from '../../components/user-dashboard-components/destination-card/destination-card';
import { NoResult } from '../../components/user-dashboard-components/no-result/no-result';
import { DestinationService } from '../../services/destination-service';
import { SearchDestination } from '../../components/user-dashboard-components/search-destination/search-destination';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-user-dashboard-page',
  imports: [Nav, DestinationCard, NoResult, SearchDestination],
  templateUrl: './user-dashboard-page.html',
  styleUrl: './user-dashboard-page.css',
})
export class UserDashboardPage implements OnInit {
  destinationService = inject(DestinationService);
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.checkLogin();
    this.loginService.isUser();
    this.destinationService.getApprovedDestinations();
  }

  destinations = computed(() => this.destinationService.destinations());
}
