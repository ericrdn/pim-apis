using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_usuarios.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : ControllerBase
    {

        [HttpGet]
        public async Task<Usuarios> Get(int IdUsuario)
        {
            var retorno = new Usuarios();

            try
            {

                retorno.ListaUsuarios = await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_SELECIONAR_TUSUARIO",
                    new System.Data.SqlClient.SqlParameter("@TUID", IdUsuario));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Usuario modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TUDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@TUCAMPOSOBRIGATORIOS", modelo.CamposObrigatorios));

                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_INCLUIR_TUSUARIO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdUsuario)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TUID", IdUsuario));


                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_EXCLUIR_TUSUARIO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Usuario modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@TUID", modelo.IdUsuario));
                ParametrosEntrada.Add(new SqlParameter("@TUDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@TUCAMPOSOBRIGATORIOS", modelo.CamposObrigatorios));

                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_ALTERAR_TUSUARIO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }
    }
}
