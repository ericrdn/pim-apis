using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_veiculos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoVeiculosController : ControllerBase
    {

        [HttpGet]
        public async Task<Veiculos> Get(int IdVeiculo)
        {
            var retorno = new Veiculos();

            try
            {

                retorno.ListaVeiculos = await new BancodeDados().ExecutarProcedure<Veiculo>(
                    "SP_SELECIONAR_TVEICULOS",
                    new System.Data.SqlClient.SqlParameter("@TVID", IdVeiculo));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Veiculo modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TVDESCRICAOTIPO", modelo.DescricaoTipo));

                await new BancodeDados().ExecutarProcedure<Veiculo>(
                    "SP_INCLUIR_TVEICULOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdVeiculo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@TVID", IdVeiculo));


                await new BancodeDados().ExecutarProcedure<Veiculo>(
                    "SP_EXCLUIR_TVEICULOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Veiculo modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@TVID", modelo.IdVeiculo));
                ParametrosEntrada.Add(new SqlParameter("@TVDESCRICAOTIPO", modelo.DescricaoTipo));

                await new BancodeDados().ExecutarProcedure<Veiculo>(
                    "SP_ALTERAR_TVEICULOS", ParametrosEntrada.ToArray());
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
