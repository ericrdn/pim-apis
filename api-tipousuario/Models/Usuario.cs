using System;
using System.Data;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Collections.Generic;

namespace api_usuarios
{
    public class Usuarios : RetornoAPI
    {
        public List<Usuario> ListaUsuarios { get; set; }
    }


    public class Usuario
    {

        [Coluna("TUID")]
        public int IdUsuario { get; set; }

        [Coluna("TUDESCRICAO")]
        public string Descricao { get; set; }

        [Coluna("TUCAMPOSOBRIGATORIOS")]
        public string CamposObrigatorios { get; set; }
    }

}

