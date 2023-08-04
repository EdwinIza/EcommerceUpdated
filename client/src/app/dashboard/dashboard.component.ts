import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  helpAccessMetrics: any[] = [];
  pageAccessMetrics: any[] = [];
  errorMetrics: any[] = [];
  pageTransitionMetrics: any[] = [];
  transactionMetrics: any[] = [];

  constructor(private metricsService: MetricsService) { }

  ngOnInit() {
    this.getMetrics();
  }

  getMetrics() {
    this.metricsService.getHelpAccessMetrics().subscribe(data => {
      this.helpAccessMetrics = data;
    });

    this.metricsService.getPageAccessMetrics().subscribe(data => {
      this.pageAccessMetrics = data;
    });

    this.metricsService.getErrorMetrics().subscribe(data => {
      this.errorMetrics = data;
    });

    this.metricsService.getPageTransitionMetrics().subscribe(data => {
      this.pageTransitionMetrics = data;
    });

    this.metricsService.getTransactionMetrics().subscribe(data => {
      this.transactionMetrics = data;
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
