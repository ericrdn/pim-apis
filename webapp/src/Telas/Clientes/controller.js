import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import ModelCliente from './model';

const CarregaDados = () => axios.get('http://localhost:5000/clientes');

const CarregaRegistro = (Dados) => axios.get(`http://localhost:5000/clientes/${Dados}`);

const AlterarRegistro = (Dados) => axios.put('http://localhost:5000/clientes', Dados);

const IncluirRegistro = (Dados) => axios.post('http://localhost:5000/clientes', Dados);

const ExcluirRegistro = (Dados) => axios.delete(`http://localhost:5000/clientes/${Dados.codigo}`);

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
