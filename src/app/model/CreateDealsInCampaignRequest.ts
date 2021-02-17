import {Proxy} from './Proxy';

export class CreateDealsInCampaignRequest extends Proxy {

  constructor(kwArgs: {}) {
    super(kwArgs);
  }

  id: number;

  TipoPessoa: number;

  PoupadorNome: string;
  PoupadorCPF: string;
  PoupadorDtNascimento: Date;
  PoupadorEndereco: string;
  PoupadorEnderecoNumero: string;
  PoupadorEnderecoComplemento: string;
  PoupadorEnderecoMunicipio: string;
  PoupadorEnderecoBairro: string;
  PoupadorEnderecoUF: string;

  PoupadorEnderecoCEP: string;
  NumeroProcessoCNJ: string;
  CodigoBJ: string;
  DtAjuizamento: Date;
  OrgaoLegal: string;
  Vara: string;
  Comarca: string;
  UFProcesso: string;
  TipoAcao: string;
  PossuiAdvogado: boolean;
  AdvogadoNome: string;
  AdvogadoCPF: string;
  AdvogadoOABMatricula: string;
  AdvogadoOABMatriculaUF: string;
  AdvogadoPJRazaoSocial: string;
  AdvogadoPJCNPJ: string;
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
