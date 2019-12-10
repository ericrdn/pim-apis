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

    public class DadosHome : RetornoAPI
    {

        [Coluna("VEICULOS_OPERACAO")]
        public int QtdeVeiculos { get; set; }

        [Coluna("VEICULOS_MANUTENCAO_MES")]
        public int QtdeVeiculosManutencao { get; set; }

        [Coluna("VALOR_MULTA_MES")]
        public double ValorMulta { get; set; }

        [Coluna("VALOR_MANUTENCAO")]
        public double ValorManutencao { get; set; }

        [Coluna("VALOR_PECAS")]
        public double ValorPecas { get; set; }

        [Coluna("VALOR_ESTACIONAMENTO")]
        public double ValorEstacionamento { get; set; }

        [Coluna("VALOR_COMBUSTIVEL")]
        public double ValorCombustivel { get; set; }


    }

}

