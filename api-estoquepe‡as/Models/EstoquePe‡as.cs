using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_estoquepecas
{
    public class EstoquePecas : RetornoAPI
    {
        public List<EstoquePeca> ListaEstoquePeca { get; set; }
    }


    public class EstoquePeca
    {

        [Coluna("CMID")]
        public int IdEstoquePeca { get; set; }

        [Coluna("CMIDPECA")]
        public int IdPeca { get; set; }

        [Coluna("CMPLACAVEICULO")]
        public string PlacaVeiculo { get; set; }

        [Coluna("CMDESCRICAO")]
        public string Descricao { get; set; }

        [Coluna("CMIDMANUTENCAO")]
        public int IdManutencao { get; set; }

    }

}

