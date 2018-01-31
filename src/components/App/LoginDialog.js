import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import styled from 'styled-components';

import auth from '../../auth';

const Title = styled(DialogTitle)`
  && {
    text-align: center;
  }
`;

const defaultState = {
  error: null,
  loading: false,
};

class LoginDialog extends React.Component {
  state = {
    ...defaultState,
  };

  signInWithGoogle = event => {
    this.setState({
      ...defaultState,
      loading: true,
    });
    auth
      .signIn()
      .then(() => {
        this.setState(defaultState);
        this.props.onClose(event);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...defaultState,
          error: err.messsage,
        });
      });
  };

  render() {
    return (
      <Dialog {...this.props}>
        <Title>Sign In</Title>
        <DialogContent>
          <Button
            raised="raised"
            color="primary"
            disabled={this.state.loading}
            onClick={this.signInWithGoogle}
          >
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LoginDialog;
