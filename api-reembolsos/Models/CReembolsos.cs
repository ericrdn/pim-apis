using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_creembolsos
{
    public class CReembolsos : RetornoAPI
    {
        public List<CReembolso> ListaCReembolsos { get; set; }
    }


    public class CReembolso
    {

        [Coluna("CRID")]
        public int IdReembolso { get; set; }

        [Coluna("CRTIPO")]
        public int TipoReembolso { get; set; }

        [Coluna("CRPLACAVEICULO")]
        public string Placa { get; set; }

        [Coluna("CRIDENDERECO")]
        public string Endereco { get; set; }

        [Coluna("CRVALOR")]
        public float Valor { get; set; }

        [Coluna("CRDTHRCAD")]
        public DateTime DataIniCad { get; set; }


        [Coluna("CRDTHRINI")]
        public DateTime DataIni { get; set; }


        [Coluna("CRDTHRFIM")]
        public DateTime DataFim { get; set; }
    }

}

