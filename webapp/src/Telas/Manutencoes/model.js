import React from "react";
import { CampoCadastro, FormularioPadrao } from "../../Componentes/Formulario";
import Services from "../../Services";
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
        Nome="descricao"
        Descricao="Descrição"
        Tamanho={800}
        ExibeListagem
      />
      <CampoCadastro
        Nome="tipoManutencao"
        Descricao="Tipo Manutenção"
        Tamanho={300}
        Select={[
          { Valor: "Corretiva", Descricao: "Corretiva" },
          { Valor: "Preventiva", Descricao: "Preventiva" }
        ]}
      />
      <CampoCadastro Nome="pecaUsada" Descricao="Mecânico" Tamanho={300} />
      <CampoCadastro
        Nome="valor"
        Descricao="Valor"
        Tamanho={160}
        TipoCampo="float"
      />
    </FormularioPadrao>
  );
}
