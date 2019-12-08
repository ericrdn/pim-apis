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
    .get(Services.urlAPIReembolso)
    .then((response) => ({ data: response.data.listaCReembolsos }));

const CarregaRegistro = (Dados) => axios
    .get(`${Services.urlAPIReembolso}?IdReembolso=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaCReembolsos[0] }));

const AlterarRegistro = (Dados) => axios.put(Services.urlAPIReembolso, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlAPIReembolso, Dados);

const ExcluirRegistro = (Dados) => axios.delete(`${Services.urlAPIReembolso}?IdReembolso=${Dados.idReembolso}`);

const NomeCadastro = 'Reembolso';
const NomeCadastroPlural = 'Reembolsoo';

const RotaCadastro = '/reembolso';
const RotaInclusao = '/reembolso/incluir';
const RotaAlteracao = '/reembolso/alterar/';

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
