import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { arbitres } from 'src/app/shared/models/arbitres';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArbitreService } from '../shared/services/arbitres.service';
import { MatchService } from '../shared/services/MatchService';
import { matchs } from '../shared/models/matchs';

@Component({
  selector: 'app-arbitres',
  templateUrl: './arbitres.component.html',
  styleUrls: ['./arbitres.css']
})
export class ArbitresComponent implements OnInit {

 match:matchs[];

  arbitres: arbitres[];
  form: FormGroup;
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  @ViewChild('closebutton') closebutton;
  displayedColumns: string[] = ['id', 'lastmatch','nom','position','match','modifier', 'supprimer'];
  dataSource: MatTableDataSource<arbitres>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  domaine: any;
  constructor(private arbitreservice:ArbitreService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private matchservice : MatchService

) {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getAll();
    this.getAllmatchs();
    this.form = this._formBuilder.group({
      lastmatch: ['', Validators.required],
      nom: ['', Validators.required],
      position: ['', Validators.required],
      match: ['', Validators.required],


    });

    console.log(this.form);
  }
  getAll() {
    this.arbitreservice.getAll()
      .subscribe((arbitres) => {
        this.arbitres = arbitres.reverse();
        this.dataSource = new MatTableDataSource(this.arbitres);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(arbitres);
        return arbitres;

      });
  }
  getAllmatchs(){
    this.matchservice.getAll()
      .subscribe((match) => this.match = match);
  }
  deleteThisarbitre(id) {
    console.log(id);
    this.arbitreservice.deletearbitres(id).subscribe({
      next: (res) => {
        this.getAll();
      },
    });

  }

  OnCreatearbitres(): any {
    const lastmatch = this.form.get('lastmatch').value;
    const position = this.form.get('position').value;
    const nom = this.form.get('nom').value;
    const match = this.form.get('match').value;


    const arbitres = {
      lastmatch: lastmatch,
      position:position,
      nom:nom,
      match:{
        id : match
      }
    };
    console.log(arbitres);
    this.arbitreservice.createarbitres(arbitres).subscribe(res =>{
      this.closebutton.nativeElement.click();
      alert("Arbitre ajouté avec succès");
      this.getAll();
      this.form.reset();
      this.router.navigateByUrl[('/arbitres')];
    })

  }

  Editarbitres(id) {
    this.UpdateShowBtn();
    localStorage.setItem('id', id);
    this.arbitreservice.getarbitreById(id).subscribe((data: any) => {
      this.arbitres = data;
      this.form.get('lastmatch').setValue(data.lastmatch);
      this.form.get('position').setValue(data.position);
      this.form.get('nom').setValue(data.nom);
      this.form.get('match').setValue(data.match);


    });

  }
  updatearbitres() {
    const code = localStorage.getItem('id');
    const arbitres= {
      id: code,
      lastmatch: this.form.value.lastmatch,
      position: this.form.value.position,
      nom: this.form.value.nom,
      match : {
        id : this.form.value.match
      }


    }
    console.log(arbitres);
    this.arbitreservice.updatearbitres(arbitres).subscribe(res =>{
      console.log(res);
      this.closebutton.nativeElement.click();
      this.SaveShowBtn();
      this.getAll();
      
    })

  }
  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }

}
