import React from 'react';
import { CampoCadastro, FormularioPadrao } from '../../Componentes/Formulario';

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
        Tamanho={500}
        QuantidadeCaracteres={7}
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
        ExibeListagem
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
        TipoCampo="float"
      />
    </FormularioPadrao>
  );
}
