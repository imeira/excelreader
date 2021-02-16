import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import { read, utils } from 'xlsx';
import { AcordoEnum } from '../enum/AcordoEnum';
import { CreateDealsInCampaignRequest } from '../model/CreateDealsInCampaignRequest';
import {LoteService} from '../services/lote.service';
import { ToastrService } from 'ngx-toastr';

// const SCHEMA = {
//   NOME_POUPADOR: 'text',
//   CPF_POUPADOR: 'text',
//   DT_NASC_POUPADOR: 'text',
//   ENDERECO: 'text',
//   NUMERO: 'text',
//   COMPLEMENTO: 'text',
//   MUNICIPIO: 'text',
//   BAIRRO: 'text',
//   UF: 'text'
// };


type AOA = any[][];
const ELEMENT_DATA: CreateDealsInCampaignRequest[] = [];

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit {

  constructor(
    private loteService: LoteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  formulario: FormGroup;
  titulo: string;

  // dataSchema = SCHEMA;
  dataHeader!: AOA;
  dataBody!: AOA;
  displayedColumns: string[] = Object.keys(AcordoEnum);
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  willDownload = true;
  editField: string;

  file!: File;

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.formulario = this.formBuilder.group({
      busca: [null, Validators.required]
      // tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      // local: ['', Validators.required],
      // qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      // telefone: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]]
    });

  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  confirmEdit(event: any) {
    console.log('XXXXXX confirmEdit event', event);
    this.dataSource._updateChangeSubscription();
    this.toastr.success('Linha editada com Sucesso!');
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
    // @ts-ignore
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
    this.toastr.success('Linha removida com Sucesso!');
  }

  add() {
    this.dataSource.data.push([] as never);
    console.log('XXXXXX add this.dataSource', this.dataSource);
    setTimeout(() => {
      const el = document.getElementById('editButton' + (this.dataSource.data.length - 1));
      if (el != null) {
        el.click();
        setTimeout(() => {
          const e2 = document.getElementById('Poupador' + (this.dataSource.data.length - 1));
          if (e2 != null) {
            e2.focus();
          }
        }, 300);
      }
    }, 300);
    this.dataSource._updateChangeSubscription();
    this.toastr.success('Linha adicionada com Sucesso!');
  }

  getPropertyView(col: any): string {
    const colView = col + 'View';
    return new CreateDealsInCampaignRequest(colView).get(colView);
  }

  changeValue(id: number, property: string, event: any) {
    console.log('XXXXXX changeValue id', id);
    console.log('XXXXXX changeValue property', property);
    this.editField = event.target.textContent;
    console.log('XXXXXX changeValue editField', this.editField);
  }

  register() {
    if (this.formulario.valid) {
      this.dataSource.data.push([] as never);
      console.log('XXXXXX register this.dataSource', this.dataSource);
      this.dataSource._updateChangeSubscription();
      this.toastr.success('Arquivo carregado com Sucesso!');
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;

    if (target.files.length !== 1) {
      this.toastr.error(`É permitido carregar um arquivo por vez!`);
      this.dataSource.data = [];
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    this.file = target.files[0];
    this.titulo = this.file.name;
    let workbookkk;
    let xLRowObject;
    // let parsedJSON = [];
    let jsonObject;
    reader.onload = () => {
      const data = reader.result;
      workbookkk = read(data, { type: 'binary' });
      console.log('XXXXXX convertExcelToJson workbookkk', workbookkk);

      let ws: XLSX.WorkSheet = workbookkk.Sheets[workbookkk.SheetNames[0]];
      console.log('XXXXXX ws', ws);

      /* save data */
      this.dataHeader = ((XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA);
      console.log('XXXXXX dataHeader', this.dataHeader);

      this.displayedColumns = this.dataHeader[0];
      console.log('XXXXXX displayedColumns', this.displayedColumns);

      if (!this.validateColuns()) {
        console.log('XXXXXX NgxCSVParserError! ');
        this.dataSource.data = [];
        this.toastr.error(`Formato de arquivo invalido! Clique para baixar o Modelo!`);
        throw new NgxCSVParserError();
      }

      // alter HEADER names
      this.dataBody = ((XLSX.utils.sheet_to_json(ws, { header: 0 })) as AOA);
      console.log('XXXXXX dataBody', this.dataBody);

      // this.displayedColumns = ObjectHelper.getNamesToView(AcordoEnum);
      this.displayedColumns = Object.values(AcordoEnum);
      console.log('XXXXXX displayedColumns2', this.displayedColumns);

      // Had to create a new workbook and then add the header
      const headerNew = [];
      headerNew.push(this.displayedColumns);
      console.log('XXXXXX headerNew', headerNew);
      // const wsNew = XLSX.utils.book_new();
      ws = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(ws, headerNew);

      // Starting in the second row to avoid overriding and skipping headers
      XLSX.utils.sheet_add_json(ws, this.dataBody, { origin: 'A2', skipHeader: true });
      console.log('XXXXXX wsNew3', ws);

      // add action columns
      this.displayedColumns.push('$$edit');

      // convert to JSON
      xLRowObject = utils.sheet_to_json(ws);
      jsonObject = JSON.stringify(xLRowObject);
      console.log(jsonObject);
      console.log('XXXXXX convertExcelToJson jsonObject', jsonObject);
      console.log(xLRowObject);
      console.log('XXXXXX convertExcelToJson xLRowObject', xLRowObject);
      // parsedJSON = JSON.parse(jsonObject);
      this.dataSource.data = xLRowObject;
      // this.dataSource.data[0] = this.displayedColumns;
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

  private validateColuns(): boolean {
    const headerDiff = this.header_diff(Object.keys(AcordoEnum), this.displayedColumns);
    console.log('XXXXXX header_diff', headerDiff);
    console.log('XXXXXX this.header_diff.length', headerDiff.length);
    if (headerDiff.length > 0) {
      return false;
    }
    return true;
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
