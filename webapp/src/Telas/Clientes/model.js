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
        Nome="desReembolso"
        Descricao="Descrição Reembolso"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
    </FormularioPadrao>
  );
}
