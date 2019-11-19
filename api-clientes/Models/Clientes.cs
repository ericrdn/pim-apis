using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_clientes
{
    public class Clientes : RetornoAPI
    {
        public List<Cliente> ListaClientes { get; set; }
    }


    public class Cliente
    {

        [Coluna("COID")]
        public int IdCliente { get; set; }

        [Coluna("COCPF")]
        public string Cpf { get; set; }

        [Coluna("CONOMECLI")]
        public string NomeCliente { get; set; }

    }

}

