import React from 'react';
import { CampoCadastro, FormularioPadrao } from '../../Componentes/Formulario';

// import { Container } from './styles';

export default function ModeloCliente(props) {
  return (
    <FormularioPadrao {...props}>
      <CampoCadastro
        Nome="codigo"
        Descricao="codigo"
        Tamanho={100}
        ExibeListagem
        AutoIncremento
      />
      <CampoCadastro
        Nome="CNPJ"
        Descricao="CNPJ"
        Obrigatorio
        ExibeListagem
        CampoCNPJ
      />
      <CampoCadastro
        Nome="Nome"
        Descricao="Nome"
        Tamanho={500}
        Obrigatorio
        ExibeListagem
      />
      <CampoCadastro
        Nome="RazaoSocial"
        Descricao="Razão Social"
        Tamanho={500}
        Obrigatorio
        CampoCPF
      />
      <CampoCadastro
        Nome="DataCadastro"
        Descricao="Data Cadastro"
        Tamanho={130}
        Obrigatorio
        CampoData
      />
      <CampoCadastro
        Nome="InscricaoEstadual"
        Descricao="Inscrição Estadual"
        Obrigatorio
        Tamanho={160}
      />
      <CampoCadastro Nome="Telefone" Descricao="Telefone" Tamanho={160} />
      <CampoCadastro Nome="Celular" Descricao="Celular" Tamanho={160} />
      <CampoCadastro
        Nome="ResponsavelEmpresa"
        Descricao="Responsável Empresa"
        Tamanho={500}
      />
      <CampoCadastro
        Nome="TelefoneResponsavel"
        Descricao="Telefone Responsável"
        Tamanho={180}
      />
      <CampoCadastro
        Nome="CelularResponsavel"
        Descricao="Celular Responsável"
        Tamanho={180}
      />
    </FormularioPadrao>
  );
}
