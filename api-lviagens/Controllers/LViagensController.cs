using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Funcoes.BancodeDados;
using Funcoes.API;
using System.Data.SqlClient;
using api_lviagens;

namespace api_lviagens.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LViagensController : ControllerBase
    {

        [HttpGet]
        public async Task<LViagens> Get(int IdViagem)
        {
            var retorno = new LViagens();

            try
            {

                retorno.ListaLViagens = await new BancodeDados().ExecutarProcedure<LViagem>(
                    "SP_SELECIONA_LVIAGENS",
                    new System.Data.SqlClient.SqlParameter("@LVID", IdViagem));
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPost]
        public async Task<RetornoAPI> Post(LViagem modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRCAD", modelo.DataCad));
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRINICIO", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRFINAL", modelo.DataFim));
                ParametrosEntrada.Add(new SqlParameter("@LVPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@LVIDENDERECOORIGEM", modelo.EndOri));
                ParametrosEntrada.Add(new SqlParameter("@LVIDENDERECODESTINO", modelo.EndDes));
                ParametrosEntrada.Add(new SqlParameter("@LVPREVISAOKM", modelo.PreKM));

                await new BancodeDados().ExecutarProcedure<LViagem>(
                    "SP_INCLUIR_LVIAGENS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpDelete]
        public async Task<RetornoAPI> Delete(int IdViagem)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();
                ParametrosEntrada.Add(new SqlParameter("@LVID", IdViagem));


                await new BancodeDados().ExecutarProcedure<LViagem>(
                    "SP_EXCLUIR_LVIAGENS", ParametrosEntrada.ToArray());
            }
            catch (Exception E)
            {
                retorno.StatusReq = Status.Erro;
                retorno.MensagemErro = E.Message;
            }

            return retorno;
        }

        [HttpPut]
        public async Task<RetornoAPI> Put(LViagem modelo)
        {
            var retorno = new RetornoAPI();
            try
            {
                List<SqlParameter> ParametrosEntrada = new List<SqlParameter>();

                ParametrosEntrada.Add(new SqlParameter("@LVID", modelo.IdViagem));
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRCAD", modelo.DataCad));
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRINICIO", modelo.DataIni));
                ParametrosEntrada.Add(new SqlParameter("@LVDTHRFINAL", modelo.DataFim));
                ParametrosEntrada.Add(new SqlParameter("@LVPLACAVEICULO", modelo.Placa));
                ParametrosEntrada.Add(new SqlParameter("@LVIDENDERECOORIGEM", modelo.EndOri));
                ParametrosEntrada.Add(new SqlParameter("@LVIDENDERECODESTINO", modelo.EndDes));
                ParametrosEntrada.Add(new SqlParameter("@LVPREVISAOKM", modelo.PreKM));

                await new BancodeDados().ExecutarProcedure<LViagem>(
                    "SP_ALTERA_LVIAGENS ", ParametrosEntrada.ToArray());
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
