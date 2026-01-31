import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nav } from '../../components/nav/nav';
import { DestinationService } from '../../services/destination-service';
import { UnApprovedDestinations } from '../../models/unApprovedDestination.type';
import { DestinationTable } from '../../components/destination-table/destination-table';
import { LoginService } from '../../services/login-service';

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
  }
  destinationService = inject(DestinationService);
  loginService = inject(LoginService);

  itemsPerPage = signal(5);
  currentPage = signal(1);

  unApprovedDestinations = computed(() => this.destinationService.unApprovedDestinations());

  selectedForApproval = signal<number[]>([]);

  paginatedDestinations = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.unApprovedDestinations().slice(start, end);
  });

  totalPages = computed(() =>
    Math.ceil(this.unApprovedDestinations().length / this.itemsPerPage()),
  );

  toggleSelectForApproval(destinationId: number): void {
    this.selectedForApproval.update((selected) => {
      if (selected.includes(destinationId)) {
        return selected.filter((id) => id !== destinationId);
      } else {
        return [...selected, destinationId];
      }
    });
  }

  isSelectedForApproval(destinationId: number): boolean {
    return this.selectedForApproval().includes(destinationId);
  }

  approveSelected(): void {
    // Call service to approve selected destinations
    this.selectedForApproval().forEach((id) => {
      this.destinationService.approveUnApprovedDestination(id);
    });
    this.selectedForApproval.set([]);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  trackByFn = (_: number, item: UnApprovedDestinations) => item.id;
}
