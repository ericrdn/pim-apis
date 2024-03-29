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
    .get(Services.urlAPITipoReembolso)
    .then(response => ({ data: response.data.listaReembolsos }));

const CarregaRegistro = Dados =>
  axios
    .get(`${Services.urlAPITipoReembolso}?IdReembolso=${Dados.codigo}`)
    .then(resp => ({ data: resp.data.listaReembolsos[0] }));

const AlterarRegistro = Dados => axios.put(Services.urlAPITipoReembolso, Dados);

const IncluirRegistro = Dados =>
  axios.post(Services.urlAPITipoReembolso, Dados);

const ExcluirRegistro = Dados =>
  axios.delete(
    `${Services.urlAPITipoReembolso}?IdReembolso=${Dados.idReembolso}`
  );

const NomeCadastro = "Tipo de Reembolso";
const NomeCadastroPlural = "Tipo de Reembolso";

const RotaCadastro = "/tiporeembolso";
const RotaInclusao = "/tiporeembolso/incluir";
const RotaAlteracao = "/tiporeembolso/alterar/";

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
