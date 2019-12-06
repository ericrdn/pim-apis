import React from 'react';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../Dialog';

export default function Dados(props) {
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
      CarregaRegistro(match.params).then((response) => setDadosCadastro(response.data),);
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
  );
}
