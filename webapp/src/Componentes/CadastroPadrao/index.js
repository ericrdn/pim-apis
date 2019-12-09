import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { CircularProgress } from '@material-ui/core';
import SnackBar from '../SnackBar';
import AlertDialog from '../Dialog';

import Tabela from '../Tabela';
import Botao from '../Botao';

export function ListagemPadrao(props) {
  const [Carregando, setCarregando] = React.useState(false);

  const DadosAlertaInicial = {
    Aberto: false,
    Mensagem: '',
    Titulo: '',
  };

  const [Alerta, setAlerta] = React.useState(DadosAlertaInicial);

  function AbrirAlerta(Titulo, Mensagem, EventoOk, Confirmacao) {
    setAlerta({
      Aberto: true,
      Mensagem,
      Titulo,
      EventoOk,
      Confirmacao,
    });
  }

  function fecharAlerta() {
    setAlerta(DadosAlertaInicial);
  }

  const [DadosCadastro, setDadosCadastro] = React.useState([]);
  const {
    NomeCadastro,
    NomeCadastroPlural,
    RotaInclusao,
    RotaAlteracao,
    CarregaDados,
    CamposVisiveis,
    ExcluirRegistro,
  } = props;

  const CarregarDadosListagem = () => {
    setCarregando(true);
    CarregaDados()
      .then((response) => {
        setCarregando(false);
        if (response.data) setDadosCadastro(response.data);
        else {
          AbrirAlerta('Erro ao consultar lista', JSON.stringify(response.data));
        }
      })
      .catch((err) => {
        setCarregando(false);
        AbrirAlerta('Erro ao consultar lista', JSON.stringify(err));
      });
  };

  React.useEffect(CarregarDadosListagem, []);

  const CampoChave = CamposVisiveis.find((item) => item.Chave).Nome;

  function ConverteItemTabela(item) {
    const retorno = {};
    CamposVisiveis.forEach((element) => {
      retorno[element.Nome] = item[element.Nome];
    });

    return retorno;
  }

  return (
    <>
      <Botao to={RotaInclusao}>{`Novo ${NomeCadastro}`}</Botao>
      {props.location.state ? (
        <SnackBar
          Mensagem={props.location.state.MsgSnackBar}
          Abrir={props.location.state.SnackBar}
        />
      ) : null}
      <AlertDialog
        open={Alerta.Aberto}
        handleClose={fecharAlerta}
        Mensagem={Alerta.Mensagem}
        Titulo={Alerta.Titulo}
        Botoes={
          Alerta.Confirmacao
            ? [{ Texto: 'Sim', Evento: Alerta.EventoOk }, { Texto: 'Não' }]
            : undefined
        }
      />
      {Carregando ? (
        <>
          <br />
          <br />
          <br />
          <CircularProgress
            size={24}
            style={{ width: 50, height: 50, marginTop: 30 }}
          />
        </>
      ) : DadosCadastro.length > 0 ? (
        <Tabela
          Titulo={`${NomeCadastroPlural} Cadastrados`}
          Dados={DadosCadastro.map(ConverteItemTabela)}
          SelecionarItens={false}
          Comprimido
          Acoes={[
            {
              Icone: <EditIcon />,
              Texto: 'Editar',
              to: (item) => `${RotaAlteracao}${item[CampoChave]}`,
            },
            {
              Icone: <DeleteIcon />,
              Texto: 'Excluir',
              Acao: (item) => AbrirAlerta(
                  'Deseja excluir?',
                  'Excluir o registro?',
                  async () => {
                    await ExcluirRegistro(item);
                    CarregarDadosListagem();
                  },
                  true,
                ),
            },
          ]}
        />
      ) : (
        <>
          <br />
          <br />
          <br />
          <i>Não existem registros</i>
        </>
      )}
    </>
  );
}

export function RetornaCamposVisiveis(Model) {
  const ModeloCliente = Model().props.children.map((campo) => campo.props);
  return ModeloCliente.filter((item) => !!item.ExibeListagem);
}
