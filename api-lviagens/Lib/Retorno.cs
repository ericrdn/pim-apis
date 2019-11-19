using System;
using System.ComponentModel;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace Funcoes.API
{
    public enum Status
    {
        [Description("SUCESSO")]
        Sucesso,
        [Description("ERRO")]
        Erro
    }
    public class RetornoAPI
    {
        [JsonIgnore]
        public Status StatusReq { get; set; } = Status.Sucesso;

        public string Resultado => this.StatusReq == API.Status.Sucesso ? "SUCESSO" : "ERRO";
        public string MensagemErro { get; set; }
    }

}