export enum AcordoEnum {
  NOME_POUPADOR  = 'PoupadorNome',
  CPF_POUPADOR = 'PoupadorCPF',
  DT_NASC_POUPADOR    = 'PoupadorDtNascimento',
  ENDERECO    = 'PoupadorEndereco',
  NUMERO    = 'PoupadorEnderecoNumero',
  COMPLEMENTO    = 'PoupadorEnderecoComplemento',
  MUNICIPIO    = 'PoupadorEnderecoMunicipio',
  BAIRRO    = 'PoupadorEnderecoBairro',
  UF    = 'PoupadorEnderecoUF'
}

const keys = Object.keys(AcordoEnum);
const values =  Object.values(AcordoEnum);
const entries =  Object.entries(AcordoEnum);
const assign =  Object.assign(AcordoEnum);
const getPrototypeOf =  Object.getPrototypeOf(AcordoEnum.BAIRRO);

const FROM_TO = [
  [AcordoEnum.NOME_POUPADOR, 'Poupador Nome', 'text'],
  [AcordoEnum.CPF_POUPADOR, 'Poupador CPF', 'text'],
  [AcordoEnum.DT_NASC_POUPADOR, 'Poupador Data Nascimento', 'date'],
  [AcordoEnum.ENDERECO, 'Poupador Endereco', 'text'],
  [AcordoEnum.NUMERO, 'Poupador Endereco Numero', 'text'],
  [AcordoEnum.COMPLEMENTO, 'Poupador Endereco Complemento', 'text'],
  [AcordoEnum.MUNICIPIO, 'Poupador Endereco Municipio', 'text'],
  [AcordoEnum.BAIRRO, 'Poupador Endereco Bairro', 'text'],
  [AcordoEnum.UF, 'Poupador Endereco UF', 'text']
];

export class AcordoView {

  constructor(public acordoEnum: AcordoEnum, public view: string, public type: string) {
  }

  public static getAcordoEnum(key: AcordoEnum): AcordoView {
    switch (key) {
      case AcordoEnum.NOME_POUPADOR: {
        return new AcordoView(AcordoEnum.NOME_POUPADOR, 'Nome Poupador', 'text');
      }
      case AcordoEnum.CPF_POUPADOR: {
        return new AcordoView(AcordoEnum.CPF_POUPADOR, 'CPF Poupador', 'text');
      }
      case AcordoEnum.DT_NASC_POUPADOR: {
        return new AcordoView(AcordoEnum.DT_NASC_POUPADOR, 'Data Nascimento Poupador', 'text');
      }
      case AcordoEnum.ENDERECO: {
        return new AcordoView(AcordoEnum.ENDERECO, 'Endereço Poupador', 'text');
      }
      case AcordoEnum.NUMERO: {
        return new AcordoView(AcordoEnum.NUMERO, 'Nº Poupador', 'text');
      }
      case AcordoEnum.COMPLEMENTO: {
        return new AcordoView(AcordoEnum.COMPLEMENTO, 'Complemento Poupador', 'text');
      }
      case AcordoEnum.MUNICIPIO: {
        return new AcordoView(AcordoEnum.MUNICIPIO, 'Municipio Poupador', 'text');
      }
      case AcordoEnum.BAIRRO: {
        return new AcordoView(AcordoEnum.BAIRRO, 'Bairro Poupador', 'text');
      }
      case AcordoEnum.UF: {
        return new AcordoView(AcordoEnum.UF, 'UF Poupador', 'text');
      }
      default: {
        throw Error('Erro getAcordoEnum');
      }
    }
  }
}
