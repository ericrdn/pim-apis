using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_propietarios
{
    public class Propietarios : RetornoAPI
    {
        public List<Propietario> ListaPropietarios { get; set; }
    }


    public class Propietario
    {

        [Coluna("CPID")]
        public int IdPropietario { get; set; }

        [Coluna("CPCGC")]
        public string Cgc { get; set; }

        [Coluna("CPNOME")]
        public string Nome { get; set; }
    }

}

