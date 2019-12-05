using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_ocupantes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OcupantesController : ControllerBase
    {

        [HttpGet]
        public async Task<Ocupantes> Get(int IdOcupante)
        {
            var retorno = new Ocupantes();

            try
            {

                retorno.ListaOcupantes = await new BancodeDados().ExecutarProcedure<Ocupante>(
                    "SP_SELECIONAR_COCUPANTES",
                    new System.Data.SqlClient.SqlParameter("@COID", IdOcupante));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Ocupante modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@COIDVIAGEM", modelo.IdViagem));

                await new BancodeDados().ExecutarProcedure<Ocupante>(
                    "SP_INCLUIR_COCUPANTES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdOcupante)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@COID", IdOcupante));


                await new BancodeDados().ExecutarProcedure<Ocupante>(
                    "SP_EXCLUIR_COCUPANTES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Ocupante modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@COID", modelo.IdOcupante));
                ParametrosEntrada.Add(new SqlParameter("@COIDVIAGEM", modelo.IdViagem));

                await new BancodeDados().ExecutarProcedure<Ocupante>(
                    "SP_ALTERAR_COCUPANTES", ParametrosEntrada.ToArray());
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
