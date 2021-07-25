import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = "https://fb-api-cbcc4.firebaseio.com";
  constructor(private http:HttpClient) { }

  newHero(hero:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,hero).
    pipe(
      map((resp:any)=>{
        hero.id = resp.name;
        return hero;
      })
    );
  }
  updateHero(hero:HeroeModel){
    const heroTemp = {...hero};
    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${hero.id}.json`,heroTemp)
  }
  deleteHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }
  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe( map(this.crearArreglo) );
  }
  private crearArreglo(heroesObj:any){
    const heroes:HeroeModel[] = [];
    if(heroesObj === null) return [];
    Object.keys(heroesObj).forEach( (key) =>{
      const heroe: HeroeModel = heroesObj[key]
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
