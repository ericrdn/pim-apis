import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import ModelCliente from './model';
import Services from '../../Services';

const CarregaDados = () => axios.get(Services.urlAPIClientes);

const CarregaRegistro = (Dados) => axios.get(Services.urlAPIClientes);

const AlterarRegistro = (Dados) => axios.put(Services.urlAPIClientes, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlAPIClientes, Dados);

const ExcluirRegistro = (Dados) => axios.delete(`${Services.urlAPIClientes} ${Dados.codigo}`);

const NomeCadastro = 'Cliente';
const NomeCadastroPlural = 'Clientes';

const RotaCadastro = '/clientes';
const RotaInclusao = '/clientes/incluir';
const RotaAlteracao = '/clientes/alterar/';

const ClienteController = {
  Listagem(props) {
    return (
      <ListagemPadrao
        {...props}
        NomeCadastro={NomeCadastro}
        NomeCadastroPlural={NomeCadastroPlural}
        RotaInclusao={RotaInclusao}
        RotaAlteracao={RotaAlteracao}
        CarregaDados={CarregaDados}
        CamposVisiveis={RetornaCamposVisiveis(ModelCliente)}
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
        Modelo={ModelCliente}
      />
    );
  },
};

export default ClienteController;
