import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nav } from '../../components/nav/nav';
import { UnApprovedDestinations } from '../../models/unApprovedDestination.type';
import { DestinationTable } from '../../components/destination-table/destination-table';
import { LoginService } from '../../services/login-service';
import { DestinationTableService } from '../../services/destination-table-service';
import { Destination } from '../../models/destinations.type';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, Nav, DestinationTable],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.css',
})
export class AdminDashboardPage implements OnInit {
  ngOnInit(): void {
    this.loginService.checkLogin();
    this.loginService.isAdmin();
    this.destinationTableService.getUnApprovedDestinations();
  }
  destinationTableService = inject(DestinationTableService);
  loginService = inject(LoginService);

  itemsPerPage = signal(5);
  currentPage = signal(1);

  unApprovedDestinations = computed(() => this.destinationTableService.unApprovedDestinations());

  selectedForApproval = signal<Destination[]>([]);

  paginatedDestinations = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.unApprovedDestinations().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.unApprovedDestinations().length / this.itemsPerPage()),
  );

  toggleSelectForApproval(destination: Destination): void {
    this.selectedForApproval.update((selected) => {
      if (selected.includes(destination)) {
        return selected.filter((d) => d !== destination);
      } else {
        return [...selected, destination];
      }
    });
    console.log(this.selectedForApproval());
  }

  isSelectedForApproval(destination: Destination): boolean {
    return this.selectedForApproval().includes(destination);
  }

  approveSelected(): void {
    // Call service to approve selected destinations
    this.destinationTableService.approveSelectedDestinations(this.selectedForApproval());
    this.selectedForApproval.set([]);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  trackByFn = (_: number, item: UnApprovedDestinations) => item.country;
}
