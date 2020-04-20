import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoIntf } from '../interfaces/info-productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoIntf[] = [];
  productosF: ProductoIntf[] = [];
  
  constructor(private http: HttpClient) {
    this.cargarProdcutos();
   }


  private cargarProdcutos(){

    return new Promise((resolve,reject) => {
      this.http.get('https://angular-html-bd8f7.firebaseio.com/productos_idx.json')
      .subscribe((resp: ProductoIntf[]) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
        resolve();
      });
    });
  }

  public getProducto(id: string){
    return this.http.get(`https://angular-html-bd8f7.firebaseio.com/productos/${ id }.json`)
  }

  public buscarProducto(termino: string){
    if(this.productos.length === 0){
      this.cargarProdcutos().then( () => {
        this.filtrarProductos( termino );
      });
    }else{
      this.filtrarProductos( termino );
    }

  }

  public filtrarProductos(termino: string){
    this.productosF = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosF.push(prod);
      }
    });
  }

}
