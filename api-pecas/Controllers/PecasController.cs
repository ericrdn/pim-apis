using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_Peca;

namespace api_pecas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PecaController : ControllerBase
    {

        [HttpGet]
        public async Task<Pecas> Get(int IdPeca)
        {
            var retorno = new Pecas();

            try
            {

                retorno.ListaPecas = await new BancodeDados().ExecutarProcedure<Peca>(
                    "SP_SELECIONA_TPECAS",
                    new System.Data.SqlClient.SqlParameter("@TPID", IdPeca));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Peca modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TPDESCRICAO", modelo.DescricaoPeca));
                
                await new BancodeDados().ExecutarProcedure<Peca>(
                    "SP_INCLUIR_TPECAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdPeca)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TPID", IdPeca));


                await new BancodeDados().ExecutarProcedure<Peca>(
                    "SP_EXCLUIR_TPECAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Peca modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@TPID", modelo.IdPeca));
                ParametrosEntrada.Add(new SqlParameter("@TPDESCRICAO", modelo.DescricaoPeca));
                
                await new BancodeDados().ExecutarProcedure<Peca>(
                    "SP_ALTERA_TPECAS", ParametrosEntrada.ToArray());
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
