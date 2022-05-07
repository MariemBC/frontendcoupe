import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { matchs } from 'src/app/shared/models/matchs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../shared/services/MatchService';

@Component({
  selector: 'app-matchs',
  templateUrl: './match.component.html',
  styleUrls: ['./match.css']
})
export class MatchsComponent implements OnInit {

  
  Matchs: matchs[];
  form: FormGroup;
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  @ViewChild('closebutton') closebutton;
  displayedColumns: string[] = ['id', 'nomequipe1','nomequipe2','date', 'modifier', 'supprimer'];
  dataSource: MatTableDataSource<matchs>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matchs: any;
  constructor(private matchservice: MatchService,
    private _formBuilder: FormBuilder,
    private router: Router,
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
    this.form = this._formBuilder.group({
      nomequipe1: ['', Validators.required],
      nomequipe2: ['', Validators.required],
      date: ['', Validators.required],



    });

    console.log(this.form);
  }
  getAll() {
    this.matchservice.getAll()
      .subscribe((matchs) => {
        this.Matchs = matchs.reverse();
        this.dataSource = new MatTableDataSource(this.Matchs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(matchs);
        return matchs;

      });
  }
  deleteThismatch(id) {
    console.log(id);
    this.matchservice.deletematchs(id).subscribe({
      next: (res) => {
        this.getAll();
      },
    });

  }

  OnCreatematch(): any {
    const nomequipe1 = this.form.get('nomequipe1').value;
    const nomequipe2 = this.form.get('nomequipe2').value;
    const Date = this.form.get('date').value;

    const matchs = {
      nomequipe1: nomequipe1,
      nomequipe2:nomequipe2,
      Date:Date
    };
    console.log(matchs);
    this.matchservice.creatematchs(matchs).subscribe(res =>{
      this.closebutton.nativeElement.click();
      alert("Match ajouté avec succès");
      this.getAll();
      this.form.reset();
      this.router.navigateByUrl[('/matchs')];
    })

  }

  Editmatchs(id) {
    this.UpdateShowBtn();
    localStorage.setItem('id', id);
    this.matchservice.getmatchsById(id).subscribe((data: any) => {
      this.Matchs = data;
      this.form.get('nomequipe1').setValue(data.nomequipe1);
      this.form.get('nomequipe2').setValue(data.nomequipe2);
      this.form.get('date').setValue(data.date);


    });

  }
  updatematch() {
    const code = localStorage.getItem('id');
    const match = {
      id: code,
      nomquipe1: this.form.value.nomequipe1,
      nomquipe2: this.form.value.nomequipe2,
      date: this.form.value.date,


    }
    console.log(matchs);
    this.matchservice.updatematchs(matchs).subscribe(res =>{
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
