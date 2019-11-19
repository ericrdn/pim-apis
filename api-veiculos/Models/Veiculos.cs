using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_veiculos
{
    public class Veiculos : RetornoAPI
    {
        public List<Veiculo> ListaVeiculos { get; set; }
    }


    public class Veiculo
    {

        [Coluna("TVID")]
        public int IdVeiculo { get; set; }

        [Coluna("TVDESCRICAOTIPO")]
        public string DescriçãoTipo { get; set; }

    }

}
