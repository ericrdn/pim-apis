using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_propietarios.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropietariosController : ControllerBase
    {

        [HttpGet]
        public async Task<Propietarios> Get(int IdPropietario)
        {
            var retorno = new Propietarios();

            try
            {

                retorno.ListaPropietarios = await new BancodeDados().ExecutarProcedure<Propietario>(
                    "SP_SELECIONAR_CPROPIETARIOS",
                    new System.Data.SqlClient.SqlParameter("@CPID", IdPropietario));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Propietario modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CPCGC", modelo.Cgc));
                ParametrosEntrada.Add(new SqlParameter("@CPNOME", modelo.Nome));

                await new BancodeDados().ExecutarProcedure<Propietario>(
                    "SP_INCLUIR_CPROPIETARIOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdPropietario)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CPID", IdPropietario));


                await new BancodeDados().ExecutarProcedure<Propietario>(
                    "SP_EXCLUIR_CPROPIETARIOS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Propietario modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CPID", modelo.IdPropietario));
                ParametrosEntrada.Add(new SqlParameter("@CPCGC", modelo.Cgc));
                ParametrosEntrada.Add(new SqlParameter("@CPNOME", modelo.Nome));

                await new BancodeDados().ExecutarProcedure<Propietario>(
                    "SP_ALTERAR_CPROPIETARIOS", ParametrosEntrada.ToArray());
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
