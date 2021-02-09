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


  editField: string;
  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
    { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
    { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }




















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
    // this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
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

      this.titulo = evt.target.files[0].name;
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


//usando ngx-csv-parser

  csvRecords: any[] = [];
  header: boolean = true;


  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

   // Your applications input change listener for the CSV File
   fileChangeListener($event: any): void {
    this.data =  [];
 
    // Select the files from the event
    const files = $event.srcElement.files;

    this.titulo = files[0].name;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
    .pipe().subscribe((result: any) => {
      console.log('XXX 2 XXX Result', result);
      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('XXX 2 XXX Error', error);
    });
  }



}
