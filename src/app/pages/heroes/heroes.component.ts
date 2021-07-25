import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroesService:HeroesService) { }
  heroes:HeroeModel[] = [];
  cargando:boolean = false;

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
    })
  }
  
  borrarHeroe(heroe:HeroeModel,i:number){
    Swal.fire({
      title:'Esta de acuerdo?',
      text:'Estas seguro de elimar el registro de' + heroe.nombre + '?',
      icon: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.heroes.splice(i,1);
        this.heroesService.deleteHeroe(heroe.id + '').subscribe();
      }
    })
  }
  get hayRegistroHeroes(){
    return this.heroes.length > 0
  }
}
