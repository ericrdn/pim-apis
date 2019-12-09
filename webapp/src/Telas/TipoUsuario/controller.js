import React from "react";
import axios from "axios";
import {
  ListagemPadrao,
  RetornaCamposVisiveis
} from "../../Componentes/CadastroPadrao/index";
import CadastroPadrao from "../../Componentes/CadastroPadrao/cadastro";
import TipoUsuario from "./model";
import Services from "../../Services";

const CarregaDados = () =>
  axios
    .get(Services.urlAPITipoUsuarios)
    .then(response => ({ data: response.data.listaUsuarios }));

const CarregaRegistro = Dados =>
  axios.get(`${Services.urlAPITipoUsuarios}?IdUsuario=${Dados.codigo}`);
//.then((resp) => ({ data: resp.data.listaUsuarios[0] }));

const AlterarRegistro = Dados => axios.put(Services.urlAPITipoUsuarios, Dados);

const IncluirRegistro = Dados => axios.post(Services.urlAPITipoUsuarios, Dados);

const ExcluirRegistro = Dados =>
  axios.delete(`${Services.urlAPITipoUsuarios}?IdUsuario=${Dados.idUsuario}`);

const NomeCadastro = "Tipo Usuário";
const NomeCadastroPlural = "Tipo Usuário";

const RotaCadastro = "/tipousuario";
const RotaInclusao = "/tipousuario/incluir";
const RotaAlteracao = "/tipousuario/alterar/";

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
