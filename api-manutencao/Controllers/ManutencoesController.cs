using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_manutencoes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManutencoesController : ControllerBase
    {

        [HttpGet]
        public async Task<Manutencoes> Get(int IdManutencao)
        {
            var retorno = new Manutencoes();

            try
            {

                retorno.ListaManutencoes = await new BancodeDados().ExecutarProcedure<Manutencao>(
                    "SP_SELECIONA_CMANUTENCAO",
                    new System.Data.SqlClient.SqlParameter("@CMID", IdManutencao));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Manutencao modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMPLACAVEICULO", modelo.PlacaVeiculo));
                ParametrosEntrada.Add(new SqlParameter("@CMDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@CMTIPOMANUTENCAO", modelo.TipoManutencao));
                ParametrosEntrada.Add(new SqlParameter("@CMPECAUSADA", modelo.PecaUsada));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));

                await new BancodeDados().ExecutarProcedure<Manutencao>(
                    "SP_INCLUIR_CMANUTENCAO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdManutencao)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CMID", IdManutencao));


                await new BancodeDados().ExecutarProcedure<Manutencao>(
                    "SP_EXCLUIR_CMANUTENCAO", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Manutencao modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CMID", modelo.IdManutencao));
                ParametrosEntrada.Add(new SqlParameter("@CMPLACAVEICULO", modelo.PlacaVeiculo));
                ParametrosEntrada.Add(new SqlParameter("@CMDESCRICAO", modelo.Descricao));
                ParametrosEntrada.Add(new SqlParameter("@CMTIPOMANUTENCAO", modelo.TipoManutencao));
                ParametrosEntrada.Add(new SqlParameter("@CMPECAUSADA", modelo.PecaUsada));
                ParametrosEntrada.Add(new SqlParameter("@CMVALOR", modelo.Valor));

                await new BancodeDados().ExecutarProcedure<Manutencao>(
                    "SP_ALTERA_CMANUTENCAO", ParametrosEntrada.ToArray());
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
