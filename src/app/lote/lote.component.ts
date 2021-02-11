import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import { read, utils } from 'xlsx';
import { Acordo } from '../model/Acordo';


const SCHEMA = {
  NOME_POUPADOR: 'text',
  CPF_POUPADOR: 'text',
  DT_NASC_POUPADOR: 'text',
  ENDERECO: 'text',
  NUMERO: 'text',
  COMPLEMENTO: 'text',
  MUNICIPIO: 'text',
  BAIRRO: 'text',
  UF: 'text'
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
  'UF'
  // ,'$$edit'
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
    private formBuilder: FormBuilder
    // ,private ngxCsvParser: NgxCsvParser
  ) { }

  formulario: FormGroup;
  titulo: string;

  data!: AOA;
  displayedColumns: string[] = COLUMNS;
  dataSchema = SCHEMA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  willDownload = true;
  editField: string;


  file!: File;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      busca: [null, Validators.required],
    });
  }

  //  applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  confirmEdit(event: any) {
    console.log('XXXXXX confirmEdit event', event);
    this.dataSource._updateChangeSubscription();
  }

  cancelEdit() {
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
    // tslint:disable-next-line:no-unused-expression
    this.dataSource.sort;
    this.dataSource._updateChangeSubscription();
  }

  add() {
    this.dataSource.data.push([] as never);
    console.log('XXXXXX add this.dataSource', this.dataSource);
    this.dataSource._updateChangeSubscription();
  }

  changeValue(id: number, property: string, event: any) {
    console.log('XXXXXX changeValue id', id);
    console.log('XXXXXX changeValue property', property);
    this.editField = event.target.textContent;
    console.log('XXXXXX changeValue editField', this.editField);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;

    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();

    this.file = target.files[0];
    this.titulo = this.file.name;
    let workbookkk;
    let xLRowObject;
    // let parsedJSON = [];
    let jsonObject;
    reader.onload = () => {
      //  alert(reader.result);
      const data = reader.result;
      workbookkk = read(data, { type: 'binary' });
      console.log('XXXXXX convertExcelToJson workbookkk', workbookkk);

      const ws: XLSX.WorkSheet = workbookkk.Sheets[workbookkk.SheetNames[0]];
      console.log('XXXXXX ws', ws);

      /* save data */
      this.data = ((XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA);
      console.log('XXXXXX data', this.data);

      this.displayedColumns = this.data[0];
      console.log('XXXXXX displayedColumns', this.displayedColumns);
      this.validateColuns();

      this.displayedColumns.push('$$edit');

      xLRowObject = utils.sheet_to_json(workbookkk.Sheets[workbookkk.SheetNames[0]]);
      jsonObject = JSON.stringify(xLRowObject);
      console.log(jsonObject);
      console.log('XXXXXX convertExcelToJson jsonObject', jsonObject);
      console.log(xLRowObject);
      console.log('XXXXXX convertExcelToJson xLRowObject', xLRowObject);
      // parsedJSON = JSON.parse(jsonObject);
      // console.log('XXXXXX convertExcelToJson parsedJSON', parsedJSON);
      // @ts-ignore
      this.dataSource.data = xLRowObject;
      console.log('XXXXXX this.dataSource.data ', this.dataSource.data);

      this.setDownload(jsonObject);
    };

    reader.readAsBinaryString(target.files[0]);

    // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat('...');
  }


  header_diff(a1: any[], a2: any[]): any {
    const intersectionA = a1.filter(x => a2.includes(x));
    const diferenceA = a1.filter(x => !intersectionA.includes(x));
    console.log('XXXXXX header_diff', diferenceA);
    return diferenceA;
  }

  private validateColuns() {
    const headerDiff = this.header_diff(COLUMNS, this.displayedColumns);
    console.log('XXXXXX header_diff', headerDiff);
    console.log('XXXXXX this.header_diff.length', headerDiff.length);
    if (headerDiff.length > 0) {
      console.log('XXXXXX NgxCSVParserError Formato de arquivo invalido ');
      this.dataSource.data = [];
      throw new NgxCSVParserError();
    }
  }

  setDownload(data: any) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      if (el != null) {
        el.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
        el.setAttribute('download', 'modelo.csv');
      }
    }, 1000);
  }

}
