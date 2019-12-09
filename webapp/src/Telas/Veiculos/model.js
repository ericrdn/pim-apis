import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";
import Services from "../../Services";

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="placa"
        Descricao="Placa"
        Tamanho={200}
        QuantidadeCaracteres={7}
        ExibeListagem
        Obrigatorio
        Chave
      />
      <CampoCadastro Nome="cgcProp" Descricao="CNPJ Dono" Tamanho={300} />
      <CampoCadastro
        Nome="chassi"
        Descricao="Chassi"
        Obrigatorio
        Tamanho={500}
      />
      <CampoCadastro
        Nome="modelo"
        Descricao="Modelo"
        Tamanho={300}
        Obrigatorio
        ExibeListagem
      />
      <CampoCadastro
        Nome="marca"
        Descricao="Marca"
        Tamanho={300}
        Obrigatorio
        ExibeListagem
      />
      <CampoCadastro
        Nome="cor"
        Descricao="Cor"
        Tamanho={300}
        Obrigatorio
        ExibeListagem
      />
      <CampoCadastro
        Nome="ano"
        Descricao="Ano"
        Tamanho={300}
        Obrigatorio
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="tipoVeic"
        Descricao="Tipo Veículo"
        Tamanho={300}
        Obrigatorio
        TipoCampo="int"
        Select={[{ Valor: "10", Descricao: "Carro" }]}
        //Select={Services.TipoVeiculos.ConsultarTodos}
        ExibeListagem
      />
    </FormularioPadrao>
  );
}
