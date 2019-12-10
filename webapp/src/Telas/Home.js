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
  Avatar
} from "@material-ui/core";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import SettingsIcon from "@material-ui/icons/Settings";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";

import { makeStyles } from "@material-ui/core/styles";

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

export default function Home() {
  return (
    <div>
      <Paper elevation={4} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" component="h3">
          <b>Resumo Geral</b>
        </Typography>
        <ListaLinhas
          Lista={[
            {
              Titulo: "Carros em operação",
              Descricao: "4 carros",
              Icone: DriveEtaIcon
            },
            {
              Titulo: "Carros em manutenção",
              Descricao: "3 carros",
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
              Descricao: "R$ 1.202,34",
              Icone: DriveEtaIcon
            },
            {
              Titulo: "Peças",
              Descricao: "R$ 12.222,12",
              Icone: SettingsIcon
            },
            {
              Titulo: "Estacionamento",
              Descricao: "R$ 2.432,12",
              Icone: LocalParkingIcon
            },
            {
              Titulo: "Manutenção",
              Descricao: "R$ 10.432,12",
              Icone: OfflineBoltIcon
            }
          ]}
        />
      </Paper>
    </div>
  );
}
