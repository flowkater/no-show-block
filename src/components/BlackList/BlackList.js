import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  FormGroup, 
  Label, 
  Button,
  Table,
  Input
} from "reactstrap";

class BlackList extends Component {

  state = {
    phoneNumber: '',
    platform: '',
    latitude: '',
    longitude: '',
    searchPhoneNumber: '',
    tradeToken: 0
  }

  onChange = (e) => {
    const input = {};
    input[e.target.name] = e.target.value;

    console.log(input);

    this.setState(input);
  }

  handleAddSubmit = (e) => {
    e.preventDefault();

    const { onAddSubmit } = this.props;

    onAddSubmit({
      phoneNumber: this.state.phoneNumber,
      platform: this.state.platform,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    })

    this.setState({
      phoneNumber: '',
      platform: '',
      latitude: '',
      longitude: '',
    })
  } 

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const { onSearchSubmit } = this.props;

    onSearchSubmit({
      searchPhoneNumber: this.state.searchPhoneNumber
    })

    this.setState({
      searchPhoneNumber: ''
    })
  }

  handleReduceCount = (e) => {
    e.preventDefault();

    const { onReduceCount } = this.props;

    onReduceCount({
      tradeToken: this.state.tradeToken
    })

    this.setState({
      tradeToken: 0
    })
  }

  render() {
    const { search, myToken } = this.props;

    const mapToComponents = data => {
      return data.map((reporter, i) => {
          return (<tr key={i}>
            <td>{reporter.reporterAddress}</td>
            <td>{reporter.platform}</td>
            <td>{reporter.latitude}, {reporter.longitude}</td>
          </tr>);
      });
    };


    return (
      <Container>
        <Row className="mt-5">
          <Col md={8}>
            <h2>Add Blacklist</h2>
            <FormGroup row>
              <Label for="phoneNumber" sm={2}>전화번호</Label>
              <Col sm={10}>
                <Input
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  type="text"
                  name="phoneNumber"
                  placeholder="00000000000"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="platform" sm={2}>예약 매장</Label>
              <Col sm={10}>
                <Input
                  value={this.state.platform}
                  onChange={this.onChange}
                  type="text"
                  name="platform"
                  placeholder="업체 이름"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="geocode" sm={2}>예약 장소 좌표</Label>
              <Col sm={4}>
                <Input
                  value={this.state.latitude}
                  onChange={this.onChange}
                  type="text"
                  name="latitude"
                  placeholder="위도"
                />
              </Col>
              <Col sm={4}>
                <Input
                  value={this.state.longitude}
                  onChange={this.onChange}
                  type="text"
                  name="longitude"
                  placeholder="위도"
                />
              </Col>
              <Col sm={2}>
                <Button color="primary" onClick={this.handleAddSubmit}>추가</Button>
              </Col>
            </FormGroup> 
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <h2>Search Phone Number</h2>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  value={this.state.searchPhoneNumber}
                  onChange={this.onChange}
                  type="text"
                  name="searchPhoneNumber"
                  placeholder="00000000000"
                />
              </Col>
              <Col sm={2}>
                <Button color="info" onClick={this.handleSearchSubmit}>검색</Button>
              </Col>
            </FormGroup>
            
          </Col>
          <Col md={3}>
            <h2>블랙리스트 카운트</h2>
            <p>{search.count}회</p>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  value={this.state.tradeToken}
                  onChange={this.onChange}
                  type="number"
                  name="tradeToken"
                />
              </Col>
              <Col sm={2}>
                <Button color="info" onClick={this.handleReduceCount}>블랙리스트 제거</Button>
              </Col>
            </FormGroup>
          </Col>
          <Col md={3}>
            <h2>나의 토큰</h2>
            <p>{myToken} NST</p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Table dark hover>
            <thead>
              <tr>
                <th>ReporterAddress</th>
                <th>예약 매장</th>
                <th>좌표</th>
              </tr>
            </thead>
            <tbody>
              {mapToComponents(search.reporters)}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default BlackList;