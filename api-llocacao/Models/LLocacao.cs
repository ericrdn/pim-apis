using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_llocacao
{
    public class LLocacaos : RetornoAPI
    {
        public List<LLocacao> ListaLLocacaos { get; set; }
    }


    public class LLocacao
    {

        [Coluna("LLID")]
        public int IdLocacao { get; set; }

        [Coluna("LLUSUARIOCAD")]
        public int Usuario { get; set; }

        [Coluna("LLIDCLIENTE")]
        public int IdCliente { get; set; }

        [Coluna("LLPLACAVEICULO")]
        public string Placa { get; set; }

        [Coluna("LLDTHRCAD")]
        public DateTime DataCad { get; set; }

        [Coluna("LLDTHRINICIO")]
        public DateTime DataIni { get; set; }

        [Coluna("LLDTHRFINAL")]
        public DateTime DataFim { get; set; }

        [Coluna("LLIDSEGUROCONTRATADO")]
        public int Seguro { get; set; }

        [Coluna("LLVALORDIALOCACAO")]
        public float ValDia { get; set; }
    }

}

