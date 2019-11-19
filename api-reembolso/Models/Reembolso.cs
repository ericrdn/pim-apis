using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_reembolsos
{
    public class Reembolsos : RetornoAPI
    {
        public List<Reembolso> ListaReembolsos { get; set; }
    }


    public class Reembolso
    {

        [Coluna("TRID")]
        public int IdReembolso { get; set; }

        [Coluna("TRDESCRICAO")]
        public string DesReembolso { get; set; }

    }

}

