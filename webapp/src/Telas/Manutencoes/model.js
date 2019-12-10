import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idManutencao"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="placaVeiculo"
        Descricao="Placa do Veiculo"
        Tamanho={300}
        ExibeListagem
      />
      <CampoCadastro
        Nome="descricao"
        Descricao="Descrição"
        Tamanho={800}
        ExibeListagem
      />
    </FormularioPadrao>
  );
}
