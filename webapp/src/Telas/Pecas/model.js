import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idPeca"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="descricaoPeca"
        Descricao="Descrição Peça"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="dataUso"
        Descricao="Data Cadastro"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="valorPeca"
        Descricao="Valor"
        Tamanho={160}
        TipoCampo="float"
      />
    </FormularioPadrao>
  );
}
