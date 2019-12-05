import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function AlertDialog({
  open,
  handleClose,
  Titulo,
  Mensagem,
  Botoes
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{Titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {Mensagem}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!Botoes ? (
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        ) : (
          Botoes.map(botao => (
            <Button
              key={botao}
              onClick={
                !botao.Evento
                  ? handleClose
                  : () => {
                      botao.Evento();
                      handleClose();
                    }
              }
              color="primary"
              autoFocus
            >
              {botao.Texto}
            </Button>
          ))
        )}
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.instanceOf(Function).isRequired,
  Titulo: PropTypes.string.isRequired,
  Mensagem: PropTypes.string.isRequired
};
