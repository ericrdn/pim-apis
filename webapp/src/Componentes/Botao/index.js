import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function Botao(props) {
  return (
    <Button variant="contained" color="primary" component={Link} {...props}>
      {props.children}
    </Button>
  );
}
