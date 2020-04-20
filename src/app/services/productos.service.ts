import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoIntf } from '../interfaces/info-productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoIntf[] = [];
  
  constructor(private http: HttpClient) {
    this.cargarProdcutos();
   }


  private cargarProdcutos(){
    this.http.get('https://angular-html-bd8f7.firebaseio.com/productos_idx.json')
    .subscribe((resp: ProductoIntf[]) => {
      console.log(resp);
      this.productos = resp;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);

    });
  }
}
