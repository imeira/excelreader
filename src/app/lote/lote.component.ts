import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';

const SCHEMA = {
  'NOME_POUPADOR': 'text',
  'CPF_POUPADOR': 'text',
  'DT_NASC_POUPADOR': 'text',
  'ENDERECO': 'text',
  'NUMERO': 'text',
  'COMPLEMENTO': 'text',
  'MUNICIPIO': 'text',
  'BAIRRO': 'text',
  'UF': 'text'/*,
  'CEP': 'text',
  'NR_PROCESSO': 'text',
  'CDPASTA': 'text',
  'UF_PROCESSO': 'text',
  'ORGAO': 'text',
  'VARA': 'text',
  'COMARCA': 'text',
  'DT_AJUIZAMENTO': 'text',
  'TIPO_ACAO': 'text',
  'ADV	NOME_ADVOGADO': 'text',
  'CPF_ADVOGADO': 'text',
  'OAB	OAB_UF	CNPJ': 'text',
  'RAZAO_SOCIAL': 'text',
  'OPTANTE_SIMPLES': 'text',
  'VL_BRUTO_ACORDO': 'text',
  'VL_ACORDO_PAGO': 'text',
  'VL_HONORARIO': 'text',
  'VL_FEBRAPO': 'text',
  'VL_CUSTAS': 'text',
  'FORMA_ACORDO': 'text',
  'FORMA_HONORARIO': 'text',
  'QTD_PARC_ACORDO': 'text',
  'VL_PARC_ACORDO': 'text',
  'DEST_ACORDO': 'text',
  'DEST_HONORARIO': 'text',
  'NR_BANCO_POUPADOR': 'text',
  'DS_BANCO_POUPADOR': 'text',
  'NR_AGENCIA_POUPADOR': 'text',
  'NR_CONTA_POUPADOR': 'text',
  'DV_CONTA_POUPADOR': 'text',
  'DS_BANCO_ADVOGADO': 'text',
  'NR_BANCO_ADVOGADO': 'text',
  'NR_AGENCIA_ADVOGADO': 'text',
  'NR_CONTA_ADVOGADO': 'text',
  'DV_CONTA_ADVOGADO': 'text',
  'TIPO_PROCESSAMENTO': 'text',
  'ID_PORTAL_ORIGEM': 'text',
  'ID_PARCELA_ACORDO_ORIGEM': 'text',
  'ID_PARCELA_HONO_ORIGEM': 'text',
  'ID_PARCELA_FEBR_ORIGEM': 'text' */
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
  /*'CEP',
  'NR_PROCESSO',
  'CDPASTA',
  'UF_PROCESSO',
  'ORGAO',
  'VARA',
  'COMARCA',
  'DT_AJUIZAMENTO',
  'TIPO_ACAO',
  'ADV',
  'CPF_ADVOGADO',
  'OAB',
  'RAZAO_SOCIAL',
  'OPTANTE_SIMPLES',
  'VL_BRUTO_ACORDO',
  'VL_ACORDO_PAGO',
  'VL_HONORARIO',
  'VL_FEBRAPO',
  'VL_CUSTAS',
  'FORMA_ACORDO',
  'FORMA_HONORARIO',
  'QTD_PARC_ACORDO',
  'VL_PARC_ACORDO',
  'DEST_ACORDO',
  'DEST_HONORARIO',
  'NR_BANCO_POUPADOR',
  'DS_BANCO_POUPADOR',
  'NR_AGENCIA_POUPADOR',
  'NR_CONTA_POUPADOR',
  'DV_CONTA_POUPADOR',
  'DS_BANCO_ADVOGADO',
  'NR_BANCO_ADVOGADO',
  'NR_AGENCIA_ADVOGADO',
  'NR_CONTA_ADVOGADO',
  'DV_CONTA_ADVOGADO',
  'TIPO_PROCESSAMENTO',
  'ID_PORTAL_ORIGEM',
  'ID_PARCELA_ACORDO_ORIGEM',
  'ID_PARCELA_HONO_ORIGEM',
  'ID_PARCELA_FEBR_ORIGEM', */
  '$$edit'
];

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

  // dataSource = [];
  dataSource: Array<any> = [];

  // --> begin Editable table
  editField: string;

   ngOnInit() {
     this.formulario = this.formBuilder.group({
       busca: [null, Validators.required],
     });
   }

  updateList(id: number, property: string, event: any) {
    console.log('XXX 2 XXX updateList id', id);
    console.log('XXX 2 XXX updateList property', property);
    // const editField = event.target.textContent;
    const editField = event.target.value;
    console.log('XXX 2 XXX updateList editField', editField);
    console.log('XXX 2 XXX updateList this.dataSource', this.dataSource);
    console.log('XXX 2 XXX updateList event', event);
    this.dataSource[id][property] = editField;
    console.log('XXX 2 XXX updateList new this.dataSource', this.dataSource);
  }

  remove(id: any) {
    console.log('XXX 2 XXX remove id', id);
    this.dataSource.splice(id, 1);
    console.log('XXX 2 XXX remove dataSource', this.dataSource);
  }

  add() {
      const data: Array<any> = [];
      this.dataSource.push(data);
      console.log('XXX 2 XXX add this.dataSource', this.dataSource);
  }

  changeValue(id: number, property: string, event: any) {
    console.log('XXX 2 XXX changeValue id', id);
    console.log('XXX 2 XXX changeValue property', property);
    this.editField = event.target.textContent;
    console.log('XXX 2 XXX changeValue editField', this.editField);
  }
// --> end Editable table


// --> begin xlsx
onFileChange(evt: any) {
  const target: DataTransfer =  (evt.target) as DataTransfer;

  if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];

    this.titulo = evt.target.files[0].name;

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    console.log('XXX 1 XXX ws', ws);

    this.dataSource = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    console.log('XXX 1 XXX dataSource', this.dataSource);

    /* Validação colunas*/
    console.log('XXX 1 XXX header_diff', this.header_diff(this.displayedColumns, this.dataSource[0]));

    this.displayedColumns = this.dataSource[0];
    this.displayedColumns.push('$$edit');

    console.log('XXX 1 XXX displayedColumns', this.displayedColumns);

    const rows = this.dataSource.slice(1);
    console.log('XXX 1 XXX dataSource.slice(1)', rows);

  };

  reader.readAsBinaryString(target.files[0]);

  // Select the files from the event
  const files = evt.srcElement.files;
  console.log('XXX 2 XXX files', files);

  // Parse the file you want to select for the operation along with the configuration
  this.ngxCsvParser.parse(files[0], { header: true, delimiter: ';' })
  .pipe().subscribe((result: any) => {
    console.log('XXX 2 XXX Result', result);
    this.dataSource = result;
  }, (error: NgxCSVParserError) => {
    console.log('XXX 2 XXX Error', error);
  });


}

header_diff(a1: any[], a2: any[]) {

  const intersectionA = a1.filter(x => a2.includes(x));
  const diferenceA = a1.filter(x => !intersectionA.includes(x));

  return diferenceA;


}
// --> end xlsx

}
