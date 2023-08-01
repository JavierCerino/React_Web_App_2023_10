import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import footerImage from '../../../sourcesImages/footerImage.png';
import './Footer.css';
import { FormattedMessage } from 'react-intl';

function Footer() {
    return (
        <div className='Footer'>
            <Navbar bg="dark" variant="dark"    >
                <Container>
                    <Row>
                        <Col md={4} className="d-flex align-items-center">
                            <img
                                src={footerImage}
                                id="footerImage"
                                className="d-inline-block align-top"
                                alt="Your Logo"
                            />
                        </Col>
                        <Col md={8}>
                            <Row className='bg-white'>
                                <Form.Group as={Col} controlId="formGridEmail" className="me-2 text-start">
                                    <Form.Label>
                                        <FormattedMessage id="Email"/>
                                    </Form.Label>
                                    <Form.Control type="email" placeholder="Escribe tu e-mail" />
                                </Form.Group>
                            </Row>
                            <Row style={{ height: '20px' }} className='bg-white'></Row>
                            <Row className='bg-white'>
                                <Form.Group as={Col} controlId="formGridName" className="me-2 text-start">
                                    <Form.Label>
                                        <FormattedMessage id="Name"/>
                                    </Form.Label>
                                    <Form.Control type="name" placeholder="Escribe tu nombre" />
                                </Form.Group>
                            </Row>
                            <Row style={{ height: '20px' }} className='bg-white'></Row>
                            <Row className='bg-white'>
                                <Form.Group as={Col} controlId="formGridMessage" className="me-2 text-start">
                                    <Form.Label>
                                        <FormattedMessage id="Message"/>
                                    </Form.Label>
                                    <Form.Control as="textarea" type="text" placeholder="Cuentanos tu opinión" style={{height:"150px", verticalAlign: 'top'}}/>
                                </Form.Group>
                            </Row>
                            <Row style={{ height: '20px' }} className='bg-white'></Row>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer;