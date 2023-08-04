import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { MetricsService } from '../services/metrics.service'; // Import the MetricsService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = [
    {
      key: 'fullName',
      label: '',
      value: '',
      type: 'text',
    },
    {
      key: 'email',
      label: '',
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: '',
      value: '',
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: '',
      value: '',
      type: 'password',
    },
  ];
  userId = null;
  alertMessage = '';
  alertType = '';
  alertVisible = false;
  loading = false;
  private transitionStartTime: number = 0; // Add a private property to store the start time of the page transition

  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router,
    private translate: TranslateService,
    private metricsService: MetricsService // Inject the MetricsService
  ) {}

  // Update user fields with current details
  ngOnInit(): void {
    const { user_id, fname, email } = this._token.getUser();
    this.userId = user_id;
    this.user[0].value = fname;
    this.user[1].value = email;

    // Load initial translations
    this.translate.get('user_profile').subscribe((translations: any) => {
      this.user[0].label = translations.full_name;
      this.user[1].label = translations.email_address;
      this.user[2].label = translations.password;
      this.user[3].label = translations.confirm_password;
    });

    // Subscribe to the language change event
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('user_profile').subscribe((translations: any) => {
        this.user[0].label = translations.full_name;
        this.user[1].label = translations.email_address;
        this.user[2].label = translations.password;
        this.user[3].label = translations.confirm_password;
      });
    });

    // Subscribe to the router events to capture the start time of the page transition
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.transitionStartTime = new Date().getTime();
      }
    });
  }

  canUpdate(): boolean {
    return this.user.filter((field) => field.value.length > 0).length !== 4;
  }

  // Submit data to be updated
  onSubmit(): void {
    this.alertVisible = false;
    if (this.user[2].value !== this.user[3].value) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.alertVisible = true;
    } else {
      this.loading = true;
      this._api
        .putTypeRequest(`users/${this.userId}`, {
          fullName: this.user[0].value,
          email: this.user[1].value,
          password: this.user[2].value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.alertMessage = res.message;
            this.alertType = 'success';
            this.alertVisible = true;
            this.loading = false;
            const oldDetails = this._token.getUser();
            this._token.setUser({
              ...oldDetails,
              fname: this.user[0].value,
              email: this.user[1].value,
            });
            this.user[2].value = '';
            this.user[3].value = '';
            // window.location.reload();
          },
          (err: any) => {
            console.log(err);
            this.alertMessage = err.error.message;
            this.alertVisible = true;
            this.alertType = 'error';
            this.loading = false;
          }
        );

      // Get the current page URL for page transition metrics
      const fromPage = this._router.url;

      // Call the method to register the page transition metrics
      this.registerPageTransitionMetrics(fromPage, 'profile');
    }
  }

  // Método para obtener el usuario actual con su id y el tiempo de inicio de transición
  getCurrentUserWithTransitionTime(): { user_id: string; transitionTime: string } {
    const user = this._token.getUser();
    const user_id = user ? user.user_id : 'guest'; // If the user is authenticated, get the user_id; otherwise, consider as a guest
    const transitionTime = new Date().toISOString(); // Current transition time
    return { user_id: user.user_id, transitionTime };
  }

  // Método para registrar la métrica de transición de página
  registerPageTransitionMetrics(fromPage: string, toPage: string): void {
    // Get the current user and transition start time using getCurrentUserWithTransitionTime()
    const { user_id, transitionTime } = this.getCurrentUserWithTransitionTime();

    // Create an object with the transition metrics data
    const transitionMetrics = {
      user_id: user_id,
      timestamp: transitionTime,
      session_id: 'session_id', // Here, you can add the correct value for session_id if available
      from_page: fromPage,
      to_page: toPage,
      transition_time: new Date().getTime() - this.transitionStartTime, // Calculates the transition duration
    };

    // Call the MetricsService method to save the page transition metrics
    this.metricsService.savePageTransitionMetrics(transitionMetrics).subscribe(
      (response) => {
        console.log('Page transition metrics profile saved:', response);
      },
      (error) => {
        console.error('Error saving page transition metrics:', error);
      }
    );
  }
}
