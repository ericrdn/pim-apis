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
    .get(Services.urlAPITipoVeiculo)
    .then((response) => ({ data: response.data.listaVeiculos }));

const CarregaRegistro = (Dados) => axios
    .get(`${Services.urlAPITipoVeiculo}?IdVeiculo=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaVeiculos[0] }));

const AlterarRegistro = (Dados) => axios.put(Services.urlAPITipoVeiculo, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlAPITipoVeiculo, Dados);

const ExcluirRegistro = (Dados) => axios.delete(`${Services.urlAPITipoVeiculo}?IdVeiculo=${Dados.idVeiculo}`);

const NomeCadastro = 'Tipo Veículo';
const NomeCadastroPlural = 'Tipo Veículo';

const RotaCadastro = '/tipoveiculos';
const RotaInclusao = '/tipoveiculos/incluir';
const RotaAlteracao = '/tipoveiculos/alterar/';

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
