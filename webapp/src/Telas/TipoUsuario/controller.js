import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import TipoUsuario from './model';

const CarregaDados = () => axios
    .get('http://localhost:5000/api/Usuarios/')
    .then((response) => ({ data: response.data.listaUsuarios }));

const CarregaRegistro = (Dados) => axios
    .get(`http://localhost:5000/api/Usuarios/?IdUsuario=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaUsuarios[0] }));

const AlterarRegistro = (Dados) => axios.put('http://localhost:5000/api/Usuarios/', Dados);

const IncluirRegistro = (Dados) => axios.post('http://localhost:5000/api/Usuarios/', Dados);

const ExcluirRegistro = (Dados) => axios.delete(
    `http://localhost:5000/api/Usuarios/?IdUsuario=${Dados.idUsuario}`,
  );

const NomeCadastro = 'Tipo Usuário';
const NomeCadastroPlural = 'Tipo Usuário';

const RotaCadastro = '/tipousuario';
const RotaInclusao = '/tipousuario/incluir';
const RotaAlteracao = '/tipousuario/alterar/';

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
