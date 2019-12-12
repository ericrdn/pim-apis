import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";
import Services from "../../Services";
// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="idMulta"
        Descricao="Codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
        Chave
      />
      <CampoCadastro
        Nome="placa"
        Descricao="Placa"
        Tamanho={200}
        QuantidadeCaracteres={7}
        Select={[]}
        DadosSelect={() =>
          Services.Veiculos.ConsultarTodos().then(i =>
            i.data.listaCVeiculos.map(item => ({
              Valor: String(item.placa),
              Descricao: `${item.placa} - ${item.marca} - ${item.modelo} - ${item.cor}`
            }))
          )
        }
      />
      <CampoCadastro
        Nome="codigoMulta"
        Descricao="Codigo da Multa"
        Obrigatorio
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="dataHoraInfracao"
        Descricao="Data Hora Infração"
        Tamanho={300}
        Obrigatorio
        TipoCampo="DataHora"
      />
      <CampoCadastro
        Nome="dataHoraRecebimentoInfracao"
        Descricao="Data Hora Recebimento Infração"
        Tamanho={300}
        Obrigatorio
        TipoCampo="DataHora"
      />
      <CampoCadastro
        Nome="local"
        Descricao="Local"
        Tamanho={700}
        Obrigatorio
        ExibeListagem
        QuantidadeCaracteres={200}
      />
      <CampoCadastro
        Nome="pontos"
        Descricao="Pontos"
        Tamanho={160}
        TipoCampo="int"
      />
      <CampoCadastro
        Nome="valor"
        Descricao="Valor"
        Tamanho={160}
        ExibeListagem
        TipoCampo="float"
      />
    </FormularioPadrao>
  );
}
