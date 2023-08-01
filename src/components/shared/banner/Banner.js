/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Container, Button, Modal, Form } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../sourcesImages/logo.png';
import './Banner.css';
import { useState, useEffect } from 'react';
import { FormattedMessage } from "react-intl";
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function Banner() {

    const intl = useIntl();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [pais, setPais] = useState('');
    const [perfilAdquisitivo, setPerfilAdquisitivo] = useState('');
    const [correo, setCorreo] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [fallo, setFallo] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {

        if (nombre.trim() === '' || password.trim() === '' || correo.trim() === '') {
            setFallo(true);
            setError("Campos vacios");
            return
        } else {
            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "usuario": nombre,
                        "nombre": nombre,
                        "apellido": nombre,
                        "contraseña": password,
                        "correo": correo,
                        "image": "imagen.png"
                    }
                )
            }
            let res = await fetch('http://localhost:3000/api/v1/usuarios', config);
            let data = await res.json();
            if (data.statusCode !== 200) {
                setError(data.message)
                setFallo(true)
                return
            }
        }
        setFallo(false);
    }

    const login = () => {
        peticionLogin();
        if (fallo !== false) {
            handleClose();
        }
        setError('')
        setFallo(true)
    }

    const peticionLogin = async () => {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "nombre": nombre,
                    "contraseña": password
                }
            )
        }
        let res = await fetch('http://localhost:3000/api/v1/usuarios/login', config);
        let data = await res.json();
        if (data.statusCode !== 201) {
            setError(data.message)
            setFallo(true)
            return
        }
        const loginResponse = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'userGod',
                password: 'userGod',
            }),
        });

        if (loginResponse.ok) {
            const { token } = await loginResponse.json();
            localStorage.setItem('bearerToken', token);
        } else {
            setError('Error en la autenticación');
            setFallo(true)
            return
        }
        setFallo(false)
    }

    const handleClose = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);

    const signupLogin = () => {
        handleClose();
        handleShowSignUp();
    }

    const SignUpRegister = () => {
        handleSubmit();
        handleCloseSignUp();
    }

    // const handleCloseError = () => {
    //     setFallo(false)
    // }

    return (
        <Container className="Menu_bar">
            <Navbar bg="white" fixed="top" expand="lg" className='navBar'>
                <Navbar.Brand className="imageContainer" href="/">
                    <img className="imagen" src={logo}></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <form className="d-flex">
                            <input className="form-control me-2 form_input barrabusqueda" type="search" placeholder={intl.formatMessage({ id: 'Search' })} aria-label="Search" />
                            <Button className="btn btn-outline-success botonB form_lupa" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </form>
                        <Nav.Link className="bannerOption" href="/restaurantes">
                            <FormattedMessage id="Restaurants" />
                        </Nav.Link>
                        <Nav.Link className="bannerOption" href="/productos">
                            <FormattedMessage id="Products" />
                        </Nav.Link>
                        <Nav.Link className="bannerOption" href="/ofertas">
                            <FormattedMessage id="Offers" />
                        </Nav.Link>
                        <Nav.Link className="bannerOption" href="/reservas">
                            <FormattedMessage id="Reservations" />
                        </Nav.Link>
                        <Nav.Link className="bannerOption" onClick={handleShowLogin}>
                            <FormattedMessage id="My Account" />
                        </Nav.Link>
                        <Button className="orderNowButton" variant="primary" href="/reservas">
                            <FormattedMessage id="OrderNow" />
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal className="LoginContainer" show={showLogin} onHide={handleClose}>
                <Modal.Body className="Login">
                    <Form>
                        <Form.Label className='EtiquetaLogin'>
                            <FormattedMessage id="LogIn" />
                        </Form.Label>
                        <Form.Group className='mb-3' controlId="Correo">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="Correo" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="text"
                                placeholder={intl.formatMessage({ id: 'EmailHolder' })}
                                aria-label="Search"
                                onChange={e => setNombre(e.target.value)}
                                value={nombre}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="Password">
                            <Form.Label>
                                <FormattedMessage className='LabelsForm' id="Contrasena" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="password"
                                placeholder={intl.formatMessage({ id: 'PassHolder' })}
                                aria-label="Search"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="loginfooter">
                    <Button variant="primary" className="botonfooter" onClick={login}>
                        <FormattedMessage id="Ingresar" />
                    </Button>
                    <Button variant="primary" className="botonfooter" onClick={signupLogin}>
                        <FormattedMessage id="Registrarse" />
                    </Button>
                    <Button variant="secondary" className="botonfooter" onClick={handleClose}>
                        <FormattedMessage id="Cancel" />
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className="LoginContainer" show={showSignUp} onHide={handleCloseSignUp}>
                <Modal.Body className="Login">
                    <Form>
                        <Form.Label className='EtiquetaLogin'>
                            <FormattedMessage id="Registrarse" />
                        </Form.Label>
                        <Form.Group className='mb-3' controlId="Nombre">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="Nombre" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="text"
                                placeholder={intl.formatMessage({ id: 'IngreseNombre' })}
                                aria-label="Search"
                                onChange={e => setNombre(e.target.value)}
                                value={nombre}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="Country">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="Country" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="text"
                                placeholder={intl.formatMessage({ id: 'EnterCountry' })}
                                aria-label="Search"
                                onChange={e => setPais(e.target.value)}
                                value={pais}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="City">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="City" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="text"
                                placeholder={intl.formatMessage({ id: 'EnterCity' })}
                                aria-label="Search"
                                onChange={e => setCiudad(e.target.value)}
                                value={ciudad}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="PurchasingProfile">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="ProfileAdquisitivo" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="text"
                                placeholder={intl.formatMessage({ id: 'EnterPerfilAdquisitvo' })}
                                aria-label="Search"
                                onChange={e => setPerfilAdquisitivo(e.target.value)}
                                value={perfilAdquisitivo}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="Correo">
                            <Form.Label className='LabelsForm'>
                                <FormattedMessage id="Correo" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="email"
                                placeholder={intl.formatMessage({ id: 'EmailIngreso' })}
                                aria-label="Search"
                                onChange={e => setCorreo(e.target.value)}
                                value={correo}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="Password">
                            <Form.Label>
                                <FormattedMessage className='LabelsForm' id="Contrasena" />
                            </Form.Label>
                            <Form.Control className="me-2 inputText" type="password"
                                placeholder={intl.formatMessage({ id: 'PassHolder' })}
                                aria-label="Search"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="loginfooter">
                    {fallo && <Form.Label className="LabelsForm">{error}</Form.Label>}
                    <Button variant="primary" className="botonfooterSignUp" onClick={SignUpRegister}>
                        <FormattedMessage id="Registrarse" />
                    </Button>
                    <Button variant="secondary" className="botonfooterSignUp" onClick={handleCloseSignUp}>
                        <FormattedMessage id="Cancel" />
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <Modal className="LoginContainer" show={fallo} onHide={handleCloseError}>
                <Form.Label className='EtiquetaLogin'>
                    {error}
                </Form.Label>
                <Button variant="secondary" className="botonfooterSignUp" onClick={handleCloseError}>
                    <FormattedMessage id="Cancel" />
                </Button>
            </Modal> */}
        </Container>
    );
}

export default Banner;
