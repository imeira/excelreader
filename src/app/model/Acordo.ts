
export interface Acordo {
  NOME_POUPADOR: string;
  CPF_POUPADOR: string;
  DT_NASC_POUPADOR: string;
  ENDERECO: string;
  NUMERO: string;
  COMPLEMENTO: string;
  MUNICIPIO: string;
  BAIRRO: string;
  UF: string;
}

  /*

  using System;

namespace PlanosEconomicos.Application.Models
{
    public class CreateDealsInCampaignRequest
    {
        public int TipoPessoa { get; set; } //TODO Criar Enum ajustar entidade
        public string PoupadorNome { get; set; }
        string PoupadorCPF { get; set; } //TODO VALIDAR CPF válido ou CNPJ valido
        public DateTime PoupadorDtNascimento { get; set; } //TODO Preenchido automaticamente
        public string PoupadorEndereco { get; set; } //TODO Será preenchido automaticoa
        public string PoupadorEnderecoCEP { get; set; } //TODO Será preenchido automaticoa
        public string PoupadorEnderecoNumero { get; set; }  //TODO Será preenchido automaticoa
        public string PoupadorEnderecoComplemento { get; set; }  //TODO Será preenchido automaticoa
        public string PoupadorEnderecoBairro { get; set; }  //TODO Será preenchido automaticoa
        public string PoupadorEnderecoMunicipio { get; set; }  //TODO Será preenchido automaticoa
        public string PoupadorEnderecoUF { get; set; }  //TODO Será preenchido automaticoa
        /// <summary>
        /// Prenchimento obrigatório
        /// No mínimo catorze e até vinte caracteres numéricos.
        /// O campo deve ser formatado pelo sistema com a seguinte máscara: 0000000-00.0000.0.00.0000.
        /// </summary>
        /// <value></value>
        public string NumeroProcessoCNJ { get; set; }  //TODO VALIDAR CNPJ valido

        /// <summary>
        /// Dados do Processo: O campo Número do BJ é de preenchimento obrigatório
        /// Apenas caracteres numéricos com até 12 dígitos no formato 000000000000
        /// </summary>
        /// <value></value>
        public string CodigoBJ { get; set; } //TODO Validar tamanho
        public DateTime DtAjuizamento { get; set; }
        public string OrgaoLegal { get; set; }
        public string Vara { get; set; }
        public string Comarca { get; set; }
        public string UFProcesso { get; set; }
        public string TipoAcao { get; set; }
        public bool PossuiAdvogado { get; set; }
        public string AdvogadoNome { get; set; }
        public string AdvogadoCPF { get; set; } //TODO VALIDAR CNPJ valido
        public string AdvogadoOABMatricula { get; set; }
        public string AdvogadoOABMatriculaUF { get; set; }
        public string AdvogadoPJRazaoSocial { get; set; }
        public string AdvogadoPJCNPJ { get; set; } //TODO VALIDAR CNPJ valido
        public string AdvogadoPJOptanteSimples { get; set; }
        public float ValorAcordoPoupador { get; set; }
        public float ValorHonorarios { get; set; }
        public float ValorFebrapo { get; set; }
        public float ValorCustasProcessuais { get; set; }
        public int QtdaParcelasAcordo { get; set; }
        public float ValorParcelasAcordo { get; set; }
        public string FormaPagamentoAcordo { get; set; }
        public string DestinatarioPagamentoAcordo { get; set; }
        public int NumeroBancoPoupador { get; set; }
        public string NomeBancoPoupador { get; set; }
        public string NumeroAgenciaPoupador { get; set; }
        public string NumeroContaPoupador { get; set; }
        public string DvContaPoupador { get; set; }
        public string FormaPagamentoHonorario { get; set; }
        public string DestinatarioPagamentoHonorario { get; set; }
        public int NumeroBancoAdvogado { get; set; }
        public string NomeBancoAdvogado { get; set; }
        public string NumeroAgenciaAdvogado { get; set; }
        public string NumeroContaAdvogado { get; set; }
        public string DvContaAdvogado { get; set; }
        public int CampanhaTipoId { get; set; }
    }
}


   */



/*

using Itau.Rest.ResultRepresentation;
using System;

namespace PlanosEconomicos.Application.Models
{
    public class CampaignTypeResponse
    {
        public int Id { get; set; }
        public string DsHabConfCampanhaTipo { get; set; }
        public DateTime DtBase { get; set; }
        public int IdUsuarioInclusao { get; set; }
        public DateTime DtInclusao { get; set; }
        public int IdUsuarioExclusao { get; set; }
        public DateTime DtExclusao { get; set; }
    }
}

 */
