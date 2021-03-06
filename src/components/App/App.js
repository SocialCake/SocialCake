import React from 'react';
import styled from 'styled-components';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../../theme';
import Toolbar from './Toolbar';
import Footer from './Footer';

const Container = styled.div`
  height: 100vh;
  background: url(https://i.imgur.com/TNF2u1D.jpg) no-repeat center center fixed;
  background-size: cover;
`;

class App extends React.Component<{}> {
  componentDidMount() {
    window.document.title = this.props.route.title;
  }

  componentDidUpdate() {
    window.document.title = this.props.route.title;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Toolbar user={this.props.user} />
          {this.props.route.body}
          <Footer />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
