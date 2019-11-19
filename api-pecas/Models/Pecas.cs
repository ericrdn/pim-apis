using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_Peca
{
    public class Pecas : RetornoAPI
    {
        public List<Peca> ListaPecas { get; set; }
    }


    public class Peca
    {

        [Coluna("TPID")]
        public int IdPeca { get; set; }

        [Coluna("TPDESCRICAO")]
        public string DescricaoPeca { get; set; }
    }
}

