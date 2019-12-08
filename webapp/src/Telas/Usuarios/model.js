import React from 'react';
import { CampoCadastro, FormularioPadrao } from '../../Componentes/Formulario';

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idUsuario"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="nome"
        Descricao="Nome"
        Tamanho={700}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="cnpjCpf"
        Descricao="CPF"
        Tamanho={300}
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="Cnh"
        Descricao=" CNH"
        Tamanho={200}
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="rg"
        Descricao="RG"
        Tamanho={200}
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="tpUsuario"
        Descricao="Tipo Usuário"
        Tamanho={160}
        ExibeListagem
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="idEndereco"
        Descricao="Endereço"
        Tamanho={160}
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="carteiraTrabalho"
        Descricao="Carteira de Trabalho"
        Tamanho={160}
      />
    </FormularioPadrao>
  );
}
