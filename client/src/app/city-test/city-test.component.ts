import { Component, OnInit } from '@angular/core';
import { CityApiService } from '../services/city-api.service';

@Component({
  selector: 'app-city-test',
  templateUrl: './city-test.component.html',
  styleUrls: ['./city-test.component.scss']
})
export class CityTestComponent implements OnInit  {
  cities: any[] = [];
  countryCode = 'US'; // Puedes cambiar el código de país según tus necesidades

  constructor(private cityApiService: CityApiService) {}

  ngOnInit() {
    this.loadCitiesByCountry();
  }

  loadCitiesByCountry() {
    this.cityApiService.getCitiesByCountry(this.countryCode).subscribe(
      (data) => {
        // Aquí recibirás los datos de las ciudades en 'data'
        // Puedes hacer lo que necesites con los datos, como mostrarlos en la interfaz de usuario
        this.cities = data;
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
}
