using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_multas
{
    public class Multas : RetornoAPI
    {
        public List<Multa> ListaMultas { get; set; }
    }


    public class Multa
    {

        [Coluna("CMID")]
        public int IdMulta { get; set; }

        [Coluna("CMCODIGOMULTA")]
        public int CodigoMulta { get; set; }

        [Coluna("CMDTHRINFRACAO")]
        public DateTime DataHoraInfracao { get; set; }

        [Coluna("CMDTHRRECEBIMENTO")]
        public DateTime DataHoraRecebimentoInfracao { get; set; }

        [Coluna("CMLOCAL")]
        public string Local { get; set; }

        [Coluna("CMPONTOS")]
        public int Pontos { get; set; }


        [Coluna("CMVALOR")]
        public double Valor { get; set; }


        [Coluna("CMPLACA")]
        public string Placa { get; set; }
    }

}

