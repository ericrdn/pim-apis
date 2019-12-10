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
        Select={[
          { Valor: "1", Descricao: "Carro" },
          { Valor: "2", Descricao: "Minivan" },
          { Valor: "3", Descricao: "Van" },
          { Valor: "4", Descricao: "Carro Eletrico" }
        ]}
        // Select={Services.TipoVeiculos.ConsultarTodos.then((i) => i.data.listaVeiculos.map((item) => ({
        //     Valor: item.idVeiculo,
        //     Descricao: item.descricaoTipo,
        //   })),)}
      />
    </FormularioPadrao>
  );
}
