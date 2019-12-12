import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idCliente"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="cpf"
        Descricao="CNPJ"
        Tamanho={300}
        ExibeListagem
        QuantidadeCaracteres={20}
        CampoCNPJ
      />
      <CampoCadastro
        Nome="nomeCliente"
        Descricao="Nome Cliente"
        Tamanho={300}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
    </FormularioPadrao>
  );
}
