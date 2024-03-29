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
    .get(Services.urlPecas)
    .then((response) => ({ data: response.data.listaPecas }));

const CarregaRegistro = (Dados) => axios
    .get(`${Services.urlPecas}?IdPeca=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaPecas[0] }));

const AlterarRegistro = (Dados) => axios.put(Services.urlPecas, Dados);

const IncluirRegistro = (Dados) => axios.post(Services.urlPecas, Dados);

const ExcluirRegistro = (Dados) => axios.delete(`${Services.urlPecas}?IdPeca=${Dados.idPeca}`);

const NomeCadastro = 'Peça';
const NomeCadastroPlural = 'Peças';

const RotaCadastro = '/pecas';
const RotaInclusao = '/pecas/incluir';
const RotaAlteracao = '/pecas/alterar/';

const PecasController = {
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

export default PecasController;
