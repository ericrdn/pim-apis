import axios from "axios";

const UrlBase = "http://pim2019.ddns.net:15001/";

//const UrlBase = "http://localhost:5000/";

const ParametrizacaoURL = {
  urlAPIClientes: `${UrlBase}api/clientes/`,
  urlAPIMultas: `${UrlBase}api/multas/`,
  urlAPICadastroVeiculos: `${UrlBase}api/veiculos/`,
  urlAPITipoUsuarios: `${UrlBase}api/tipousuario/`,
  urlAPIUsuarios: `${UrlBase}api/usuarios/`,
  urlAPIManutencoes: `${UrlBase}api/manutencoes/`,
  urlAPITipoVeiculo: `${UrlBase}api/tipoveiculos/`,
  urlPecas: `${UrlBase}api/pecas/`,
  urlAPITipoReembolso: `${UrlBase}api/tiporeembolso/`,
  urlAPIReembolso: `${UrlBase}api/reembolsos/`,
  urlAPIEstoquePecas: `${UrlBase}api/estoquepecas/`
};

export default {
  ...ParametrizacaoURL,

  TipoVeiculos: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPITipoVeiculo)
  },

  Clientes: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPIClientes)
  },

  Usuarios: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPIUsuarios)
  },

  TipoUsuarios: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPITipoUsuarios)
  },


  
  Veiculos: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPICadastroVeiculos)
  },

  Pecas: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlPecas)
  },

  Manutencoes: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPIManutencoes)
  },
  TipoReembolso: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPITipoReembolso)
  },

  Usuarios: {
    ConsultarTodos: () => axios.get(ParametrizacaoURL.urlAPIUsuarios)
  },  

  DadosGerais: {
    ConsultarDadosHome: () =>
      axios.get(`${ParametrizacaoURL.urlAPIClientes}DadosHome`)
  }
};
