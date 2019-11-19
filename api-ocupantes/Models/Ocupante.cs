using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_ocupantes
{
    public class Ocupantes : RetornoAPI
    {
        public List<Ocupante> ListaOcupantes { get; set; }
    }


    public class Ocupante
    {

        [Coluna("COID")]
        public int IdOcupante { get; set; }

        [Coluna("COIDVIAGEM")]
        public int IdViagem { get; set; }

    }

}

