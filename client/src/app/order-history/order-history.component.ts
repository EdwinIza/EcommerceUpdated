import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  
  user: any;
  orders: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService
  ) {
    this.user = this._auth.getUser();
    console.log("USER ID:",this.user.id)
  }

  ngOnInit(): void {
    this._api.getTypeRequest(`orders/?userId=${this.user.id}`).subscribe(
      (res: any) => {
        console.log(res);
        res.data.forEach((item) => {
          this._product
            .getSingleProduct(item.product_id)
            .subscribe((product) => {
              console.log(product);
              this.orders.push({ ...product, ...item });
            });
        });
        // let uniqueProductsArray = Array.from(
        //   new Set(res.data.map((p) => p.product_id))
        // );
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
