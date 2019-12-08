using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_cveiculos;

namespace api_cveiculos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeiculosController : ControllerBase
    {

        [HttpGet]
        public async Task<CVeiculos> Get(string Placa)
        {
            var retorno = new CVeiculos();

            try
            {

                retorno.ListaCVeiculos = await new BancodeDados().ExecutarProcedure<CVeiculo>(
                    "SP_SELECIONA_CVEICULOS",
                    new System.Data.SqlClient.SqlParameter("@CVPLACA", Placa));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(CVeiculo modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CVCGC_PROPIETARIO", modelo.CGCProp));
                ParametrosEntrada.Add(new SqlParameter("@CVPLACA", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@CVCHASSI", modelo.Chassi));
                ParametrosEntrada.Add(new SqlParameter("@CVMODELO", modelo.Modelo));
                ParametrosEntrada.Add(new SqlParameter("@CVMARCAR", modelo.Marca));
                ParametrosEntrada.Add(new SqlParameter("@CVCOR", modelo.Cor));
                ParametrosEntrada.Add(new SqlParameter("@CVANO", modelo.Ano));
                ParametrosEntrada.Add(new SqlParameter("@CVTIPOVEICULO", modelo.TipoVeic));

                await new BancodeDados().ExecutarProcedure<CVeiculo>(
                    "SP_INCLUIR_CVEICULOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(string Placa)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CVPLACA", Placa));


                await new BancodeDados().ExecutarProcedure<CVeiculo>(
                    "SP_EXCLUIR_CVEICULOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(CVeiculo modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CVCGC_PROPIETARIO", modelo.CGCProp));
                ParametrosEntrada.Add(new SqlParameter("@CVPLACA", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@CVCHASSI", modelo.Chassi));
                ParametrosEntrada.Add(new SqlParameter("@CVMODELO", modelo.Modelo));
                ParametrosEntrada.Add(new SqlParameter("@CVMARCAR", modelo.Marca));
                ParametrosEntrada.Add(new SqlParameter("@CVCOR", modelo.Cor));
                ParametrosEntrada.Add(new SqlParameter("@CVANO", modelo.Ano));
                ParametrosEntrada.Add(new SqlParameter("@CVTIPOVEICULO", modelo.TipoVeic));

                await new BancodeDados().ExecutarProcedure<CVeiculo>(
                    "SP_ALTERA_CVEICULOS", ParametrosEntrada.ToArray());
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
