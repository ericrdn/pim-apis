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
        Nome="nome"
        Descricao="Nome"
        Tamanho={700}
        Obrigatorio
        ExibeListagem
        QuantidadeCaracteres={50}
      />
      <CampoCadastro
        Nome="tpUsuario"
        Descricao="Tipo Usuário"
        Tamanho={300}
        Obrigatorio
        TipoCampo="int"
        Select={[
          { Valor: "1", Descricao: "Adiminstrativo" },
          { Valor: "2", Descricao: "Motorista" },
          { Valor: "3", Descricao: "Manutenção" }
        ]}
        // Select={Services.TipoVeiculos.ConsultarTodos.then((i) => i.data.listaVeiculos.map((item) => ({
        //     Valor: item.idVeiculo,
        //     Descricao: item.descricaoTipo,
        //   })),)}
      />
      <CampoCadastro
        Nome="cnpjCpf"
        Descricao="CPF"
        Obrigatorio
        Tamanho={300}
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="cnh"
        Descricao=" CNH"
        Obrigatorio
        Tamanho={200}
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="rg"
        Descricao="RG"
        Tamanho={200}
        Obrigatorio
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="idEndereco"
        Descricao="Endereço"
        Tamanho={160}
        Obrigatorio
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="carteiraTrabalho"
        Descricao="Carteira de Trabalho"
        Obrigatorio
        Tamanho={180}
      />
      <CampoCadastro
        Nome="dataValidadeCnh"
        Descricao="Validade CNH"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="dataUltimoExameMedico"
        Descricao="Data Exame Médicos"
        Tamanho={230}
        Obrigatorio
        CampoData
      />
    </FormularioPadrao>
  );
}
