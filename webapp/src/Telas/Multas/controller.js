import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import MultaModel from './model';
import Services from '../../Services';

const CarregaDados = () => axios
    .get(Services.urlAPIMultas)
    .then((response) => ({ data: response.data.listaMultas }));

const CarregaRegistro = (Dados) => axios
    .get(`${Services.urlAPIMultas}?IdMulta=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaMultas[0] }));

const AlterarRegistro = (Dados) => axios.put(Services.urlAPIMultas, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlAPIMultas, Dados);

const ExcluirRegistro = (Dados) => {
  console.log(Dados);
  return axios.delete(`${Services.urlAPIMultas}?IdMulta=${Dados.idMulta}`);
};

const NomeCadastro = 'Multa';
const NomeCadastroPlural = 'Multas';

const RotaCadastro = '/multas';
const RotaInclusao = '/multas/incluir';
const RotaAlteracao = '/multas/alterar/';

const MultaController = {
  Listagem(props) {
    return (
      <ListagemPadrao
        {...props}
        NomeCadastro={NomeCadastro}
        NomeCadastroPlural={NomeCadastroPlural}
        RotaInclusao={RotaInclusao}
        RotaAlteracao={RotaAlteracao}
        CarregaDados={CarregaDados}
        CamposVisiveis={RetornaCamposVisiveis(MultaModel)}
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
        Modelo={MultaModel}
      />
    );
  },
};

export default MultaController;
