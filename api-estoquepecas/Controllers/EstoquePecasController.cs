using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_estoquepecas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EstoquePecasController : ControllerBase
    {

        [HttpGet]
        public async Task<EstoquePecas> Get(int IdEstoquePeca)
        {
            var retorno = new EstoquePecas();

            try
            {

                retorno.ListaEstoquePeca = await new BancodeDados().ExecutarProcedure<EstoquePeca>(
                    "SP_SELECIONA_CESTOQUEPECAS",
                    new System.Data.SqlClient.SqlParameter("@CMID", IdEstoquePeca));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(EstoquePeca modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMIDPECA", modelo.IdPeca));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACAVEICULO", modelo.PlacaVeiculo));
                ParametrosEntrada.Add(new SqlParameter("@CMDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@CMIDMANUTENCAO", modelo.IdManutencao));

                await new BancodeDados().ExecutarProcedure<EstoquePeca>(
                    "SP_INCLUIR_CESTOQUEPECAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdEstoquePeca)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMID", IdEstoquePeca));


                await new BancodeDados().ExecutarProcedure<EstoquePeca>(
                    "SP_EXCLUIR_CESTOQUEPECAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(EstoquePeca modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CMID", modelo.IdEstoquePeca));
                ParametrosEntrada.Add(new SqlParameter("@CMIDPECA", modelo.IdPeca));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACAVEICULO", modelo.PlacaVeiculo));
                ParametrosEntrada.Add(new SqlParameter("@CMDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@CMIDMANUTENCAO", modelo.IdManutencao));

                await new BancodeDados().ExecutarProcedure<EstoquePeca>(
                    "SP_ALTERA_CESTOQUEPECAS", ParametrosEntrada.ToArray());
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
