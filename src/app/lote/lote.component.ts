import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';

import { Acordo } from '../model/Acordo';


const SCHEMA = {
  'NOME_POUPADOR': 'text',
  'CPF_POUPADOR': 'text',
  'DT_NASC_POUPADOR': 'text',
  'ENDERECO': 'text',
  'NUMERO': 'text',
  'COMPLEMENTO': 'text',
  'MUNICIPIO': 'text',
  'BAIRRO': 'text',
  'UF': 'text'
};

const COLUMNS = [
  'NOME_POUPADOR',
  'CPF_POUPADOR',
  'DT_NASC_POUPADOR',
  'ENDERECO',
  'NUMERO',
  'COMPLEMENTO',
  'MUNICIPIO',
  'BAIRRO',
  'UF',
  '$$edit'
];



const ELEMENT_DATA: Acordo[] = [];


type AOA = any[][];


@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private ngxCsvParser: NgxCsvParser
   ) { }

  formulario: FormGroup;
  titulo: string;

  displayedColumns: string[] = COLUMNS;
  dataSchema = SCHEMA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  data!: AOA;
  

  // --> begin Editable table
  editField: string;

   ngOnInit() {
     this.formulario = this.formBuilder.group({
       busca: [null, Validators.required],
     });
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  confirmEdit(event: any){
    console.log('XXXXXX confirmEdit event', event);
    this.dataSource._updateChangeSubscription();
  }

  cancelEdit(){
    console.log('XXXXXX cancelEdit');
    this.dataSource._updateChangeSubscription();
  }
  
  updateList(id: number, property: string, event: any) {
    console.log('XXXXXX updateList id', id);
    console.log('XXXXXX updateList property', property);
    // const editField = event.target.textContent;
    const editField = event.target.value;
    console.log('XXXXXX updateList editField', editField);
    console.log('XXXXXX updateList this.dataSource', this.dataSource);
    console.log('XXXXXX updateList event', event);
    this.dataSource.data = this.dataSource.data.map((e, i) => {
      if (id === i) {
        return {
          ...e,
          [property]: editField
        };
      }
      return e;
    });
    const data = this.dataSource.data;
    console.log('XXXXXX updateList data', data);
    this.dataSource._updateChangeSubscription();

    console.log('XXXXXX updateList new this.dataSource', this.dataSource);
  }


  
  remove(id: any) {
    console.log('XXXXXX remove id', id);
    this.dataSource.data.splice(id, 1);
    console.log('XXXXXX remove dataSource', this.dataSource);
    this.dataSource.sort;
    this.dataSource._updateChangeSubscription();
  }

  add() {
      this.dataSource.data.push(<never>[]);
      console.log('XXXXXX add this.dataSource', this.dataSource);
      this.dataSource._updateChangeSubscription();
  }

  

  changeValue(id: number, property: string, event: any) {
    console.log('XXXXXX changeValue id', id);
    console.log('XXXXXX changeValue property', property);
    this.editField = event.target.textContent;
    console.log('XXXXXX changeValue editField', this.editField);
  }

// --> end Editable table

file!:File;

// --> begin xlsx
onFileChange(evt: any) {
  const target: DataTransfer =  (evt.target) as DataTransfer;

  if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

  const reader: FileReader = new FileReader();

  this.file= target.files[0];

  // reader.readAsText(this.file);
      // reader.onload = (e) => {
      //   let csv: string = reader.result as string;
      //   console.log(csv);
      // }

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];

    this.titulo = evt.target.files[0].name;

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    console.log('XXXXXX ws', ws);

     /* save data */
     this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    console.log('XXXXXX data', this.data);
    console.log('XXXXXX dataSource', this.dataSource);


    /* Validação colunas*/
    console.log('XXXXXX header_diff', this.header_diff(this.displayedColumns, this.dataSource.data));

    this.displayedColumns = this.data[0];
    this.displayedColumns.push('$$edit');

    console.log('XXXXXX displayedColumns', this.displayedColumns);

    const rows = this.dataSource.data.slice(1);
    console.log('XXXXXX dataSource.slice(1)', rows);

  };

  reader.readAsBinaryString(target.files[0]);

  // Select the files from the event
  const files = evt.srcElement.files;
  console.log('XXXXXX files', files);

  // Parse the file you want to select for the operation along with the configuration
  this.ngxCsvParser.parse(files[0], { header: true, delimiter: ';' })
  .pipe().subscribe((result: any) => {
    console.log('XXXXXX Result', result);
    this.dataSource.data = result;
  }, (error: NgxCSVParserError) => {
    console.log('XXXXXX Error', error);
  });


}

header_diff(a1: any[], a2: Acordo[]) {

  const intersectionA = a1.filter(x => a2.includes(x));
  const diferenceA = a1.filter(x => !intersectionA.includes(x));
  console.log('XXXXXX header_diff', diferenceA);
  
  return diferenceA;


}
// --> end xlsx

}
