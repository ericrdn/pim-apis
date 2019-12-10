using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_manutencoes
{
    public class Manutencoes : RetornoAPI
    {
        public List<Manutencao> ListaManutencoes { get; set; }
    }


    public class Manutencao
    {

        [Coluna("CMID")]
        public int IdManutencao { get; set; }

        [Coluna("CMPLACAVEICULO")]
        public string PlacaVeiculo { get; set; }

        [Coluna("CMDESCRICAO")]
        public string Descricao { get; set; }

        [Coluna("@CMTIPOMANUTENCAO")]
        public string TipoManutencao { get; set; }

        [Coluna("CMPECAUSADA")]
        public string PecaUsada { get; set; }

        [Coluna("CMVALOR")]
        public double Valor { get; set; }
    }

}

