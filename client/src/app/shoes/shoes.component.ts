import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent implements OnInit {
  shoesProducts: Product[] = [];
  loading = false;
  id: number;
  product: any;
  quantity: number;
  showcaseImages: any[] = [];
  productPageCounter = 1;
  additionalLoading = false;
  selectedLanguage: string;

  constructor(private _route: ActivatedRoute,
    private _product: ProductService,
    private cartService: CartService,
    private translate: TranslateService) { }

    public screenWidth: any;
    public screenHeight: any;

    ngOnInit(): void {
      this.loading = true;
      setTimeout(() => {
        this. _product.getProductsByCategory(1,9, this.productPageCounter).subscribe(
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
    }

    showMoreProducts(): void {
      this.additionalLoading = true;
      this.productPageCounter = this.productPageCounter + 1;
      setTimeout(() => {
        this._product.getProductsByCategory(1,9, this.productPageCounter).subscribe(
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
}
