import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Button, 
  Table 
} from "reactstrap";

class TokenMarket extends Component {
  state = {
    value: 0
  }

  onBuy = (e) => {
    e.preventDefault();

    const { buyTokens } = this.props;
    buyTokens(this.state.value);

    this.setState({
      value: ''
    });
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() { 
    const { totalTokens, tokensSold, tokenPrice, contractBalance } = this.props;

    return (
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <h2>Token Stat</h2>
            <Table hover>
              <tbody>
                <tr>
                  <td>Tokens For Sale</td>
                  <td>{totalTokens}</td>
                </tr>
                <tr>
                  <td>Tokens Sold</td>
                  <td>{tokensSold}</td>
                </tr>
                <tr>
                  <td>Price Per Token</td>
                  <td>{tokenPrice} Ether</td>
                </tr>
                <tr>
                  <td>Balance in the contract</td>
                  <td>{contractBalance} Ether</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h2>Purchase Token</h2>
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <Input 
                    value={this.state.value}
                    onChange={this.onChange}
                    type="text" 
                    name="tokenNumber" 
                    id="tokenNumber" 
                    placeholder="Numbers of Tokens Buy" 
                  />
                </Col>
                <Col sm={2}>
                  <Button color="primary" onClick={this.onBuy}>Buy</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TokenMarket; 