import React from 'react';
import { CampoCadastro, FormularioPadrao } from '../../Componentes/Formulario';

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idEstoquePeca"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="idPeca"
        Descricao="ID Peça"
        Tamanho={160}
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="placaVeiculo"
        Descricao="Placa Veículo"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="descricao"
        Descricao="Descricao Uso"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="idManutencao"
        Descricao="ID Manutenção"
        Tamanho={160}
        TipoCampo="int"
      />
    </FormularioPadrao>
  );
}
