import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Table 
} from "reactstrap";

class WhiteList extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col md={8}>
            <h2>Add Whitelist</h2>

            <Form>
              <FormGroup row>
                <Label for="phoneNumber" sm={2}>전화번호</Label>
                <Col sm={10}>
                  <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="000-0000-0000" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="platform" sm={2}>예약 플랫폼</Label>
                <Col sm={10}>
                  <Input type="text" name="platform" id="platform" placeholder="예) 포잉, 데일리호텔, 야놀자" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="geocode" sm={2}>예약 장소 좌표</Label>
                <Col sm={4}>
                  <Input type="text" name="latitude" id="latitude" placeholder="위도" />
                </Col>
                <Col sm={4}>
                  <Input type="text" name="longitude" id="longitude" placeholder="경도" />
                </Col>
                <Col sm={2}>
                  <Button color="primary">추가</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={8}>
            <h2>Search Phone Number</h2>

            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <Input type="text" name="searchPhoneNumber" id="searchPhoneNumber" placeholder="000-0000-0000" />
                </Col>
                <Col sm={2}>
                  <Button color="info">검색</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row className="mt-3">
          <Table hover>
            <thead>
              <tr>
                <th>전화번호</th>
                <th>예약 플랫폼</th>
                <th>좌표</th>
                <th>카운트</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>010-0000-0000</td>
                <td>포잉</td>
                <td>37.532600, 127.024612</td>
                <td>2</td>
              </tr>
              <tr>
                <td>010-0000-0000</td>
                <td>포잉</td>
                <td>37.532600, 127.024612</td>
                <td>2</td>
              </tr>
              <tr>
                <td>010-0000-0000</td>
                <td>포잉</td>
                <td>37.532600, 127.024612</td>
                <td>2</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default WhiteList;