import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string = 'SdxtZ7vw9dKPwVyirgYQ2FZbZwnjE6RL';
  private _historial:string[] = [];

  public resultado:Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor( private http:HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultado  = JSON.parse(localStorage.getItem('resultado')!) || [];

 //   if( localStorage.getItem('historial') ){
 //     this._historial = JSON.parse( localStorage.getItem('historial')!);
 //}

  }

  buscarGifs( query:string ='' ) {

    query = query.trim().toLocaleLowerCase();

    // NO PERMITE QUE HAYA DUPLICADO EN EL HISTORIAL
    if( !this._historial.includes ( query ) ) {
      this._historial.unshift( query );

      // HACE QUE SOLO HAYAN 10 HISTORIAL DE BÚSQUEDA
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=SdxtZ7vw9dKPwVyirgYQ2FZbZwnjE6RL&q=${ query }&limit=10`)
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify( this.resultado ));
    });



  }

}
