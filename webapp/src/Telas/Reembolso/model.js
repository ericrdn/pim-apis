import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";
import Services from "../../Services";
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
        Nome="tipoReembolso"
        Descricao="Tipo Reembolso"
        Tamanho={160}
        TipoCampo="int"
        Select={[]}
        DadosSelect={() =>
          Services.TipoReembolso.ConsultarTodos().then(i =>
            i.data.listaReembolsos.map(item => ({
              Valor: String(item.idReembolso),
              Descricao: item.desReembolso
            }))
          )
        }
      />

      <CampoCadastro
        Nome="placa"
        Descricao="Motorista"
        Tamanho={500}
        ExibeListagem
        QuantidadeCaracteres={20}
        Select={[]}
        DadosSelect={() =>
          Services.Usuarios.ConsultarTodos().then(i =>
            i.data.listaUsuarios.map(item => ({
              Valor: String(item.idUsuario),
              Descricao: `${String(item.idUsuario)} - ${item.nome}`
            }))
          )
        }
      />
      <CampoCadastro Nome="endereco" Descricao="Endereço" Tamanho={460} />
      <CampoCadastro
        Nome="valor"
        Descricao="Valor"
        Tamanho={160}
        TipoCampo="float"
        ExibeListagem
      />
      <CampoCadastro
        Nome="dataIniCad"
        Descricao="Data Cadastro"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="dataIni"
        Descricao="Data Inicio"
        Tamanho={130}
        
        CampoData
      />
      <CampoCadastro
        Nome="dataFim"
        Descricao="Data Final"
        Tamanho={130}
        
        CampoData
      />
    </FormularioPadrao>
  );
}
