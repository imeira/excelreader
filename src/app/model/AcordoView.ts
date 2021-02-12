import { AcordoEnum } from "../enum/AcordoEnum";

type AOA = any[][];

const FROM_TO = [
	[AcordoEnum.NOME_POUPADOR, 'Poupador Nome'],
	['CPF_POUPADOR', 'Poupador CPF'],
	['DT_NASC_POUPADOR', 'Poupador Data Nascimento'],
	['ENDERECO', 'Poupador Endereco'],
	['NUMERO', 'Poupador Endereco Numero'],
	['COMPLEMENTO', 'Poupador Endereco Complemento'],
	['MUNICIPIO', 'Poupador Endereco Municipio'],
	['BAIRRO', 'Poupador Endereco Bairro'],
	['UF', 'Poupador Endereco UF']
  ];

export class AcordoView {

  constructor() { }

  SCHEMA: string;
  ENTITY: string;
  TYPE: string;
  VIEW: string;


  //  FROM_TO: AOA = {
  //   ['NOME_POUPADOR', 'PoupadorNome'],
  //   ['CPF_POUPADOR', 'PoupadorCPF'],
  //   ['DT_NASC_POUPADOR', 'PoupadorDtNascimento'],
  //   ['ENDERECO', 'PoupadorEndereco'],
  //   ['NUMERO', 'PoupadorEnderecoNumero'],
  //   ['COMPLEMENTO', 'PoupadorEnderecoComplemento'],
  //   ['MUNICIPIO', 'PoupadorEnderecoMunicipio'],
  //   ['BAIRRO', 'PoupadorEnderecoBairro'],
  //   ['UF', 'PoupadorEnderecoUF'],
  // };

}
