import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Validacoes from "./validacoes";
import "./style.css";

import moment from "moment";

import AlertDialog from "../Dialog";

moment.locale("pt-BR");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error) return <h1>Erro</h1>;
    return this.props.children;
  }
}

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  containerField: {
    display: "inline-flex",
    height: 110
  }
}));

function CriaMatrizConteudo(CamposValores) {
  return Object.fromEntries(
    CamposValores.map(item => [item[0], { Valor: item[1] }])
  );
}

export function CampoCadastro() {}

function OpcoesItem({ Opcoes, DadosSelect }) {
  if (Opcoes.map) {
    return Opcoes.map(item => (
      <MenuItem value={item.Valor}>{item.Descricao}</MenuItem>
    ));
  }
  // else {
  //   const Dados = DadosSelect.find(i => i.Campo === "tipoVeic");
  //   if (Dados && Dados.Opcoes) {
  //     return Dados.Opcoes.map(item => (
  //       <MenuItem value={item.Valor}>{item.Descricao}</MenuItem>
  //     ));
  //   }
  // }
}

export function FormularioPadrao(props) {
  const { Dados, children, handleGravacao, DadosSelect } = props;
  const classes = useStyles();
  const DadosAlertaInicial = {
    Aberto: false,
    Mensagem: "",
    Titulo: ""
  };

  const history = useHistory();

  const [Alerta, setAlerta] = React.useState(DadosAlertaInicial);

  function AbrirAlerta(Titulo, Mensagem) {
    setAlerta({
      Aberto: true,
      Mensagem,
      Titulo
    });
  }

  function fecharAlerta() {
    setAlerta(DadosAlertaInicial);
  }

  const CamposCadastro = children
    .filter(item => item.type === CampoCadastro)
    .map(campo => ({ ...campo.props }));

  const [Conteudo, setConteudo] = React.useState(
    CriaMatrizConteudo(CamposCadastro.map(item => [item.Nome, ""]))
  );

  const CarregarTelaInicial = DadosTelaInicial => {
    let TodosCampos = Object.entries(Dados);
    TodosCampos = TodosCampos.concat(
      CamposCadastro.filter(
        item => !TodosCampos.find(campo => campo[0] === item.Nome)
      ).map(itemcampofaltando => [itemcampofaltando.Nome, ""])
    );

    // Tratamento dos dados
    if (Object.entries(TodosCampos).length > 0) {
      setConteudo(CriaMatrizConteudo(TodosCampos));
    }
  };
  // eslint-disable-next-line
  React.useEffect(() => {
    // eslint-disable-next-line
    CamposCadastro.forEach(item => {
      if (item.TipoCampo === "float" && Dados[item.Nome]) {
        Dados[item.Nome] = String(Dados[item.Nome]).replace(".", ",");
      }
      if (item.TipoCampo === "DataHora" && Dados[item.Nome]) {
        // Dados[item.Nome] = new Date(Dados[item.Nome]);
        Dados[item.Nome] = moment(new Date(Dados[item.Nome])).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      }
      if (item.CampoData && Dados[item.Nome]) {
        // Dados[item.Nome] = new Date(Dados[item.Nome]);
        Dados[item.Nome] = moment(new Date(Dados[item.Nome])).format(
          "DD/MM/YYYY"
        );
      }
    });

    CarregarTelaInicial(Dados);
    // eslint-disable-next-line
  }, [Dados]);

  const Formatacao = {
    FormataCNPJ(valor) {
      let CNPJ = valor;
      CNPJ = CNPJ.replace(/\D/g, "");
      CNPJ = CNPJ.substring(0, 14);
      CNPJ = CNPJ.replace(/^(\d{2})(\d)/, "$1.$2");
      CNPJ = CNPJ.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      CNPJ = CNPJ.replace(/\.(\d{3})(\d)/, ".$1/$2");
      CNPJ = CNPJ.replace(/(\d{4})(\d)/, "$1-$2");
      return CNPJ;
    },

    FormataCPF(v) {
      v = v.replace(/\D/g, "");
      v = v.substring(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return v;
    },

    FormataData(v) {
      v = v.replace(/\D/g, "");
      v = v.substring(0, 8);
      v = v.replace(/(\d{2})(\d)/, "$1/$2");
      v = v.replace(/(\d{2})(\d)/, "$1/$2");
      return v;
    }
  };

  const ValidacaoCampoCompleta = (DadosdoCampo, ConteudoCampo) => {
    if (DadosdoCampo.Obrigatorio) {
      if (
        typeof ConteudoCampo.Valor === "string" &&
        ConteudoCampo.Valor.trim() === ""
      ) {
        return { Erro: true, MensagemdoCampo: "Esse campo é obrigatório" };
      }
    }

    if (DadosdoCampo.ValidaCampo) {
      const ErroValidacao = DadosdoCampo.ValidaCampo(ConteudoCampo.Valor);
      if (ErroValidacao !== "") {
        return { Erro: true, MensagemdoCampo: ErroValidacao };
      }
    }

    if (DadosdoCampo.TipoCampo === "float") {
      if (!Number(ConteudoCampo.Valor.replace(",", "."))) {
        return { Erro: true, MensagemdoCampo: "Conteudo não é um valor" };
      }
    }

    if (DadosdoCampo.TipoCampo === "DataHora") {
      if (
        ConteudoCampo.Valor.length < 16 ||
        !moment(ConteudoCampo.Valor, "DD/MM/YYYY HH:mm:ss").isValid()
      ) {
        return { Erro: true, MensagemdoCampo: "Data/Hora Inválida" };
      }
    }

    let FuncaoValidacaoCampo;

    if (DadosdoCampo.CampoCNPJ) FuncaoValidacaoCampo = Validacoes.ValidacaoCNPJ;
    if (DadosdoCampo.CampoCPF) FuncaoValidacaoCampo = Validacoes.ValidacaoCPF;
    if (DadosdoCampo.CampoData) FuncaoValidacaoCampo = Validacoes.ValidacaoData;

    if (FuncaoValidacaoCampo) {
      const Resultado = FuncaoValidacaoCampo(ConteudoCampo.Valor);
      if (Resultado.Erro) return Resultado;
    }

    return { Erro: false, MensagemdoCampo: "" };
  };

  const handleAlteraCampo = (campo, DadosdoCampo, InfoCampo) => event => {
    const InfoCampoNovo = { ...InfoCampo, Valor: event.target.value };
    const StatusCampo = ValidacaoCampoCompleta(DadosdoCampo, InfoCampoNovo);
    InfoCampoNovo.Erro = StatusCampo.Erro;
    if (InfoCampoNovo.Erro) InfoCampoNovo.Aviso = StatusCampo.MensagemdoCampo;
    else InfoCampoNovo.Aviso = "";

    if (DadosdoCampo.FuncaoFormataCampo) {
      InfoCampoNovo.Valor = DadosdoCampo.FuncaoFormataCampo(
        InfoCampoNovo.Valor
      );
    }

    if (DadosdoCampo.TipoCampo === "int") {
      InfoCampoNovo.Valor = InfoCampoNovo.Valor.replace(/[^0-9]+/g, "");
      DadosdoCampo.QuantidadeCaracteres = 8;
    }

    if (DadosdoCampo.TipoCampo === "float") {
      InfoCampoNovo.Valor = InfoCampoNovo.Valor.replace(/[^0-9,]+/g, "");
      DadosdoCampo.QuantidadeCaracteres = 8;
    }

    if (DadosdoCampo.TipoCampo === "DataHora") {
      InfoCampoNovo.Valor = InfoCampoNovo.Valor.replace(/[^0-9,/: ]+/g, "");
      DadosdoCampo.QuantidadeCaracteres = 19;
    }

    if (DadosdoCampo.QuantidadeCaracteres) {
      InfoCampoNovo.Valor = InfoCampoNovo.Valor.substring(
        0,
        DadosdoCampo.QuantidadeCaracteres
      );
    }

    let FuncaoFormatacaoInterna;

    if (DadosdoCampo.CampoCNPJ) {
      FuncaoFormatacaoInterna = Formatacao.FormataCNPJ;
    }

    if (DadosdoCampo.CampoData) {
      FuncaoFormatacaoInterna = Formatacao.FormataData;
    }

    if (DadosdoCampo.CampoCPF) {
      FuncaoFormatacaoInterna = Formatacao.FormataCPF;
    }

    if (FuncaoFormatacaoInterna) {
      InfoCampoNovo.Valor = FuncaoFormatacaoInterna(InfoCampoNovo.Valor);
    }

    setConteudo({
      ...Conteudo,
      [campo]: {
        ...InfoCampoNovo
      }
    });
  };

  return (
    <>
      <AlertDialog
        open={Alerta.Aberto}
        handleClose={fecharAlerta}
        Mensagem={Alerta.Mensagem}
        Titulo={Alerta.Titulo}
      />
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          {CamposCadastro.filter(item => !item.AutoIncremento).map(item => (
            <ErrorBoundary key={JSON.stringify(item)}>
              <div className={classes.containerField}>
                {!item.Select ? ( //!
                  <TextField
                    className={classes.textField}
                    key={item.Nome}
                    id={item.Nome}
                    label={item.Descricao}
                    margin="normal"
                    variant="filled"
                    value={Conteudo[item.Nome] ? Conteudo[item.Nome].Valor : ""}
                    onChange={handleAlteraCampo(
                      item.Nome,
                      item,
                      Conteudo[item.Nome]
                    )}
                    onBlur={handleAlteraCampo(
                      item.Nome,
                      item,
                      Conteudo[item.Nome]
                    )}
                    style={{ width: item.Tamanho, maxWidth: "100%" }}
                    error={Conteudo[item.Nome].Erro}
                    helperText={Conteudo[item.Nome].Aviso}
                  />
                ) : (
                  <FormControl className={classes.textField} variant="filled">
                    <InputLabel>{item.Descricao}</InputLabel>
                    <Select
                      value={
                        Conteudo[item.Nome] ? Conteudo[item.Nome].Valor : ""
                      }
                      onChange={handleAlteraCampo(
                        item.Nome,
                        item,
                        Conteudo[item.Nome]
                      )}
                    >
                      {item.Select.map(item => (
                        <MenuItem value={item.Valor}>{item.Descricao}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </ErrorBoundary>
          ))}
        </div>
      </form>
      <div className={classes.container}>
        <Button
          className={classes.textField}
          variant="contained"
          color="primary"
          onClick={() => {
            // Refaz a validação de todos campos
            let TemErro = false;
            CamposCadastro.forEach(element => {
              const DadosCampo = Conteudo[element.Nome];
              const StatusValidacao = ValidacaoCampoCompleta(
                element,
                DadosCampo
              );
              if (StatusValidacao.Erro) TemErro = true;
              DadosCampo.Erro = StatusValidacao.Erro;
              DadosCampo.Aviso = StatusValidacao.MensagemdoCampo;
            });
            setConteudo({ ...Conteudo });

            // Efetua a ação para gravação dos dados
            if (!TemErro) {
              // const DadosGravacao = Object.fromEntries(
              //   Object.entries(Conteudo).map((item) => {
              //     const [Chave, DadosCampoTela] = item;
              //     return [Chave, DadosCampoTela.Valor];
              //   }),
              // );
              const DadosGravacao = Object.fromEntries(
                CamposCadastro.map(item => {
                  let ConteudoCampoTela = Conteudo[item.Nome].Valor;
                  if (
                    item.AutoIncremento ||
                    item.TipoCampo === "int" ||
                    item.TipoCampo === "float"
                  ) {
                    ConteudoCampoTela = Number(
                      String(ConteudoCampoTela).replace(",", ".")
                    );
                  } else if (item.TipoCampo === "DataHora") {
                    ConteudoCampoTela = moment(
                      ConteudoCampoTela,
                      "DD/MM/YYYY HH:mm:ss"
                    ).format();
                  } else if (item.CampoData) {
                    ConteudoCampoTela = moment(
                      ConteudoCampoTela,
                      "DD/MM/YYYY"
                    ).format();
                  }

                  return [item.Nome, ConteudoCampoTela];
                })
              );
              console.log("Dados enviados: ", DadosGravacao);
              handleGravacao(DadosGravacao);
            } else {
              AbrirAlerta("Validação Campos", "Erro na validação dos campos");
            }
          }}
        >
          Gravar
        </Button>
        <Button
          className={classes.textField}
          variant="contained"
          color="secondary"
          onClick={() => CarregarTelaInicial(Dados)}
        >
          Cancelar
        </Button>
        <Button
          className={classes.textField}
          variant="contained"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Voltar
        </Button>
      </div>
    </>
  );
}

FormularioPadrao.propTypes = {
  Dados: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object),
  handleGravacao: PropTypes.instanceOf(Function)
};
