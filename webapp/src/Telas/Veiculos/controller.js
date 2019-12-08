import React from 'react';
import axios from 'axios';
import {
  ListagemPadrao,
  RetornaCamposVisiveis,
} from '../../Componentes/CadastroPadrao/index';
import CadastroPadrao from '../../Componentes/CadastroPadrao/cadastro';
import VeiculoModel from './model';

const CarregaDados = () => axios
    .get('http://localhost:5000/api/cveiculos/')
    .then((response) => ({ data: response.data.listaCVeiculos }));

const CarregaRegistro = (Dados) => axios
    .get(`http://localhost:5000/api/cveiculos/?Placa=${Dados.codigo}`)
    .then((resp) => ({ data: resp.data.listaCVeiculos[0] }));

const AlterarRegistro = (Dados) => axios.put('http://localhost:5000/api/cveiculos/', Dados);

const IncluirRegistro = (Dados) => axios.post('http://localhost:5000/api/cveiculos/', Dados);

const ExcluirRegistro = (Dados) => axios.delete(`http://localhost:5000/api/cveiculos/?Placa=${Dados.placa}`);

const NomeCadastro = 'Veiculo';
const NomeCadastroPlural = 'Veiculos';

const RotaCadastro = '/veiculos';
const RotaInclusao = '/veiculos/incluir';
const RotaAlteracao = '/veiculos/alterar/';

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
  },
};

export default VeiculoController;
