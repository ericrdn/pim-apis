using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_creembolsos;

namespace api_CReembolsos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReembolsosController : ControllerBase
    {

        [HttpGet]
        public async Task<CReembolsos> Get(int IdReembolso)
        {
            var retorno = new CReembolsos();

            try
            {

                retorno.ListaCReembolsos = await new BancodeDados().ExecutarProcedure<CReembolso>(
                    "SP_SELECIONAR_CREEMBOLSOS",
                    new System.Data.SqlClient.SqlParameter("@CRID", IdReembolso));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(CReembolso modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CRTIPO", modelo.TipoReembolso));
                ParametrosEntrada.Add(new SqlParameter("@CRPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@CRIDENDERECO", modelo.Endereco));
                ParametrosEntrada.Add(new SqlParameter("@CRVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRCAD", modelo.DataIniCad));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRINI", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRFIM", modelo.DataFim));

                await new BancodeDados().ExecutarProcedure<CReembolso>(
                    "SP_INCLUIR_CREEMBOLSOS", ParametrosEntrada.ToArray());
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
                ParametrosEntrada.Add(new SqlParameter("@CRID", IdReembolso));


                await new BancodeDados().ExecutarProcedure<CReembolso>(
                    "SP_EXCLUIR_CREEMBOLSOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(CReembolso modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CRTIPO", modelo.TipoReembolso));
                ParametrosEntrada.Add(new SqlParameter("@CRPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@CRIDENDERECO", modelo.Endereco));
                ParametrosEntrada.Add(new SqlParameter("@CRVALOR", modelo.Valor));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRCAD", modelo.DataIniCad));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRINI", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@CRDTHRFIM", modelo.DataFim));
                ParametrosEntrada.Add(new SqlParameter("@CRID", modelo.IdReembolso));

                await new BancodeDados().ExecutarProcedure<CReembolso>(
                    "SP_ALTERAR_CREEMBOLSOS", ParametrosEntrada.ToArray());
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
