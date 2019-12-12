import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";
import Services from "../../Services";
// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idEstoquePeca"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="idPeca"
        Descricao="Peça"
        Tamanho={160}
        TipoCampo="int"
        Select={[]}
        DadosSelect={() =>
          Services.Pecas.ConsultarTodos().then(i =>
            i.data.listaPecas.map(item => ({
              Valor: String(item.idPeca),
              Descricao: item.descricaoPeca
            }))
          )
        }
      />
      <CampoCadastro
        Nome="placaVeiculo"
        Descricao="Placa Veículo"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="descricao"
        Descricao="Descricao Uso"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
      />
      <CampoCadastro
        Nome="idManutencao"
        Descricao="Manutenção"
        Tamanho={160}
        TipoCampo="int"
        Select={[]}
        DadosSelect={() =>
          Services.Manutencoes.ConsultarTodos().then(i =>
            i.data.listaManutencoes.map(item => ({
              Valor: String(item.idManutencao),
              Descricao: item.descricao
            }))
          )
        }
      />
    </FormularioPadrao>
  );
}
