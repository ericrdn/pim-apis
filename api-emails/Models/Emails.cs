using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_emails
{
    public class Emails : RetornoAPI
    {
        public List<Email> ListaEmails { get; set; }
    }


    public class Email
    {

        [Coluna("CEID")]
        public int IdEmail { get; set; }

        [Coluna("CECNPJCPF")]
        public string CnpjCpf { get; set; }

        [Coluna("CEEMAIL")]
        public string EEmail { get; set; }

        [Coluna("CETIPO")]
        public int Tipo { get; set; }

        [Coluna("CEACEITARECEBER")]
        public int AceitaReceber { get; set; }
    }

}
