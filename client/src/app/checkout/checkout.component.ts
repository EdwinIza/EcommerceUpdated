import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { CountryApiService } from '../services/country-api.service';
import { CityApiService } from '../services/city-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId;

  billingAddress = [
    {
      name: 'Full name',
      placeholder: 'Enter your full name',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'Email',
      placeholder: 'Enter your email address',
      type: 'email',
      value: '',
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    {
      name: 'Country',
      placeholder: 'Enter your country',
      type: 'text',
      value: '',
      required: true,
      options: [], // Opciones de países se cargarán dinámicamente
    },
    {
      name: 'Address',
      placeholder: 'Enter your address',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'City',
      placeholder: 'Enter your city',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'ZIP',
      placeholder: 'Enter your zip code',
      type: 'text',
      value: '',
      required: true,
      pattern: /^[0-9]{6}$/,
    },
    {
      name: 'Telephone',
      placeholder: 'Enter your telephone number',
      type: 'text',
      value: '',
      required: true,
    },
  ];

  constructor(private _auth: AuthService, private _cart: CartService, private translate: TranslateService, private countryApiService: CountryApiService,
    private cityApiService: CityApiService) {
    this.billingAddress = [
      {
        name: 'Full name',
        placeholder: 'Enter your full name',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'Email',
        placeholder: 'Enter your email address',
        type: 'email',
        value: '',
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
      {
        name: 'Country',
        placeholder: 'Enter your country',
        type: 'text',
        value: '',
        required: true,
        options: [], // Opciones de países se cargarán dinámicamente
      },
      {
        name: 'Address',
        placeholder: 'Enter your address',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'City',
        placeholder: 'Enter your city',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'ZIP',
        placeholder: 'Enter your zip code',
        type: 'text',
        value: '',
        required: true,
        pattern: /^[0-9]{6}$/,
      },
      {
        name: 'Telephone',
        placeholder: 'Enter your telephone number',
        type: 'text',
        value: '',
        required: true,
      },
    ];

    this._auth.user.subscribe((user) => {
      console.log(user); // Verificar el contenido del objeto user
      if (user) {
        this.currentUser = user;
        this.billingAddress[0].value = user.fname;
        this.billingAddress[1].value = user.email;
      }
    });

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {
    // Cargar las traducciones para billingAddress
    this.translate.get('billing_address_ch').subscribe((translations: any) => {
      this.billingAddress[0].name = translations['Full name'];
      this.billingAddress[0].placeholder = translations['Enter your full name'];
      this.billingAddress[1].name = translations['Email'];
      this.billingAddress[1].placeholder = translations['Enter your email address'];
      this.billingAddress[2].name = translations['Country'];
      this.billingAddress[2].placeholder = translations['Enter your country'];
      this.billingAddress[3].name = translations['Address'];
      this.billingAddress[3].placeholder = translations['Enter your address'];
      this.billingAddress[4].name = translations['City'];
      this.billingAddress[4].placeholder = translations['Enter your city'];
      this.billingAddress[5].name = translations['ZIP'];
      this.billingAddress[5].placeholder = translations['Enter your zip code'];
      this.billingAddress[6].name = translations['Telephone'];
      this.billingAddress[6].placeholder = translations['Enter your telephone number'];
    });

    // Suscribirse al evento de cambio de idioma
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('billing_address_ch').subscribe((translations: any) => {
        this.billingAddress[0].name = translations['Full name'];
        this.billingAddress[0].placeholder = translations['Enter your full name'];
        this.billingAddress[1].name = translations['Email'];
        this.billingAddress[1].placeholder = translations['Enter your email address'];
        this.billingAddress[2].name = translations['Country'];
        this.billingAddress[2].placeholder = translations['Enter your country'];
        this.billingAddress[3].name = translations['Address'];
        this.billingAddress[3].placeholder = translations['Enter your address'];
        this.billingAddress[4].name = translations['City'];
        this.billingAddress[4].placeholder = translations['Enter your city'];
        this.billingAddress[5].name = translations['ZIP'];
        this.billingAddress[5].placeholder = translations['Enter your zip code'];
        this.billingAddress[6].name = translations['Telephone'];
        this.billingAddress[6].placeholder = translations['Enter your telephone number'];
      });
    });
  }

  submitCheckout() {
    this.loading = true;
    console.log(this.currentUser.id)
    setTimeout(() => {
      this._cart
        .submitCheckout(this.currentUser.id, this.cartData)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.orderId = res.orderId;
            this.products = res.products;
            this.currentStep = 4;
            this._cart.clearCart();
          },
          (err) => {
            console.log(err);
            console.log(this.currentUser.user.id)
            this.loading = false;
          }
        );
    }, 750);
  }

  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(): void {
    this.nextStep();
  }

  canBillingSubmit(): boolean {
    return this.billingAddress?.filter((field) => {
      return field.value.length === 0 || (field.pattern && !field.pattern.test(field.value));
    }).length > 0;
  }
  
  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }

}