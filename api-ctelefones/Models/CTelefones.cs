using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_ctelefones
{
    public class CTelefones : RetornoAPI
    {
        public List<CTelefone> ListaCTelefones { get; set; }
    }


    public class CTelefone
    {

        [Coluna("CTID")]
        public int IdTelefone { get; set; }

        [Coluna("CTCNPJCPF")]
        public string Cnpjcpf { get; set; }

        [Coluna("CTDD")]
        public int DD { get; set; }

        [Coluna("CTNUMERO")]
        public int Numero { get; set; }

        [Coluna("CTTIPO")]
        public int Tipo { get; set; }

        [Coluna("CTOPERADORA")]
        public int Operadora { get; set; }

    }

}

