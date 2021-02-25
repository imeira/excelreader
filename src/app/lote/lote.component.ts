import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  NumeroProcessoCNJ: 'text',
  CodigoBJ: 'text',
  UFProcesso: 'text',
  PossuiAdvogado: 'boolean',
  AdvogadoNome: 'text',
  AdvogadoCPF: 'text',
  AdvogadoOABMatricula: 'text',
  AdvogadoOABMatriculaUF: 'text',
  AdvogadoPJCNPJ: 'text',
  AdvogadoPJRazaoSocial: 'text',
  AdvogadoPJOptanteSimples: 'text',
  ValorAcordoPoupador: 'number',
  ValorHonorarios: 'number',
  ValorFebrapo: 'number',
  ValorCustasProcessuais: 'number',
  FormaPagamentoAcordo: 'text',
  FormaPagamentoHonorario: 'text',
  QtdaParcelasAcordo: 'number',
  ValorParcelasAcordo: 'number',
  DestinatarioPagamentoAcordo: 'text',
  DestinatarioPagamentoHonorario: 'text',
  NumeroBancoPoupador: 'number',
  NomeBancoPoupador: 'text',
  NumeroAgenciaPoupador: 'text',
  NumeroContaPoupador: 'text',
  DvContaPoupador: 'text',
  NomeBancoAdvogado: 'text',
  NumeroBancoAdvogado: 'number',
  NumeroAgenciaAdvogado: 'text',
  NumeroContaAdvogado: 'text',
  DvContaAdvogado: 'text'
};

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit {

  constructor(
    private loteService: LoteService,
    private toastr: ToastrService
  ) { }

  titulo: string;

  dataSchema = SCHEMA;
  dataHeader!: any[][];
  dataBody!: any[][];
  displayedColumns: string[];
  dataSource = new MatTableDataSource <any>();
  createDealsInCampaignRequestArray: CreateDealsInCampaignRequest[] = [];

  willDownload = true;
  file!: File;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({ deals: new FormArray([]) });
  }

  setFormGroup(line: any): void {
    // @ts-ignore
    this.form.get('deals').push(new FormGroup({
      PoupadorNome: new FormControl(line != null ? line.PoupadorNome : null, [Validators.required]),
      PoupadorCPF: new FormControl(line != null ? line.PoupadorCPF : null, [Validators.required]),
      NumeroProcessoCNJ: new FormControl(line != null ? line.NumeroProcessoCNJ : null, [Validators.required]),
      CodigoBJ: new FormControl(line != null ? line.CodigoBJ : null, [Validators.required]),
      UFProcesso: new FormControl(line != null ? line.UFProcesso : null, [Validators.required]),
      PossuiAdvogado: new FormControl(line != null ? line.PossuiAdvogado : null, [Validators.required]),
      AdvogadoNome: new FormControl(line != null ? line.AdvogadoNome : null, [Validators.required]),
      AdvogadoCPF: new FormControl(line != null ? line.AdvogadoCPF : null, [Validators.required]),
      AdvogadoOABMatricula: new FormControl(line != null ? line.AdvogadoOABMatricula : null, [Validators.required]),
      AdvogadoOABMatriculaUF: new FormControl(line != null ? line.AdvogadoOABMatriculaUF : null, [Validators.required]),
      AdvogadoPJCNPJ: new FormControl(line != null ? line.AdvogadoPJCNPJ : null, [Validators.required]),
      AdvogadoPJRazaoSocial: new FormControl(line != null ? line.AdvogadoPJRazaoSocial : null, [Validators.required]),
      AdvogadoPJOptanteSimples: new FormControl(line != null ? line.AdvogadoPJOptanteSimples : null, [Validators.required]),
      ValorAcordoPoupador: new FormControl(line != null ? line.ValorAcordoPoupador : null, [Validators.required]),
      ValorHonorarios: new FormControl(line != null ? line.ValorHonorarios : null, [Validators.required]),
      ValorFebrapo: new FormControl(line != null ? line.ValorFebrapo : null, [Validators.required]),
      ValorCustasProcessuais: new FormControl(line != null ? line.ValorCustasProcessuais : null, [Validators.required]),
      FormaPagamentoAcordo: new FormControl(line != null ? line.FormaPagamentoAcordo : null, [Validators.required]),
      FormaPagamentoHonorario: new FormControl(line != null ? line.FormaPagamentoHonorario : null, [Validators.required]),
      QtdaParcelasAcordo: new FormControl(line != null ? line.QtdaParcelasAcordo : null, [Validators.required]),
      ValorParcelasAcordo: new FormControl(line != null ? line.ValorParcelasAcordo : null, [Validators.required]),
      DestinatarioPagamentoAcordo: new FormControl(line != null ? line.DestinatarioPagamentoAcordo : null, [Validators.required]),
      DestinatarioPagamentoHonorario: new FormControl(line != null ? line.DestinatarioPagamentoHonorario : null, [Validators.required]),
      NumeroBancoPoupador: new FormControl(line != null ? line.NumeroBancoPoupador : null, [Validators.required]),
      NomeBancoPoupador: new FormControl(line != null ? line.NomeBancoPoupador : null, [Validators.required]),
      NumeroAgenciaPoupador: new FormControl(line != null ? line.NumeroAgenciaPoupador : null, [Validators.required]),
      NumeroContaPoupador: new FormControl(line != null ? line.NumeroContaPoupador : null, [Validators.required]),
      DvContaPoupador: new FormControl(line != null ? line.DvContaPoupador : null, [Validators.required]),
      NomeBancoAdvogado: new FormControl(line != null ? line.NomeBancoAdvogado : null, [Validators.required]),
      NumeroBancoAdvogado: new FormControl(line != null ? line.NumeroBancoAdvogado : null, [Validators.required]),
      NumeroAgenciaAdvogado: new FormControl(line != null ? line.NumeroAgenciaAdvogado : null, [Validators.required]),
      NumeroContaAdvogado: new FormControl(line != null ? line.NumeroContaAdvogado : null, [Validators.required]),
      DvContaAdvogado: new FormControl(line != null ? line.DvContaAdvogado : null, [Validators.required])
    }));
  }

  loadform(): void {
    this.createDealsInCampaignRequestArray.forEach(line => {
      this.setFormGroup(line);
      console.log('XXX loadform Line', line[0]);
      console.log('XXX loadform FORM', this.form);
    });
  }

  checkError = (controlName: string, errorName: string, element: FormGroup) => {
    const control = element.controls[controlName];
    const hasError = control.hasError(errorName);
    if (hasError) {
      console.log('controlName:', controlName, ' errorName:', errorName, ' Value:', control.value);
      control.markAllAsTouched();
    }
    return hasError;
  }

  showValidation(fromgroup: FormGroup) {
    Object.keys(fromgroup.controls).forEach(campo => {
      const controle = fromgroup.get(campo);
      if (controle != null && controle.invalid) {
        controle.markAsDirty();
      }
      if (controle instanceof FormGroup) {
        this.showValidation(controle);
      }
    });
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
    this.setFormGroup(null);
    // this.dataSource = new MatTableDataSource((this.form.get('deals') as FormArray).controls);
    // this.dataSource.data.push(new MatTableDataSource <any>());
    this.dataSource._updateChangeSubscription();
    console.log('XXXXXX add this.dataSource', this.dataSource);
    setTimeout(() => {
      console.log('XXXXXX add this.e2 field ', 'PoupadorNome' + (this.dataSource.data.length - 1));
      const e2 = document.getElementById('PoupadorNome' + (this.dataSource.data.length - 1));
      console.log('XXXXXX add this.e2', e2);
      if (e2 != null) {
        e2.click();
        e2.focus();
      }
    }, 300);
    this.toastr.success('Linha adicionada com Sucesso!');
  }

  getPropertyView(col: any): string {
    const colView = col + 'View';
    return new CreateDealsInCampaignRequest(colView).get(colView);
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
    if (this.form.valid) {
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
      this.showValidation(this.form);
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    this.dataSource.data = [];

    if (target.files.length !== 1) {
      this.toastr.error(`É permitido carregar um arquivo por vez!`);
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    this.file = target.files[0];
    this.titulo = this.file.name;
    let xLRowObject;
    reader.onload = () => {
      const data = reader.result;
      const workbookkk = read(data, { type: 'binary' });
      console.log('XXXXXX convertExcelToJson workbookkk', workbookkk);
      let ws: XLSX.WorkSheet = workbookkk.Sheets[workbookkk.SheetNames[0]];
      console.log('XXXXXX ws', ws);

      /* save data */
      console.log('XXXXXX fileList', XLSX.utils.sheet_to_json(ws, { raw: true }));
      this.dataHeader = ((XLSX.utils.sheet_to_json(ws, { header: 1 })));
      console.log('XXXXXX dataHeader', this.dataHeader);

      this.displayedColumns = this.dataHeader[0];
      console.log('XXXXXX displayedColumns', this.displayedColumns);

      if (!this.validateColuns()) {
        console.log('XXXXXX NgxCSVParserError! ');
        this.toastr.error(`Formato de arquivo invalido! Clique para baixar o Modelo!`);
        throw new NgxCSVParserError();
      }

      // alter HEADER names
      this.dataBody = ((XLSX.utils.sheet_to_json(ws, { header: 0 })));
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
      console.log(xLRowObject);
      console.log('XXXXXX convertExcelToJson xLRowObject', xLRowObject);
      this.dataSource.data = xLRowObject;
      this.setCreateDealsInCampaignRequestArrayByDataSource();
      this.loadform();

      this.dataSource = new MatTableDataSource((this.form.get('deals') as FormArray).controls);
      console.log('XXXXXX this.dataSource.data ', this.dataSource.data);

      this.setDownload(JSON.stringify(xLRowObject));
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
