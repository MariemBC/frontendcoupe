import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { arbitres } from 'src/app/shared/models/arbitres';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArbitrageService } from '../shared/services/arbitrage.service';
import { MatchService } from '../shared/services/MatchService';
import { matchs } from '../shared/models/matchs';
import { arbitrage } from '../shared/models/arbitrage';
import { ArbitreService } from '../shared/services/arbitres.service';

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.css']
})
export class ArbitragesComponent implements OnInit {

 matchs:matchs[];

  arbitre: arbitres[];
  arbitrages:arbitrage[];
  form: FormGroup;
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  @ViewChild('closebutton') closebutton;
  displayedColumns: string[] = ['id', 'position','match','arbitre','modifier', 'supprimer'];
  dataSource: MatTableDataSource<arbitrage>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  domaine: any;
  constructor(private arbitrageservice:ArbitrageService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private matchservice : MatchService,
    private arbitresservice : ArbitreService
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
    this.getAllarbitres();
    this.form = this._formBuilder.group({
      position: ['', Validators.required],
      match: ['', Validators.required],
      arbitre: ['', Validators.required],

    });

    console.log(this.form);
  }
  getAll() {
    this.arbitrageservice.getAll()
      .subscribe((arbitrage) => {
        this.arbitrages = arbitrage.reverse();
        this.dataSource = new MatTableDataSource(this.arbitrages);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(arbitrage);
        return arbitrage;

      });
  }
  getAllmatchs(){
    this.matchservice.getAll()
      .subscribe((matchs) => this.matchs = matchs);
  }
  getAllarbitres(){
    this.arbitresservice.getAll()
      .subscribe((arbitre) => this.arbitre = arbitre);
  }
  deleteThisarbitrage(id) {
    console.log(id);
    this.arbitrageservice.deletearbitrage(id).subscribe({
      next: (res) => {
        this.getAll();
      },
    });

  }

  OnCreatearbitrages(): any {
    const position = this.form.get('position').value;
    const arbitre = this.form.get('arbitre').value;
    const match = this.form.get('match').value;


    const arbitrage = {
      position:position,
      arbitre:
      {
         id:arbitre
      },
      match:{
        id : match
      }
    };
    console.log(arbitrage);
    this.arbitrageservice.createarbitrage(arbitrage).subscribe(res =>{
      this.closebutton.nativeElement.click();
      alert("Arbitrage ajouté avec succès");
      this.getAll();
      this.form.reset();
      this.router.navigateByUrl[('/arbitrages')];
    })

  }

  Editarbitrage(id) {
    this.UpdateShowBtn();
    localStorage.setItem('id', id);
    this.arbitrageservice.getarbitrageById(id).subscribe((data: any) => {
      this.arbitrages = data;
      this.form.get('position').setValue(data.position);
      this.form.get('arbitre').setValue(data.arbitre);
      this.form.get('match').setValue(data.match);


    });

  }
  updatearbitrage() {
    const code = localStorage.getItem('id');
    const arbitres= {
      id: code,
      position: this.form.value.position,
      arbitre: {
          id:this.form.value.arbitre},
      match : {
        id : this.form.value.match
      }


    }
    console.log(arbitrage);
    this.arbitrageservice.updatearbitrage(arbitrage).subscribe(res =>{
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
