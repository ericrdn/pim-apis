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

        [Coluna("CUID")]
        public int IdUsuario { get; set; }

        [Coluna("CUNOME")]
        public string Nome { get; set; }

        [Coluna("CUCNPJCPF")]
        public string CnpjCpf { get; set; }

        [Coluna("CUCNH")]
        public string Cnh { get; set; }

        [Coluna("CURG")]
        public string Rg { get; set; }

        [Coluna("CUTPUSUARIO")]
        public int TpUsuario { get; set; }


        [Coluna("CUIDENDERECO")]
        public int IdEndereco { get; set; }


        [Coluna("CUCARTEIRATRABALHO")]
        public string CarteiraTrabalho { get; set; }
    }

}

