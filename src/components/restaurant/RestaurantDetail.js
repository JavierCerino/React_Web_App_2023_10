import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef , React} from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import './Restaurant.css';
import { FormattedMessage } from 'react-intl';
import { Container, Modal } from "react-bootstrap";
import PlatosList from "../platosList/platosList";
import { useNavigate } from "react-router-dom";


function RestaurantDetail(props) {
    const params = useParams();
    const navigate = useNavigate();
    const restaurantId = params.restauranteId;
    const [restaurant, setRestaurant] = useState([]);
    const [showCalificar, setShowCalificar] = useState(false);
    const [numerador, setNumerador] = useState(0);
    const [total, setTotal] = useState(1);
    
    const [calificacion, setCalificacion] = useState('total');

    const handleCalificacionChange = (e) => {
      setCalificacion(e.target.value);
    };

    const handleBook = () => 
    {
        navigate('/reservas/');
    }

    const calificar = (e) => {
      setShowCalificar(false);
      setTotal(total+1)
      console.log("calificacion" + calificacion)
      console.log("Total" + total)
      setNumerador(numerador+calificacion)
      console.log("Numerador" + numerador)
    };
    
   const handleClose = () => setShowCalificar(false);
   const handleShowCalificar = () => setShowCalificar(true);
   
   const renderOpcionesCalificacion = () => {
    const opciones = [1, 2, 3, 4, 5];
    return opciones.map((opcion) => (
      <option key={opcion} value={opcion}>
        {opcion}
      </option>
    ));
  };


    useEffect(() => {
        const loginUser = async () => {
            try {
                window.scrollTo(0, 0);
                // Sending login request
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

                    const productResponse = await fetch('http://localhost:3000/api/v1/establecimientos/'+restaurantId, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (productResponse.ok) {
                        const data = await productResponse.json();
                        setRestaurant(data);
                        setNumerador(data.calificacionPromedio)

                    } else {
                        console.error('Failed to fetch restaurant data');
                    }
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('Login failed', error);
            }
        };
        loginUser();
    }, []);

    return (
      <div>
        <Card className="restaurantCardDetail" key={restaurant.id}>
            <Row>
              <Col>
                <Card.Body className="restaurantDescriptionCard">
                  <Card.Title className="restaurantCardName"> 
                  {restaurant.nombre}
                  </Card.Title>
                  <Card.Text className="restaurantAddress">
                  {restaurant.direccion}</Card.Text>
                  <Card.Text className="restaurantDescriptionText"> 1.1
                  <FormattedMessage id="FromYou"/>
                  </Card.Text>
                  <Card.Text className="restaurantDescriptionTitle"> 
                    <FormattedMessage id="AverageCost"/>
                  </Card.Text>
                  <Card.Text className="restaurantDescriptionText"> {restaurant.costoPromedio} </Card.Text>
                  <Card.Text className="restaurantDescriptionTitle"> 
                    <FormattedMessage id="AverageScore"/>
                  </Card.Text>
                  <Card.Text className="restaurantDescriptionText"> {numerador/total} </Card.Text>
                </Card.Body>
                <Button className="calificarButton" variant="primary" onClick={handleShowCalificar}>
                            <FormattedMessage id="Qualify" />
                </Button>
                <span className="boton-separador"></span>
                <Button className="reservarButton " variant="primary" onClick={()=>{handleBook()}}>
                            <FormattedMessage id="Book" />
                </Button>
              </Col>
              <Col>
                <Card.Img
                  className="restaurantCardImage"
                  variant="top"
                  src={restaurant.image}
                  alt={restaurant.name}
                />
              </Col>
            </Row>
            <PlatosList prop={restaurantId}/>
          </Card>
          <Modal className="calificarContainer" show={showCalificar} onHide={handleClose}>
                <Modal.Body className="Calificar">
                    <Form>
                        <Form.Label>
                            Calificación
                        </Form.Label>
                        <Form.Control
                          className="me-2 inputText"
                          as="select"
                          value={calificacion}
                          onChange={handleCalificacionChange}
                          >
                          <option value="">Seleccionar calificación</option>
                          {renderOpcionesCalificacion()}
                        </Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="loginfooter">
                    <Button variant="primary" className="botonfooter" onClick={calificar}>
                      <FormattedMessage id="Check" />
                    </Button>
                    <Button variant="secondary" className="botonfooter" onClick={handleClose}>
                        <FormattedMessage id="Cancel" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}



export default RestaurantDetail;
