using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_reembolsos;

namespace api_multas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoReembolsoController : ControllerBase
    {

        [HttpGet]
        public async Task<Reembolsos> Get(int IdReembolso)
        {
            var retorno = new Reembolsos();

            try
            {

                retorno.ListaReembolsos = await new BancodeDados().ExecutarProcedure<Reembolso>(
                    "SP_SELECIONAR_TREEMBOLSOS",
                    new System.Data.SqlClient.SqlParameter("@TRID", IdReembolso));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Reembolso modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TRDESCRICAO", modelo.DesReembolso));

                await new BancodeDados().ExecutarProcedure<Reembolso>(
                    "SP_INCLUIR_TREEMBOLSOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdReembolso)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TRID", IdReembolso));


                await new BancodeDados().ExecutarProcedure<Reembolso>(
                    "SP_EXCLUIR_TREEMBOLSOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Reembolso modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@TRID", modelo.IdReembolso));
                ParametrosEntrada.Add(new SqlParameter("@TRDESCRICAO", modelo.DesReembolso));

                await new BancodeDados().ExecutarProcedure<Reembolso>(
                    "SP_ALTERAR_TREEMBOLSOS", ParametrosEntrada.ToArray());
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
