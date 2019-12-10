import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idReembolso"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="tipoReembolso"
        Descricao="Tipo Reembolso"
        Tamanho={160}
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="placa"
        Descricao="Placa"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="endereco"
        Descricao="Endereço"
        Tamanho={160}
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="valor"
        Descricao="Valor"
        Tamanho={160}
        TipoCampo="float"
        ExibeListagem
      />
      <CampoCadastro
        Nome="dataIniCad"
        Descricao="Data Cadastro"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="dataIni"
        Descricao="Data Inicio"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="dataFim"
        Descricao="Data Final"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
    </FormularioPadrao>
  );
}
