using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_multas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MultasController : ControllerBase
    {

        [HttpGet]
        public async Task<Multas> Get(int IdMulta)
        {
            var retorno = new Multas();

            try
            {

                retorno.ListaMultas = await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_SELECIONAR_CMULTAS",
                    new System.Data.SqlClient.SqlParameter("@CMID", IdMulta));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Multa modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMCODIGOMULTA", modelo.CodigoMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRINFRACAO", modelo.DataHoraInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRRECEBIMENTO", modelo.DataHoraRecebimentoInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMLOCAL", modelo.Local));
                ParametrosEntrada.Add(new SqlParameter("@CMPONTOS", modelo.Pontos));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACA", modelo.Placa));

                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_INCLUIR_CMULTAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdMulta)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMID", IdMulta));


                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_EXCLUIR_CMULTAS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Multa modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CMID", modelo.IdMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMCODIGOMULTA", modelo.CodigoMulta));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRINFRACAO", modelo.DataHoraInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMDTHRRECEBIMENTO", modelo.DataHoraRecebimentoInfracao));
                ParametrosEntrada.Add(new SqlParameter("@CMLOCAL", modelo.Local));
                ParametrosEntrada.Add(new SqlParameter("@CMPONTOS", modelo.Pontos));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACA", modelo.Placa));

                await new BancodeDados().ExecutarProcedure<Multa>(
                    "SP_ALTERAR_CMULTAS", ParametrosEntrada.ToArray());
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
