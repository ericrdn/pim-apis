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
      <CampoCadastro
        Nome="cgcProp"
        Descricao="CNPJ Dono"
        Tamanho={300}
        CampoCNPJ
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
      <CampoCadastro
        Nome="chassi"
        Descricao="Chassi"
        Obrigatorio
        Tamanho={500}
      />
      <CampoCadastro
        Nome="marca"
        Descricao="Marca"
        Tamanho={300}
        Obrigatorio
        Select={[
          { Valor: "Aston Martin", Descricao: "Aston Martin" },
          { Valor: "Audi", Descricao: "Audi" },
          { Valor: "Bentley", Descricao: "Bentley" },
          { Valor: "BMW", Descricao: "BMW" },
          { Valor: "Chery", Descricao: "Chery" },
          { Valor: "Chevrolet", Descricao: "Chevrolet" },
          { Valor: "Chrysler", Descricao: "Chrysler" },
          { Valor: "Citroën", Descricao: "Citroën" },
          { Valor: "Dodge", Descricao: "Dodge" },
          { Valor: "Ferrari", Descricao: "Ferrari" },
          { Valor: "Fiat", Descricao: "Fiat" },
          { Valor: "Ford", Descricao: "Ford" },
          { Valor: "Honda", Descricao: "Honda" },
          { Valor: "Hyundai", Descricao: "Hyundai" },
          { Valor: "JAC", Descricao: "JAC" },
          { Valor: "Jaguar", Descricao: "Jaguar" },
          { Valor: "Jeep", Descricao: "Jeep" },
          { Valor: "Kia", Descricao: "Kia" },
          { Valor: "Lamborghini", Descricao: "Lamborghini" },
          { Valor: "Land Rover", Descricao: "Land Rover" },
          { Valor: "Lexus", Descricao: "Lexus" },
          { Valor: "Lifan", Descricao: "Lifan" },
          { Valor: "Maserati", Descricao: "Maserati" },
          { Valor: "Mercedes-Benz", Descricao: "Mercedes-Benz" },
          { Valor: "Mini", Descricao: "Mini" },
          { Valor: "Mitsubishi", Descricao: "Mitsubishi" },
          { Valor: "Nissan", Descricao: "Nissan" },
          { Valor: "Peugeot", Descricao: "Peugeot" },
          { Valor: "Porsche", Descricao: "Porsche" },
          { Valor: "Renault", Descricao: "Renault" },
          { Valor: "Smart", Descricao: "Smart" },
          { Valor: "Subaru", Descricao: "Subaru" },
          { Valor: "Suzuki", Descricao: "Suzuki" },
          { Valor: "Toyota", Descricao: "Toyota" },
          { Valor: "Triumph", Descricao: "Triumph" },
          { Valor: "VolksWagen", Descricao: "VolksWagen" },
          { Valor: "Volvo", Descricao: "Volvo" },
          { Valor: "Yamaha", Descricao: "Yamaha" },
        ]}
        // Select={Services.TipoVeiculos.ConsultarTodos.then((i) => i.data.listaVeiculos.map((item) => ({
        //     Valor: item.idVeiculo,
        //     Descricao: item.descricaoTipo,
        //   })),)}
      />      
      <CampoCadastro
        Nome="modelo"
        Descricao="Modelo"
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
        Nome="quilometragem"
        Descricao="Quilometragem"
        Tamanho={160}
        Obrigatorio
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="nomeSeguradora"
        Descricao="Nome Seguradora"
        Tamanho={160}
        Obrigatorio
      />
      <CampoCadastro
        Nome="validadeSeguro"
        Descricao="Validade Seguro"
        Tamanho={300}
        Obrigatorio
        CampoData
      />
    </FormularioPadrao>
  );
}
