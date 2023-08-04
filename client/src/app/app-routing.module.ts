import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CityTestComponent } from './city-test/city-test.component'; // Replace 'path/to' with the actual path to your CityTestComponent
import { ShoesComponent } from './shoes/shoes.component'; // Importar el componente Shoes
import { ElectronicsComponent } from './electronics/electronics.component'; // Importar el componente Electronics
import { DashboardComponent } from './dashboard/dashboard.component'; // Importar el componente DashboardComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'shoes', component: ShoesComponent }, // Ruta para el componente Shoes
  { path: 'electronics', component: ElectronicsComponent }, // Ruta para el componente Electronics
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'city-test', component: CityTestComponent },
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el componente DashboardComponent // Add this line for CityTestComponent
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
