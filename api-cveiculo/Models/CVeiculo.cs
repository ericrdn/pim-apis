using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_cveiculos
{
    public class CVeiculos : RetornoAPI
    {
        public List<CVeiculo> ListaCVeiculos { get; set; }
    }


    public class CVeiculo
    {

        [Coluna("CVCGC_PROPIETARIO")]
        public string CGCProp { get; set; }

        [Coluna("CVPLACA")]
        public string Placa { get; set; }

        [Coluna("CVCHASSI")]
        public string Chassi { get; set; }

        [Coluna("CVMODELO")]
        public string Modelo { get; set; }

        [Coluna("CVMARCAR")]
        public string Marca { get; set; }

        [Coluna("CVCOR")]
        public string Cor { get; set; }

        [Coluna("CVANO")]
        public int Ano { get; set; }

        [Coluna("CVTIPOVEICULO")]
        public int TipoVeic { get; set; }

        [Coluna("CVQUILOMETRAGEM")]
        public int Quilometragem { get; set; }

        [Coluna("CVVALIDADESEGURO")]
        public DateTime ValidadeSeguro { get; set; }

        [Coluna("CVNOMESEGURADORA")]
        public string NomeSeguradora { get; set; }

        [Coluna("CVNUMEROAPOLICE")]
        public int NumeroApolice { get; set; }
    }

}

