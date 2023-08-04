import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importa el Router y NavigationEnd
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';
import { MetricsService } from '../services/metrics.service';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  text: string;
  products: Product[] = [];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  selectedLanguage: string;
  private transitionStartTime: number = 0;

  constructor(
    private router: Router, // Inyecta el Router
    private productService: ProductService,
    private cartService: CartService,
    private translate: TranslateService,
    private metricsService: MetricsService,
    private authService: AuthService 
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);

    // Suscribirse al evento de cambio de ruta para registrar la métrica de transición
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const toPage = event.url; // Obtener la página actual (ruta)
        const fromPage = 'N/A'; // No hay una página anterior en este caso
        // Calcula la duración de la transición
        const transitionTimer = new Date().getTime() - this.transitionStartTime;
        console.log(transitionTimer)

        this.registerPageTransitionMetrics(fromPage, toPage); // Registra la métrica de transición de página
      }
    });
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
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
    const user = this.authService.getUser();
    const user_id = user ? user.id : 'guest'; // Si el usuario está autenticado, obtenemos su id; de lo contrario, lo consideramos como invitado
    const transitionTime = new Date().toISOString(); // Tiempo actual de la transición
    return { user_id, transitionTime };
  }

  // Método para registrar la métrica de transición de página
  registerPageTransitionMetrics(fromPage: string, toPage: string): void {
    // Obtiene el usuario actual y el tiempo de inicio de la transición utilizando AuthService
    const { user_id, transitionTime } = this.getCurrentUserWithTransitionTime();
    const transitionTimer = new Date().getTime() - this.transitionStartTime;
    // Crea un objeto con los datos de la métrica de transición
    console.log(transitionTime)
    const transitionMetrics = {
      user_id: user_id,
      timestamp: transitionTime,
      session_id: 'session_id', // Aquí puedes agregar el valor correcto de session_id si lo tienes disponible
      from_page: 'home',
      to_page: toPage,
      transition_time: transitionTimer, // Aquí puedes agregar la duración de la transición si lo deseas
    };

    // Llama al método del servicio MetricsService para guardar la métrica de transición
    this.metricsService.savePageTransitionMetrics(transitionMetrics).subscribe(
      (response) => {
        console.log('Métrica de transición de página guardada:', response);
      },
      (error) => {
        console.error('Error al guardar la métrica de transición de página:', error);
      }
    );
  }

}
