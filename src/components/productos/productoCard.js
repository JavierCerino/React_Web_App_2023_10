import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './productoList.css';

function ProductoCard(props) {

    const { id, nombre, image } = props.props;

    const handleClick = () => {
        const urlParams = new URLSearchParams();
        urlParams.append('cardId', id);
        urlParams.append('cardNombre', nombre);
        urlParams.append('cardImage', image);
        window.location.href = `/reservas?${urlParams.toString()}`;
    };
    return (
        <Card className="productoCard" onClick={handleClick}>
            <Card.Body>
                <Card.Img className="platoImage" variant="top" src={props.props.image} alt={props.props.nombre} />
                <Card.Text className="productoName">{props.props.nombre}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductoCard;