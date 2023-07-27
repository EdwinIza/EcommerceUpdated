import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  isLoggedIn = false;
  dropdownVisible = false;
  cartData: any;
  selectedLanguage: string;


  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768) this.isMobile = false;
    else this.isMobile = true;
  }

  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _cart: CartService,
    private translate: TranslateService
  ) {
    this.getScreenSize();
    this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {
    if (this._token.getUser()) this.isLoggedIn = true;
    else this.isLoggedIn = false;
    this.selectedLanguage = 'default'; // Establecer valor predeterminado
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Agregar la función HostListener para detectar Alt+J
  @HostListener('window:keydown.alt.j', ['$event'])
  onAltJPress(event: KeyboardEvent): void {
    this.toggleMenu(); // Llamar al método para abrir o cerrar el menú
  }

  removeProductFromCart(id: number) {
    this._cart.removeProduct(id);
  }

  logout() {
    this._auth.logout();
    this.isMenuOpen = false;
  }


  changeLanguage(): void {
    this.translate.use(this.selectedLanguage);
    console.log('Idioma cambiado a', this.selectedLanguage);
  }

  translateCategory(category: string): string {
    return this.translate.instant(category);
  }
}
