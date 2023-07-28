import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TranslateService } from '../services/translate.service';

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

  constructor(private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService,
    private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        // returns string so convert it to number
        const categoryId = 1;
        this._product.getProductsByCategory(categoryId).subscribe(
          (data)=>{
            this.shoesProducts = data.products;
            console.log(this.shoesProducts);
        });
      });
  }
}
