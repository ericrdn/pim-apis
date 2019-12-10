import React from "react";
import axios from "axios";
import {
  ListagemPadrao,
  RetornaCamposVisiveis
} from "../../Componentes/CadastroPadrao/index";
import CadastroPadrao from "../../Componentes/CadastroPadrao/cadastro";
import TipoUsuario from "./model";
import Services from "../../Services/";

const CarregaDados = () =>
  axios
    .get(Services.urlAPIClientes)
    .then(response => ({ data: response.data.listaClientes }));

const CarregaRegistro = Dados =>
  axios
    .get(`${Services.urlAPIClientes}?IdCliente=${Dados.codigo}`)
    .then(resp => ({ data: resp.data.listaClientes[0] }));

const AlterarRegistro = Dados => axios.put(Services.urlAPIClientes, Dados);

const IncluirRegistro = Dados => axios.post(Services.urlAPIClientes, Dados);

const ExcluirRegistro = Dados =>
  axios.delete(`${Services.urlAPIClientes}?IdCliente=${Dados.idCliente}`);

const NomeCadastro = "Cliente";
const NomeCadastroPlural = "Clientes";

const RotaCadastro = "/clientes";
const RotaInclusao = "/clientes/incluir";
const RotaAlteracao = "/clientes/alterar/";

const TipoUsuarioController = {
  Listagem(props) {
    return (
      <ListagemPadrao
        {...props}
        NomeCadastro={NomeCadastro}
        NomeCadastroPlural={NomeCadastroPlural}
        RotaInclusao={RotaInclusao}
        RotaAlteracao={RotaAlteracao}
        CarregaDados={CarregaDados}
        CamposVisiveis={RetornaCamposVisiveis(TipoUsuario)}
        ExcluirRegistro={ExcluirRegistro}
      />
    );
  },
  Cadastro(props) {
    return (
      <CadastroPadrao
        {...props}
        NomeCadastro={NomeCadastro}
        NomeCadastroPlural={NomeCadastroPlural}
        CarregaRegistro={CarregaRegistro}
        AlteraRegistro={AlterarRegistro}
        IncluirRegistro={IncluirRegistro}
        RotaCadastro={RotaCadastro}
        Modelo={TipoUsuario}
      />
    );
  }
};

export default TipoUsuarioController;
