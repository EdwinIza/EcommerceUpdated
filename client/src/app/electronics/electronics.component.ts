import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { MetricsService } from '../services/metrics.service'; // Import the MetricsService

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {
  shoesProducts: Product[] = [];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  selectedLanguage: string;
  private transitionStartTime: number = 0; // Store the start time of the transition

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private cartService: CartService,
    private translate: TranslateService,
    private metricsService: MetricsService // Inject the MetricsService
  ) { }

  public screenWidth: any;
  public screenHeight: any;

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this._product.getProductsByCategory(2, 9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.shoesProducts = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);

    // Suscribe to the router events to capture the start time of the transition
    this._route.queryParams.subscribe(() => {
      this.transitionStartTime = new Date().getTime();
    });
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this._product.getProductsByCategory(2, 9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.shoesProducts = [...this.shoesProducts, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLanguage);
    console.log('Idioma cambiado a', this.selectedLanguage);
  }

  translateCategory(category: string): string {
    return this.translate.instant(category);
  }

  // Método para obtener el usuario actual con su id y el tiempo de inicio de transición
  getCurrentUserWithTransitionTime(): { user_id: string, transitionTime: string } {
    // Implement your logic to get the current user from AuthService (similar to HomeComponent)
    // Replace the dummy values 'user_id' and 'guest' with the actual user ID if available
    const user_id = 'user_id'; // Replace 'user_id' with the actual user ID
    const transitionTime = new Date().toISOString(); // Tiempo actual de la transición
    return { user_id, transitionTime };
  }

  // Método para registrar la métrica de transición de página
  registerPageTransitionMetrics(fromPage: string, toPage: string): void {
    // Obtiene el usuario actual y el tiempo de inicio de la transición utilizando AuthService
    const { user_id, transitionTime } = this.getCurrentUserWithTransitionTime();

    // Crea un objeto con los datos de la métrica de transición
    const transitionMetrics = {
      user_id: user_id,
      timestamp: transitionTime,
      session_id: 'session_id', // Aquí puedes agregar el valor correcto de session_id si lo tienes disponible
      from_page: 'Electronics',
      to_page: toPage,
      transition_time: new Date().getTime() - this.transitionStartTime, // Calculates the transition duration
    };

    // Llama al método del servicio MetricsService para guardar la métrica de transición
    this.metricsService.savePageTransitionMetrics(transitionMetrics).subscribe(
      (response) => {
        console.log('Métrica de transición de página electronicos guardada:', response);
      },
      (error) => {
        console.error('Error al guardar la métrica de transición de página:', error);
      }
    );
  }
}
