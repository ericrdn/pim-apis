using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_ctelefones;

namespace api_ctelefones.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CTelefonesController : ControllerBase
    {

        [HttpGet]
        public async Task<CTelefones> Get(int IdTelefone)
        {
            var retorno = new CTelefones();

            try
            {

                retorno.ListaCTelefones = await new BancodeDados().ExecutarProcedure<CTelefone>(
                    "SP_SELECIONAR_CTELEFONES",
                    new System.Data.SqlClient.SqlParameter("@CTID", IdTelefone));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(CTelefone modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CTCNPJCPF", modelo.Cnpjcpf));
                ParametrosEntrada.Add(new SqlParameter("@CTDD", modelo.DD));
                ParametrosEntrada.Add(new SqlParameter("@CTNUMERO", modelo.Numero));
                ParametrosEntrada.Add(new SqlParameter("@CTTIPO", modelo.Tipo));
                ParametrosEntrada.Add(new SqlParameter("@CTOPERADORA", modelo.Operadora));

                await new BancodeDados().ExecutarProcedure<CTelefone>(
                    "SP_INCLUIR_CTELEFONES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdTelefone)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@CTID", IdTelefone));


                await new BancodeDados().ExecutarProcedure<CTelefone>(
                    "SP_EXCLUIR_CTELEFONES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(CTelefone modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@CTCNPJCPF", modelo.Cnpjcpf));
                ParametrosEntrada.Add(new SqlParameter("@CTDD", modelo.DD));
                ParametrosEntrada.Add(new SqlParameter("@CTNUMERO", modelo.Numero));
                ParametrosEntrada.Add(new SqlParameter("@CTTIPO", modelo.Tipo));
                ParametrosEntrada.Add(new SqlParameter("@CTOPERADORA", modelo.Operadora));
                ParametrosEntrada.Add(new SqlParameter("@CTID", modelo.IdTelefone));


                await new BancodeDados().ExecutarProcedure<CTelefones>(
                    "SP_ALTERAR_CTELEFONES", ParametrosEntrada.ToArray());
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
