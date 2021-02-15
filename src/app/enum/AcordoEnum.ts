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
