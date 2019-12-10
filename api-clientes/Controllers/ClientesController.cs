using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;

namespace api_clientes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        [Route("DadosHome")]
        [HttpGet]
        public async Task<DadosHome> DadosHome()
        {
            var retorno = new DadosHome();

            try
            {
                retorno = (await new BancodeDados().ExecutarProcedure<DadosHome>(
                    "RETORNA_DADOS_HOME"))[0];
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpGet]
        public async Task<Clientes> Get(int IdCliente)
        {
            var retorno = new Clientes();

            try
            {

                retorno.ListaClientes = await new BancodeDados().ExecutarProcedure<Cliente>(
                    "SP_SELECIONAR_CCLIENTES",
                    new System.Data.SqlClient.SqlParameter("@COID", IdCliente));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(Cliente modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@COCPF", modelo.Cpf));
                ParametrosEntrada.Add(new SqlParameter("@CONOMECLI", modelo.NomeCliente));

                await new BancodeDados().ExecutarProcedure<Cliente>(
                    "SP_INCLUIR_CCLIENTES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdCliente)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@COID", IdCliente));


                await new BancodeDados().ExecutarProcedure<Cliente>(
                    "SP_EXCLUIR_CCLIENTES", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(Cliente modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@COID", modelo.IdCliente));
                ParametrosEntrada.Add(new SqlParameter("@COCPF", modelo.Cpf));
                ParametrosEntrada.Add(new SqlParameter("@CONOMECLI", modelo.NomeCliente));

                await new BancodeDados().ExecutarProcedure<Cliente>(
                    "SP_ALTERAR_CCLIENTES", ParametrosEntrada.ToArray());
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
