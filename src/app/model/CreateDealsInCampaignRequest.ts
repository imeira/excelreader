import { Proxy } from './Proxy';

export class CreateDealsInCampaignRequest extends Proxy {

  constructor(kwArgs: {}) {
    super(kwArgs);
  }

  id: number;

  PoupadorNome: string;
  PoupadorCPF: string;
  NumeroProcessoCNJ: string;
  CodigoBJ: string;
  UFProcesso: string;
  PossuiAdvogado: boolean;
  AdvogadoNome: string;
  AdvogadoCPF: string;
  AdvogadoOABMatricula: string;
  AdvogadoOABMatriculaUF: string;
  AdvogadoPJCNPJ: string;
  AdvogadoPJRazaoSocial: string;
  AdvogadoPJOptanteSimples: string;
  ValorAcordoPoupador: number;
  ValorHonorarios: number;
  ValorFebrapo: number;
  ValorCustasProcessuais: number;
  FormaPagamentoAcordo: string;
  FormaPagamentoHonorario: string;
  QtdaParcelasAcordo: number;
  ValorParcelasAcordo: number;
  DestinatarioPagamentoAcordo: string;
  DestinatarioPagamentoHonorario: string;
  NumeroBancoPoupador: number;
  NomeBancoPoupador: string;
  NumeroAgenciaPoupador: string;
  NumeroContaPoupador: string;
  DvContaPoupador: string;
  NomeBancoAdvogado: string;
  NumeroBancoAdvogado: number;
  NumeroAgenciaAdvogado: string;
  NumeroContaAdvogado: string;
  DvContaAdvogado: string;

  TipoPessoa: number;
  PoupadorDtNascimento: Date;
  PoupadorEndereco: string;
  PoupadorEnderecoNumero: string;
  PoupadorEnderecoComplemento: string;
  PoupadorEnderecoMunicipio: string;
  PoupadorEnderecoBairro: string;
  PoupadorEnderecoUF: string;
  PoupadorEnderecoCEP: string;
  DtAjuizamento: Date;
  OrgaoLegal: string;
  Vara: string;
  Comarca: string;
  TipoAcao: string;
  CampanhaTipoId: number;

  get(key: string): any {
    const getter: string = '_' + key + 'Getter';
    return this[getter] ? this[getter]() : super.get(key);
  }

  get PoupadorNomeView(): string {
    return 'Razão Social';
  }
  get PoupadorCPFView(): string {
    return 'CPF';
  }
  get NumeroProcessoCNJView(): string {
    return 'Numero Processo CNJ';
  }
  get CodigoBJView(): string {
    return 'Codigo BJ';
  }
  get UFProcessoView(): string {
    return 'UF Processo';
  }
  get PossuiAdvogadoView(): string {
    return 'Possui Advogado';
  }
  get AdvogadoNomeView(): string {
    return 'Advogado Nome';
  }
  get AdvogadoCPFView(): string {
    return 'Advogado CPF';
  }
  get AdvogadoOABMatriculaView(): string {
    return 'Advogado OAB';
  }
  get AdvogadoOABMatriculaUFView(): string {
    return 'Advogado OAB UF';
  }
  get AdvogadoPJCNPJView(): string {
    return 'Advogado NPJ';
  }
  get AdvogadoPJRazaoSocialView(): string {
    return 'Advogado RazaoSocial';
  }
  get AdvogadoPJOptanteSimplesView(): string {
    return 'OptanteSimples';
  }
  get ValorAcordoPoupadorView(): string {
    return 'Valor Acordo';
  }
  get ValorHonorariosView(): string {
    return 'Valor Honorarios';
  }
  get ValorFebrapoView(): string {
    return 'Valor Febrapo';
  }
  get ValorCustasProcessuaisView(): string {
    return 'Valor Custas Processuais';
  }
  get FormaPagamentoAcordoView(): string {
    return 'Forma Pagamento Acordo';
  }
  get FormaPagamentoHonorarioView(): string {
    return 'Forma Pagamento Honorario';
  }
  get QtdaParcelasAcordoView(): string {
    return 'QtdaParcelas Acordo';
  }
  get ValorParcelasAcordoView(): string {
    return 'Valor Parcela Acordo';
  }
  get DestinatarioPagamentoAcordoView(): string {
    return 'Destinatario Pagamento Acordo';
  }
  get DestinatarioPagamentoHonorarioView(): string {
    return 'Destinatario Pagamento Honorario';
  }
  get NumeroBancoPoupadorView(): string {
    return 'Numero Banco Poupador';
  }
  get NomeBancoPoupadorView(): string {
    return 'Nome Banco Poupador';
  }
  get NumeroAgenciaPoupadorView(): string {
    return 'Numero Agencia Poupador';
  }
  get NumeroContaPoupadorView(): string {
    return 'Numero Conta aPoupador';
  }
  get DvContaPoupadorView(): string {
    return 'Dv Cont aPoupador';
  }
  get NomeBancoAdvogadoView(): string {
    return 'Nome Banco Advogado';
  }
  get NumeroBancoAdvogadoView(): string {
    return 'Numero Banco Advogado';
  }
  get NumeroAgenciaAdvogadoView(): string {
    return 'Numero Agenci Advogado';
  }
  get NumeroContaAdvogadoView(): string {
    return 'Numero Conta Advogado';
  }
  get DvContaAdvogadoView(): string {
    return 'Dv Conta Advogado';
  }
}
