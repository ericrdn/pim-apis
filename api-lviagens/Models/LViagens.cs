using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_lviagens
{
    public class LViagens : RetornoAPI
    {
        public List<LViagem> ListaLViagens { get; set; }
    }


    public class LViagem
    {

        [Coluna("LVID")]
        public int IdViagem { get; set; }

        [Coluna("LVDTHRCAD")]
        public DateTime DataCad { get; set; }

        [Coluna("LVDTHRINICIO")]
        public DateTime DataIni { get; set; }

        [Coluna("LVDTHRFINAL")]
        public DateTime DataFim { get; set; }

        [Coluna("LVPLACAVEICULO")]
        public string Placa { get; set; }

        [Coluna("LVIDENDERECOORIGEM")]
        public int EndOri { get; set; }


        [Coluna("LVIDENDERECODESTINO")]
        public int EndDes { get; set; }


        [Coluna("LVPREVISAOKM")]
        public int PreKM { get; set; }
    }

}

