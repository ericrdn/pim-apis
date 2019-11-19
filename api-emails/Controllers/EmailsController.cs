using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_emails.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailsController : ControllerBase
    {

        [HttpGet]
        public async Task<Emails> Get(int IdEmails)
        {
            var retorno = new Emails();

            try
            {

                retorno.ListaEmails = await new BancodeDados().ExecutarProcedure<Email>(
                    "SP_SELECIONA_CEMAILS",
                    new System.Data.SqlClient.SqlParameter("@CEID", IdEmails));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Email modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CECNPJCPF", modelo.CnpjCpf));
                ParametrosEntrada.Add(new SqlParameter("@CEEMAIL", modelo.EEmail));
                ParametrosEntrada.Add(new SqlParameter("@CETIPO", modelo.Tipo));
                ParametrosEntrada.Add(new SqlParameter("@CEACEITARECEBER", modelo.AceitaReceber));

                await new BancodeDados().ExecutarProcedure<Email>(
                    "SP_INCLUIR_CEMAILS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdEmail)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CEID", IdEmail));


                await new BancodeDados().ExecutarProcedure<Email>(
                    "SP_EXCLUIR_CCEMAILS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Email modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CEID", modelo.IdEmail));
                ParametrosEntrada.Add(new SqlParameter("@CECNPJCPF", modelo.CnpjCpf));
                ParametrosEntrada.Add(new SqlParameter("@CEEMAIL", modelo.EEmail));
                ParametrosEntrada.Add(new SqlParameter("@CETIPO", modelo.Tipo));
                ParametrosEntrada.Add(new SqlParameter("@CEACEITARECEBER", modelo.AceitaReceber));

                await new BancodeDados().ExecutarProcedure<Email>(
                    "SP_ALTERA_CEMAILS", ParametrosEntrada.ToArray());
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
