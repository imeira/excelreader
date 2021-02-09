import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit {

  // --> begin Editable table 
  editField: string;
  awaitingCsvRecords: Array<any> = [];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.csvRecords[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingCsvRecords.push(this.csvRecords[id]);
    this.csvRecords.splice(id, 1);
  }

  add() {
    if (this.awaitingCsvRecords.length > 0) {
      const person = this.awaitingCsvRecords[0];
      this.csvRecords.push(person);
      this.awaitingCsvRecords.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
// --> end Editable table 



// --> begin xlsx
  formulario: FormGroup;

  data: [][];
  titulo: string;

  tableHeaders = [];
  tableRows = [];

  constructor(
   private formBuilder: FormBuilder,
    private ngxCsvParser: NgxCsvParser
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      busca: [null, Validators.required],
    });
  }

  onFileChange(evt: any) {
    this.csvRecords =  [];

    const target : DataTransfer =  <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      this.titulo = "1- " + evt.target.files[0].name;
      //console.log(this.titulo);

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log('XXX 1 XXX ws', ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log('XXX 1 XXX data', this.data);

      this.tableHeaders = this.data[0];
      
    

      let rows = this.data.slice(1);
      console.log('XXX 1 XXX data.slice(1)', rows);

      this.tableRows = [rows];

    };

    reader.readAsBinaryString(target.files[0]);

  }
// --> end xlsx

// --> begin ngx-csv-parser
  csvRecords: Array<any> = [];
  header: boolean = true;


  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

   // Your applications input change listener for the CSV File
   fileChangeListener($event: any): void {
    this.data =  [];
 
    // Select the files from the event
    const files = $event.srcElement.files;

    this.titulo = "2- " + files[0].name;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
    .pipe().subscribe((result: Array<any>) => {
      console.log('XXX 2 XXX Result', result);
      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('XXX 2 XXX Error', error);
    });
  }
// --> end ngx-csv-parser


}
