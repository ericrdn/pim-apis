import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  CircularProgress
} from "@material-ui/core";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import SettingsIcon from "@material-ui/icons/Settings";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Services from "../Services";

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : "")
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function ListaLinhas({ Lista }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {Lista.map(item => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <item.Icone />
            </ListItemIcon>
            <ListItemText
              primary={item.Titulo}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.Descricao}
                  </Typography>
                  {item.Descricao2}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function Home(props) {
  const [Dados, setDados] = React.useState([]);

  React.useEffect(() => {
    console.log(2);
    Promise.all([
      Services.DadosGerais.ConsultarDadosHome(),
      Services.Usuarios.ConsultarTodos()
    ]).then(retorno => {
      let Usuarios = retorno[1].data.listaUsuarios;
      let ExamesVencidos = [];

      if (Usuarios && Usuarios.length > 0) {
        ExamesVencidos = Usuarios.filter(
          item => new Date(item.dataUltimoExameMedico) < addDays(new Date(), 30)
        );
        Usuarios = Usuarios.filter(
          item => new Date(item.dataValidadeCnh) < addDays(new Date(), 15)
        );
      } else Usuarios = [];

      console.log(Usuarios);

      setDados([retorno[0].data, Usuarios, ExamesVencidos]);
    });
  }, [props]);

  return Dados.length === 0 ? (
    <CircularProgress
      size={24}
      style={{ width: 50, height: 50, marginTop: 30 }}
    />
  ) : (
    <div>
      <Paper elevation={4} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" component="h3">
          <b>Resumo Geral</b>
        </Typography>
        <ListaLinhas
          Lista={[
            {
              Titulo: "Carros em operação",
              Descricao: Dados[0].qtdeVeiculos + " carros",
              Icone: DriveEtaIcon
            },
            {
              Titulo: "Carros com manutenção no mês",
              Descricao: Dados[0].qtdeVeiculosManutencao + " carros",
              Icone: SettingsIcon
            }
          ]}
        />
      </Paper>
      <Paper elevation={4} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" component="h3">
          <b>Gastos do mês</b>
        </Typography>
        <ListaLinhas
          Lista={[
            {
              Titulo: "Multas",
              Descricao: Dados[0].valorMulta.formatMoney(2, "R$ ", ".", ","),
              Icone: DriveEtaIcon
            },
            {
              Titulo: "Peças",
              Descricao: Dados[0].valorPecas.formatMoney(2, "R$ ", ".", ","),
              Icone: SettingsIcon
            },
            {
              Titulo: "Estacionamento",
              Descricao: Dados[0].valorEstacionamento.formatMoney(
                2,
                "R$ ",
                ".",
                ","
              ),
              Icone: LocalParkingIcon
            },
            {
              Titulo: "Manutenção",
              Descricao: Dados[0].valorManutencao.formatMoney(
                2,
                "R$ ",
                ".",
                ","
              ),
              Icone: OfflineBoltIcon
            }
          ]}
        />
      </Paper>
      <Paper elevation={4} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" component="h3">
          <b>CNH Vencidas ou com vencimento em 15 dias</b>
        </Typography>

        {Dados[1].length > 0 ? (
          <ListaLinhas
            Lista={Dados[1].map(item => ({
              Titulo: item.nome,
              Descricao: `Vencimento em : ${moment(item.dataValidadeCnh).format(
                "DD/MM/YYYY"
              )}`,
              Icone: DriveEtaIcon
            }))}
          />
        ) : (
          <>
            <br />
            <i>Todos em dia</i>
          </>
        )}
      </Paper>
      <Paper elevation={4} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" component="h3">
          <b>Exames Vencidos ou com vencimento em 30 dias</b>
        </Typography>

        {Dados[2].length > 0 ? (
          <ListaLinhas
            Lista={Dados[2].map(item => ({
              Titulo: item.nome,
              Descricao: `Vencimento em : ${moment(item.dataValidadeCnh).format(
                "DD/MM/YYYY"
              )}`,
              Icone: DriveEtaIcon
            }))}
          />
        ) : (
          <>
            <br />
            <i>Todos em dia</i>
          </>
        )}
      </Paper>
    </div>
  );
}
