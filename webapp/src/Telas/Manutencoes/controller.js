import React from "react";
import axios from "axios";
import {
  ListagemPadrao,
  RetornaCamposVisiveis
} from "../../Componentes/CadastroPadrao/index";
import CadastroPadrao from "../../Componentes/CadastroPadrao/cadastro";
import VeiculoModel from "./model";
import Services from "../../Services";

const CarregaDados = () =>
  axios
    .get(Services.urlAPIManutencoes)
    .then(response => ({ data: response.data.listaManutencoes }));

const CarregaRegistro = Dados =>
  axios
    .get(`${Services.urlAPIManutencoes}?IdManutencao=${Dados.codigo}`)
    .then(resp => ({ data: resp.data.listaManutencoes[0] }));

const AlterarRegistro = Dados => axios.put(Services.urlAPIManutencoes, Dados);

const IncluirRegistro = Dados => axios.post(Services.urlAPIManutencoes, Dados);

const ExcluirRegistro = Dados =>
  axios.delete(
    `${Services.urlAPIManutencoes}?IdManutencao=${Dados.idManutencao}`
  );

const NomeCadastro = "Manutenção";
const NomeCadastroPlural = "Manutenções";

const RotaCadastro = "/manutencoes";
const RotaInclusao = "/manutencoes/incluir";
const RotaAlteracao = "/manutencoes/alterar/";

const VeiculoController = {
  Listagem(props) {
    return (
      <ListagemPadrao
        {...props}
        NomeCadastro={NomeCadastro}
        NomeCadastroPlural={NomeCadastroPlural}
        RotaInclusao={RotaInclusao}
        RotaAlteracao={RotaAlteracao}
        CarregaDados={CarregaDados}
        CamposVisiveis={RetornaCamposVisiveis(VeiculoModel)}
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
        Modelo={VeiculoModel}
      />
    );
  }
};

export default VeiculoController;
