import {Proxy} from './Proxy';

export class CreateDealsInCampaignRequest extends Proxy {

  constructor(kwArgs: {}) {
    super(kwArgs);
  }

  TipoPessoa: number; // TODO Criar Enum ajustar entidade

  PoupadorNome: string;
  PoupadorCPF: string; // TODO VALIDAR CPF válido ou CNPJ valido
  PoupadorDtNascimento: Date; // TODO Preenchido automaticamente
  PoupadorEndereco: string; // TODO Será preenchido automaticoa
  PoupadorEnderecoCEP: string; // TODO Será preenchido automaticoa
  PoupadorEnderecoNumero: string;  // TODO Será preenchido automaticoa
  PoupadorEnderecoComplemento: string;  // TODO Será preenchido automaticoa
  PoupadorEnderecoMunicipio: string;  // TODO Será preenchido automaticoa
  PoupadorEnderecoBairro: string;  // TODO Será preenchido automaticoa
  PoupadorEnderecoUF: string;  // TODO Será preenchido automaticoa
//    <summary>
//    Prenchimento obrigatório
//    No mínimo catorze e até vinte caracteres numéricos.
//    O campo deve ser formatado pelo sistema com a seguinte máscara: 0000000-00.0000.0.00.0000.
//    </summary>
//    <value></value>
  NumeroProcessoCNJ: string;  // TODO VALIDAR CNPJ val
// <summary>
// Dados do Processo: O campo Número do BJ é de preenchimento obrigatório
// Apenas caracteres numéricos com até 12 dígitos no formato 000000000000
// </summary>
// <value></value>
  CodigoBJ: string; // TODO Validar tamanho
  DtAjuizamento: Date;
  OrgaoLegal: string;
  Vara: string;
  Comarca: string;
  UFProcesso: string;
  TipoAcao: string;
  PossuiAdvogado: boolean;
  AdvogadoNome: string;
  AdvogadoCPF: string; // TODO VALIDAR CNPJ valido
  AdvogadoOABMatricula: string;
  AdvogadoOABMatriculaUF: string;
  AdvogadoPJRazaoSocial: string;
  AdvogadoPJCNPJ: string; // TODO VALIDAR CNPJ valido
  AdvogadoPJOptanteSimples: string;
  ValorAcordoPoupador: number;
  ValorHonorarios: number;
  ValorFebrapo: number;
  ValorCustasProcessuais: number;
  QtdaParcelasAcordo: number;
  ValorParcelasAcordo: number;
  FormaPagamentoAcordo: string;
  DestinatarioPagamentoAcordo: string;
  NumeroBancoPoupador: number;
  NomeBancoPoupador: string;
  NumeroAgenciaPoupador: string;
  NumeroContaPoupador: string;
  DvContaPoupador: string;
  FormaPagamentoHonorario: string;
  DestinatarioPagamentoHonorario: string;
  NumeroBancoAdvogado: number;
  NomeBancoAdvogado: string;
  NumeroAgenciaAdvogado: string;
  NumeroContaAdvogado: string;
  DvContaAdvogado: string;
  CampanhaTipoId: number;

  get(key: string): any {
    const getter: string = '_' + key + 'Getter';
    return this[getter] ? this[getter]() : super.get(key);
  }

  get PoupadorNomeView(): string {
    return 'Poupador';
  }
  get PoupadorCPFView(): string {
    return 'CPF';
  }
  get PoupadorDtNascimentoView(): string {
    return 'Data Nascimento';
  }
  get PoupadorEnderecoView(): string {
    return 'Endereço';
  }
  get PoupadorEnderecoCEPView(): string {
    return 'CEP';
  }
  get PoupadorEnderecoNumeroView(): string {
    return 'Numero';
  }
  get PoupadorEnderecoComplementoView(): string {
    return 'Complemento';
  }
  get PoupadorEnderecoMunicipioView(): string {
    return 'Municipio';
  }
  get PoupadorEnderecoBairroView(): string {
    return 'Bairro';
  }
  get PoupadorEnderecoUFView(): string {
    return 'UF';
  }
}
