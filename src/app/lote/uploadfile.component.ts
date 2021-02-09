import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx'

type AOA = any[][];

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  titulo = 'teste excel';
  file!:File;
  arrayBuffer : any
  filelist : any
  colunasdefault : any[] = ["coluna1","coluna2","coluna3", "coluna4","coluna5"]


  data!: AOA
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
  constructor() { }

  ngOnInit(): void {
  }

  addfile(event : any)
  {
  this.file= event.target.files[0];
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(this.file);
  fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet,{header:1}));
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            this.filelist = [];
            console.log(this.filelist)

  }
}

onFileChange(evt: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));

    /* Validação colunas*/
    console.log(this.header_diff(this.colunasdefault,this.data[0]))

    console.log(this.data)
  };
  reader.readAsBinaryString(target.files[0]);
}


header_diff (a1 : any[], a2 : any[]) {

  let intersectionA = a1.filter(x=> a2.includes(x))
  let diferenceA = a1.filter(x => !intersectionA.includes(x))

  return diferenceA;


}

}
