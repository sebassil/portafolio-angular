import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { infoEquipo } from '../interfaces/info-equipo.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  infoe: infoEquipo  = {};
  cargada2 = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) =>{
        this.cargada = true;
        this.info = resp;
        // console.log(resp);
    });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-bd8f7.firebaseio.com/equipo.json')
      .subscribe( (resp: infoEquipo) =>{
        setTimeout(() => {
          this.cargada2 = true;
        }, 1000);
        
        this.infoe = resp;
      });
  }
}
