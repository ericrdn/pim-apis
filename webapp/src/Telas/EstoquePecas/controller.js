import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import TipoUsuario from './model';
import Services from '../../Services/';

const CarregaDados = () => axios
    .get(Services.urlAPIEstoquePecas)
    .then((response) => ({ data: response.data.listaEstoquePeca }));

const CarregaRegistro = (Dados) => axios
    .get(`${Services.urlAPIEstoquePecas}?IdEstoquePeca=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaEstoquePeca[0] }));

const AlterarRegistro = (Dados) => axios.put(Services.urlAPIEstoquePecas, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlAPIEstoquePecas, Dados);

const ExcluirRegistro = (Dados) => axios.delete(
    `${Services.urlAPIEstoquePecas}?IdEstoquePeca=${Dados.idEstoquePeca}`,
  );

const NomeCadastro = 'Estoque Peça';
const NomeCadastroPlural = 'Estoque Peças';

const RotaCadastro = '/estoquepecas';
const RotaInclusao = '/estoquepecas/incluir';
const RotaAlteracao = '/estoquepecas/alterar/';

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
  },
};

export default TipoUsuarioController;
