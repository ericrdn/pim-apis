import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BaseApp from "./BaseApp";
import Rotas from "./rotas";

import Login from "../Telas/Login/controller";

function App(props) {
  const [Autenticado, setAutenticado] = React.useState(false);
  return (
    <BrowserRouter>
      {Autenticado ? (
        <BaseApp Rotas={Rotas()}>
          <Switch>
            {Rotas()
              .filter(item => !item.divisor)
              .map(item => (
                <Route
                  key={item.descricao}
                  exact
                  path={item.rota}
                  component={item.componente}
                />
              ))}
          </Switch>
        </BaseApp>
      ) : (
        <Login setAutenticado={setAutenticado} />
      )}
    </BrowserRouter>
  );
}

export default App;
