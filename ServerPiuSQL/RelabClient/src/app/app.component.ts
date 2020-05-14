import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ci_vettore } from './models/ci_vett.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-maps';
  // google maps zoom level
  zoom: number = 12;
  geoJsonObject: GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  obsGeoData: Observable<GeoFeatureCollection>;
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;
  obsCiVett : Observable<Ci_vettore[]>

  constructor(public http: HttpClient) {
  //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)
  }

  //Metodo che scarica i dati nella variabile geoJsonObject
  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log( this.geoJsonObject );
  }

  //Una volta che la pagina web è caricata, viene lanciato il metodo ngOnInit scarico i    dati
  //dal server
  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-e9ca05e6-0801-4b53-8764-095f3842f6ee.ws-eu01.gitpod.io/");
    this.obsGeoData.subscribe(this.prepareData);
    this.obsCiVett = this.http.get<Ci_vettore[]>("https://3000-e9ca05e6-0801-4b53-8764-095f3842f6ee.ws-eu01.gitpod.io/ci_vettore/90");
    this.obsCiVett.subscribe(this.prepareCiVettData);
  }

  styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }

   prepareCiVettData = (data: Ci_vettore[]) =>
  {
    console.log(data); //Verifica di ricevere i vettori energetici
    this.markers = [];
    for (const iterator of data) { //Per ogni oggetto del vettore creoa un Marker
      let m = new Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      this.markers.push(m);
    }
  }

}
