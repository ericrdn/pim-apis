using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_llocacao;

namespace api_llocacaos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LLocacaosController : ControllerBase
    {

        [HttpGet]
        public async Task<LLocacaos> Get(int IdLocacao)
        {
            var retorno = new LLocacaos();

            try
            {

                retorno.ListaLLocacaos = await new BancodeDados().ExecutarProcedure<LLocacao>(
                    "SP_SELECIONA_LLOCACAO",
                    new System.Data.SqlClient.SqlParameter("@LLID", IdLocacao));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(LLocacao modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@LLUSUARIOCAD", modelo.Usuario));
                ParametrosEntrada.Add(new SqlParameter("@LLIDCLIENTE", modelo.IdCliente));
                ParametrosEntrada.Add(new SqlParameter("@LLPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRCAD", modelo.DataCad));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRINICIO", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRFINAL", modelo.DataFim));
                ParametrosEntrada.Add(new SqlParameter("@LLIDSEGUROCONTRATADO", modelo.Seguro));
                ParametrosEntrada.Add(new SqlParameter("@LLVALORDIALOCACAO", modelo.ValDia));

                await new BancodeDados().ExecutarProcedure<LLocacao>(
                    "SP_INCLUIR_LLOCACAO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdLocacao)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@LLID", IdLocacao));


                await new BancodeDados().ExecutarProcedure<LLocacao>(
                    "SP_EXCLUIR_LLOCACAO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(LLocacao modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@LLID", modelo.IdLocacao));
                ParametrosEntrada.Add(new SqlParameter("@LLUSUARIOCAD", modelo.Usuario));
                ParametrosEntrada.Add(new SqlParameter("@LLIDCLIENTE", modelo.IdCliente));
                ParametrosEntrada.Add(new SqlParameter("@LLPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRCAD", modelo.DataCad));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRINICIO", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@LLDTHRFINAL", modelo.DataFim));
                ParametrosEntrada.Add(new SqlParameter("@LLIDSEGUROCONTRATADO", modelo.Seguro));
                ParametrosEntrada.Add(new SqlParameter("@LLVALORDIALOCACAO", modelo.ValDia));

                await new BancodeDados().ExecutarProcedure<LLocacao>(
                    "SP_ALTERA_LLOCACAO", ParametrosEntrada.ToArray());
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
