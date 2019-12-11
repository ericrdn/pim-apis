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
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {

        [HttpGet]
        public async Task<Usuarios> Get(int IdUsuario)
        {
            var retorno = new Usuarios();

            try
            {

                retorno.ListaUsuarios = await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_SELECIONA_CUSUARIOS",
                    new System.Data.SqlClient.SqlParameter("@CUID", IdUsuario));
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
                ParametrosEntrada.Add(new SqlParameter("@CUNOME", modelo.Nome));
                ParametrosEntrada.Add(new SqlParameter("@CUCNPJCPF", modelo.CnpjCpf));
                ParametrosEntrada.Add(new SqlParameter("@CUCNH", modelo.Cnh));
                ParametrosEntrada.Add(new SqlParameter("@CURG", modelo.Rg));
                ParametrosEntrada.Add(new SqlParameter("@CUTPUSUARIO", modelo.TpUsuario));
                ParametrosEntrada.Add(new SqlParameter("@CUIDENDERECO", modelo.IdEndereco));
                ParametrosEntrada.Add(new SqlParameter("@CUCARTEIRATRABALHO", modelo.CarteiraTrabalho));
                ParametrosEntrada.Add(new SqlParameter("@CUDATAVALIDADECNH", modelo.DataValidadeCnh));
                ParametrosEntrada.Add(new SqlParameter("@CUDATAULTIMOEXAMEMEDICO", modelo.DataUltimoExameMedico));

                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_INCLUIR_CUSUARIOS", ParametrosEntrada.ToArray());
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
                ParametrosEntrada.Add(new SqlParameter("@CUID", IdUsuario));


                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_EXCLUIR_CUSUARIOS", ParametrosEntrada.ToArray());
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

                ParametrosEntrada.Add(new SqlParameter("@CUID", modelo.IdUsuario));
                ParametrosEntrada.Add(new SqlParameter("@CUNOME", modelo.Nome));
                ParametrosEntrada.Add(new SqlParameter("@CUCNPJCPF", modelo.CnpjCpf));
                ParametrosEntrada.Add(new SqlParameter("@CUCNH", modelo.Cnh));
                ParametrosEntrada.Add(new SqlParameter("@CURG", modelo.Rg));
                ParametrosEntrada.Add(new SqlParameter("@CUTPUSUARIO", modelo.TpUsuario));
                ParametrosEntrada.Add(new SqlParameter("@CUIDENDERECO", modelo.IdEndereco));
                ParametrosEntrada.Add(new SqlParameter("@CUCARTEIRATRABALHO", modelo.CarteiraTrabalho));
                ParametrosEntrada.Add(new SqlParameter("@CUDATAVALIDADECNH", modelo.DataValidadeCnh));
                ParametrosEntrada.Add(new SqlParameter("@CUDATAULTIMOEXAMEMEDICO", modelo.DataUltimoExameMedico));

                await new BancodeDados().ExecutarProcedure<Usuario>(
                    "SP_ALTERA_CUSUARIOS", ParametrosEntrada.ToArray());
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
