import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";

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
        Nome="descricao"
        Descricao="Descricao"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="camposObrigatorios"
        Descricao="Informações Obrigatórias"
        Tamanho={500}
        QuantidadeCaracteres={20}
      />
    </FormularioPadrao>
  );
}
