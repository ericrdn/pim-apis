import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import CommuteIcon from "@material-ui/icons/Commute";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AssignmentIcon from "@material-ui/icons/Assignment";

import Home from "../Telas/Home";

import ClientesController from "../Telas/Clientes/controller";
import MultasController from "../Telas/Multas/controller";
import VeiculosController from "../Telas/Veiculos/controller";
import TipoUsuarioController from "../Telas/TipoUsuario/controller";
import UsuariosController from "../Telas/Usuarios/controller";
import ManutencoesController from "../Telas/Manutencoes/controller";
import TipoVeiculosController from "../Telas/TipoVeiculo/controller";

import PecasController from "../Telas/Pecas/controller";
import TipoReembolsoController from "../Telas/TipoReembolso/controller";
import ReembolsoController from "../Telas/Reembolso/controller";
import EstoquePecasController from "../Telas/EstoquePecas/controller";

function Rota(rota, descricao, componente, icone, menu = true) {
  return {
    rota,
    descricao,
    componente,
    icone,
    menu
  };
}

function RotaCadastro({ rotaBase, Nome, Controller, Icone }) {
  return [
    Rota(`${rotaBase}`, Nome, Controller.Listagem, <Icone />),
    Rota(
      `${rotaBase}/incluir`,
      `Incluir ${Nome}`,
      Controller.Cadastro,
      <Icone />,
      false
    ),
    Rota(
      `${rotaBase}/alterar/:codigo`,
      `Alterar ${Nome}`,
      Controller.Cadastro,
      <Icone />,
      false
    )
  ];
}

export default function Rotas() {
  const Rotas = [
    Rota("/", "Home", Home, <HomeIcon />),

    Rota("/multas", "Multas", MultasController.Listagem, <ThumbDownAltIcon />),
    Rota(
      "/multas/incluir",
      "Incluir Cliente",
      MultasController.Cadastro,
      <DirectionsCarIcon />,
      false
    ),
    Rota(
      "/multas/alterar/:codigo",
      "Alterar Cliente",
      MultasController.Cadastro,
      <DirectionsCarIcon />,
      false
    ),
    Rota(
      "/veiculos",
      "Veiculos",
      VeiculosController.Listagem,
      <DriveEtaIcon />
    ),
    Rota(
      "/veiculos/incluir",
      "Incluir Cliente",
      VeiculosController.Cadastro,
      <DirectionsCarIcon />,
      false
    ),
    Rota(
      "/veiculos/alterar/:codigo",
      "Alterar Cliente",
      VeiculosController.Cadastro,
      <DirectionsCarIcon />,
      false
    )
  ];

  RotaCadastro({
    rotaBase: "/tipousuario",
    Nome: "Tipo Usuário",
    Controller: TipoUsuarioController,
    Icone: GroupIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/usuarios",
    Nome: "Usuário",
    Controller: UsuariosController,
    Icone: PersonIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/manutencoes",
    Nome: "Manutenções",
    Controller: ManutencoesController,
    Icone: SettingsIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/tipoveiculos",
    Nome: "Tipo de Veículos",
    Controller: TipoVeiculosController,
    Icone: CommuteIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/pecas",
    Nome: "Peças",
    Controller: PecasController,
    Icone: ShoppingCartIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/tiporeembolso",
    Nome: "Tipo de Reembolso",
    Controller: TipoReembolsoController,
    Icone: LocalAtmIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/reembolso",
    Nome: "Reembolso",
    Controller: ReembolsoController,
    Icone: AttachMoneyIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/estoquepecas",
    Nome: "Estoque Peças",
    Controller: EstoquePecasController,
    Icone: AssignmentIcon
  }).forEach(item => Rotas.push(item));

  RotaCadastro({
    rotaBase: "/clientes",
    Nome: "Clientes",
    Controller: ClientesController,
    Icone: PersonIcon
  }).forEach(item => Rotas.push(item));

  return Rotas;
}
