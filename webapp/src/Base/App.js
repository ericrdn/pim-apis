import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseApp from './BaseApp';
import Rotas from './rotas';

function App(props) {
  return (
    <BrowserRouter>
      <BaseApp Rotas={Rotas()}>
        <Switch>
          {Rotas().map((item) => (
            <Route
              key={item.descricao}
              exact
              path={item.rota}
              component={item.componente}
            />
          ))}
        </Switch>
      </BaseApp>
    </BrowserRouter>
  );
}

export default App;
