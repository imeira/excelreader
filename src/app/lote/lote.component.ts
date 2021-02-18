import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import { read, utils } from 'xlsx';
import { AcordoEnum } from '../enum/AcordoEnum';
import { CreateDealsInCampaignRequest } from '../model/CreateDealsInCampaignRequest';
import { LoteService } from '../services/lote.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const SCHEMA = {
  PoupadorNome: 'text',
  PoupadorCPF: 'text',
  PoupadorDtNascimento: 'text',
  PoupadorEndereco: 'text',
  PoupadorEnderecoNumero: 'text',
  PoupadorEnderecoComplemento: 'text',
  PoupadorEnderecoMunicipio: 'text',
  PoupadorEnderecoBairro: 'text',
  PoupadorEnderecoUF: 'text'
};


type AOA = any[][];

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit {

  constructor(
    private loteService: LoteService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  titulo: string;

  dataSchema = SCHEMA;
  dataHeader!: AOA;
  dataBody!: AOA;
  displayedColumns: string[];
  dataSource = new MatTableDataSource <CreateDealsInCampaignRequest>();
  createDealsInCampaignRequestArray: CreateDealsInCampaignRequest[] = [];

  @ViewChild(MatSort) sort: MatSort;

  willDownload = true;
  editField: string;

  file!: File;

  parentForm: FormGroup;
  childArray: FormArray;
  invalid = false;

  ngOnInit() {
    this.validation();
  }

  validation() {

    this.parentForm = this.fb.group({
      busca: [null, Validators.required],
      // createDealsInCampaignRequest: this.fb.group({
      //   PoupadorNome: [null, Validators.required],
      //   PoupadorCPF: [null, Validators.required],
      //   PoupadorDtNascimento: [null, Validators.required],
      //   PoupadorEndereco: [null, Validators.required],
      //   PoupadorEnderecoNumero: [null, Validators.required],
      //   PoupadorEnderecoComplemento: [null, Validators.required],
      //   PoupadorEnderecoMunicipio: [null, Validators.required],
      //   PoupadorEnderecoBairro: [null, Validators.required],
      //   PoupadorEnderecoUF: [null, Validators.required]
      // }),
      childArray: this.fb.array([])
    });
  }

  showValidation(fromgroup: FormGroup) {
    Object.keys(fromgroup.controls).forEach(campo => {
      const controle = fromgroup.get(campo);
      if (controle != null && controle.invalid) {
        this.invalid = true;
        controle.markAsDirty();

      }
      if (controle instanceof FormGroup) {
        this.showValidation(controle);
      }
    });
  }
  createChildArray(createDealsInCampaignRequest: CreateDealsInCampaignRequest): FormGroup {
    return this.fb.group({
      PoupadorNome: new FormControl(createDealsInCampaignRequest.PoupadorNome, [Validators.required]),
      PoupadorCPF: new FormControl(createDealsInCampaignRequest.PoupadorCPF, [Validators.required]),
      PoupadorDtNascimento: new FormControl(createDealsInCampaignRequest.PoupadorDtNascimento, [Validators.required]),
      PoupadorEndereco: new FormControl(createDealsInCampaignRequest.PoupadorEndereco, [Validators.required]),
      PoupadorEnderecoNumero: new FormControl(createDealsInCampaignRequest.PoupadorEnderecoNumero, [Validators.required]),
      PoupadorEnderecoComplemento: new FormControl(createDealsInCampaignRequest.PoupadorEnderecoComplemento, [Validators.required]),
      PoupadorEnderecoMunicipio: new FormControl(createDealsInCampaignRequest.PoupadorEnderecoMunicipio, [Validators.required]),
      PoupadorEnderecoBairro: new FormControl(createDealsInCampaignRequest.PoupadorEnderecoBairro, [Validators.required]),
      PoupadorEnderecoUF: new FormControl(createDealsInCampaignRequest.PoupadorEnderecoUF, [Validators.required])
      // CEP:  [null, [Validators.required, FormValidations.cepvalidator]]
    });
  }


  createChildArrayNew(): FormGroup {
    return this.fb.group({
      PoupadorNome: [null, Validators.required],
      PoupadorCPF: [null, Validators.required],
      PoupadorDtNascimento: [null, Validators.required],
      PoupadorEndereco: [null, Validators.required],
      PoupadorEnderecoNumero: [null, Validators.required],
      PoupadorEnderecoComplemento: [null, Validators.required],
      PoupadorEnderecoMunicipio: [null, Validators.required],
      PoupadorEnderecoBairro: [null, Validators.required],
      PoupadorEnderecoUF: [null, Validators.required]
    });
  }

  aplicaCssErro(input: string) {
    const control = this.parentForm.get(input);
    // tslint:disable-next-line:early-exit
    if (control != null) {
      return {
        'is-invalid' : control.invalid && (control.touched || control.dirty)
      };
    }
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
    console.log('XXXXXX updateList this.dataSource.data', this.dataSource.data);
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

    console.log('XXXXXX updateList new this.dataSource.data', this.dataSource.data);
  }

  remove(id: any) {
    console.log('XXXXXX remove id', id);
    this.dataSource.data.splice(id, 1);
    console.log('XXXXXX remove dataSource', this.dataSource);
    // tslint:disable-next-line:no-unused-expression
    this.dataSource.sort;
    this.dataSource._updateChangeSubscription();
    this.toastr.success('Linha removida com Sucesso!');
  }

  add() {
    this.dataSource.data.push([] as never);
    console.log('XXXXXX add this.dataSource', this.dataSource);
    setTimeout(() => {
      const el = document.getElementById('editButton' + (this.dataSource.data.length - 1));
      // tslint:disable-next-line:early-exit
      if (el != null) {
        el.click();
        setTimeout(() => {
          const e2 = document.getElementById('PoupadorNome' + (this.dataSource.data.length - 1));
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

  setCreateDealsInCampaignRequestArrayByDataSource(): void {
    this.createDealsInCampaignRequestArray = JSON.parse(JSON.stringify(this.dataSource.data));
    console.log('XXXXXX this.createDealsInCampaignRequestArray', this.createDealsInCampaignRequestArray);
  }

  validateCreateDealsInCampaignRequest(model: CreateDealsInCampaignRequest): Observable<CreateDealsInCampaignRequest> {
    console.log('XXXXXX validateCreateDealsInCampaignRequest createDealsInCampaignRequest', model);
    return this.loteService
      .validateCreateDealsInCampaignRequest(model);
  }

  onSubmit() {
    console.log('XXXXXX register this.dataSource1.data', this.dataSource.data);
    if (this.parentForm.valid) {
      this.setCreateDealsInCampaignRequestArrayByDataSource();
      this.loteService
        .postCreateDealsInCampaignRequest(this.createDealsInCampaignRequestArray).subscribe({
          next: data => {
            console.log('XXXXXX register data.id', data.id);
            this.toastr.success('Arquivo registrado com Sucesso!');
          },
          error: error => {
            this.toastr.error(error.message);
            console.error('There was an error!', error);
          }});
    } else {
      console.log('invalido');
      this.invalid = true;
      this.showValidation(this.parentForm);
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
      // @ts-ignore
      this.dataSource.data = xLRowObject;
      this.setCreateDealsInCampaignRequestArrayByDataSource();
      this.childArray = this.fb.array([]);
      this.createDealsInCampaignRequestArray.forEach(detail => {
        this.childArray.push(this.createChildArray(detail));
      });
      // Add the finished array onto the top-level form.
      this.parentForm.setControl('childArray', this.childArray);
      console.log('XXXXXX this.childArray ', this.childArray);
      // this.dataSource = new MatTableDataSource((this.childArray as FormArray).controls);
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
