import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from './../../node_modules/mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Mapa interactivo con MapBox';
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  // Inicializando las coordenadas de inicio (centro) del mapa
  latitud: number = -27.919358;
  longitud: number = -55.752063;
  // Link de acceso general para abrir el mapa en Google Maps
  baseRoute: string = 'https://maps.google.com/?q=';
  route: string;

  ngOnInit(){
    console.log("Inicializando mapa...");
    mapboxgl.accessToken = environment.acces_token;
    // Mapa layout
    this.map = new mapboxgl.Map({
      container: 'map-box',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud,this.latitud],
      zoom: 15
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    // Marcador arrastrable
    this.marker = new mapboxgl.Marker({draggable: true})
      .setLngLat([this.longitud,this.latitud])
      .addTo(this.map);
    this.marker.on('dragend', () => {
      let coordenadas = this.marker.getLngLat();
      this.latitud = coordenadas.lat;
      this.longitud = coordenadas.lng;
      console.log("LATITUD:", this.latitud);
      console.log("LONGITUD:", this.longitud);
      this.route = this.baseRoute + this.latitud + "," + this.longitud;
    });
  }

  openOnGoogleMaps(){
    console.log("AÚN EN PRODUCCIÓN");
  }
}
