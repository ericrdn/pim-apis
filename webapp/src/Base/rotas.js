import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

import Home from '../Telas/Home';

import ClientesController from '../Telas/Clientes/controller';
import MultasController from '../Telas/Multas/controller';

function Rota(rota, descricao, componente, icone, menu = true) {
  return {
    rota,
    descricao,
    componente,
    icone,
    menu,
  };
}

export default function Rotas() {
  return [
    Rota('/', 'Home', Home, <HomeIcon />),
    Rota('/clientes', 'Clientes', ClientesController.Listagem, <PeopleIcon />),
    Rota(
      '/clientes/incluir',
      'Incluir Cliente',
      ClientesController.Cadastro,
      <DirectionsCarIcon />,
      false,
    ),
    Rota(
      '/clientes/alterar/:codigo',
      'Alterar Cliente',
      ClientesController.Cadastro,
      <DirectionsCarIcon />,
      false,
    ),

    Rota('/multas', 'Multas', MultasController.Listagem, <PeopleIcon />),
    Rota(
      '/multas/incluir',
      'Incluir Cliente',
      MultasController.Cadastro,
      <DirectionsCarIcon />,
      false,
    ),
    Rota(
      '/multas/alterar/:codigo',
      'Alterar Cliente',
      MultasController.Cadastro,
      <DirectionsCarIcon />,
      false,
    ),
  ];
}
