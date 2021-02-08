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

  formulario: FormGroup;

  data: [][];
  titulo: string;

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

      this.titulo = evt.target.files[0].name;
      //console.log(this.titulo);

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);

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
      console.log('XXXX Result', result);
      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('YYYY Error', error);
    });
  }



}
