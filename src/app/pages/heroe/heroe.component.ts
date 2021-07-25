import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroeService:HeroesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.heroeService.getHeroe(id + '').subscribe( (resp:any) => {
        this.heroe = resp;
        this.heroe.id = id + '';
      })
    }
  }

  guardar(form:NgForm){
    if(form.invalid) return;
    console.log(form);
    console.log(this.heroe);
    Swal.fire({
      title:'Espere',
      text:'Guardando informacion',
      allowOutsideClick:false,
      icon:'info'
    })
    Swal.showLoading();

    let request:Observable<any>;

    if(this.heroe.id){
      request = this.heroeService.updateHero(this.heroe);
    }else{
      request = this.heroeService.newHero(this.heroe);
    }

    request.subscribe(resp => {
      Swal.fire({
        title:this.heroe.nombre,
        text:'Se actualizo correctamente',
        icon:'success'
      })
    })
  }
}
