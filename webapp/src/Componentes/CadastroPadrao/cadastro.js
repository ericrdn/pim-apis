import React from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import AlertDialog from '../Dialog';

export default function Dados(props) {
  const [Carregando, setCarregando] = React.useState(false);

  const {
    match,
    CarregaRegistro,
    AlteraRegistro,
    IncluirRegistro,
    NomeCadastro,
    // NomeCadastroPlural,
    RotaCadastro,
    Modelo,
  } = props;
  const Inclusao = Object.entries(match.params).length === 0;
  const [DadosCadastro, setDadosCadastro] = React.useState({});
  const history = useHistory();
  React.useEffect(() => {
    if (!Inclusao) {
      setCarregando(true);
      CarregaRegistro(match.params)
        .then(async (response) => {
          setCarregando(false);

          let Dados = response.data;

          if (Dados.resultado === 'ERRO') throw Dados.mensagemErro;

          if (Dados) {
            const DadosRecebidos = Object.entries(Dados);
            if (DadosRecebidos.length > 0) {
              const DadosRetorno = DadosRecebidos[0][1];
              if (DadosRetorno.length > 0) {
                Dados = DadosRetorno[0];
              }
            }
          }

          setDadosCadastro(Dados);
        })
        .catch((err) => AbrirAlerta(
            'Erro ao carregar registro',
            `Houve um erro ao carregar o registro:\n${JSON.stringify(err)}`,
          ),);
    }
  }, [CarregaRegistro, match.params, Inclusao]);

  function eventoGravarDadosAPI(Dados) {
    const MetodoEnvio = Inclusao ? IncluirRegistro : AlteraRegistro;
    MetodoEnvio(Dados)
      .then((response) => {
        history.push(RotaCadastro, {
          MsgSnackBar: `${NomeCadastro} ${Inclusao ? 'Incluído' : 'Alterado'}!`,
          SnackBar: true,
        });
      })
      .catch((err) => AbrirAlerta(
          'Erro ao gravar',
          `Houve um erro ao gravar o registro:\n${JSON.stringify(Dados)}`,
        ),);
  }

  const DadosAlertaInicial = {
    Aberto: false,
    Mensagem: '',
    Titulo: '',
  };

  const [Alerta, setAlerta] = React.useState(DadosAlertaInicial);

  function AbrirAlerta(Titulo, Mensagem) {
    setAlerta({
      Aberto: true,
      Mensagem,
      Titulo,
    });
  }

  function fecharAlerta() {
    setAlerta(DadosAlertaInicial);
  }

  return (
    <>
      {Carregando ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={24} style={{ width: 50, height: 50 }} />
        </div>
      ) : (
        <div>
          <AlertDialog
            open={Alerta.Aberto}
            handleClose={fecharAlerta}
            Mensagem={Alerta.Mensagem}
            Titulo={Alerta.Titulo}
          />
          <h1>{`${Inclusao ? 'Inclusão' : 'Alteração'} de ${NomeCadastro}`}</h1>
          <Modelo
            Dados={DadosCadastro}
            handleGravacao={(conteudo) => eventoGravarDadosAPI(conteudo)}
          />
        </div>
      )}
    </>
  );
}
