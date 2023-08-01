import React from "react";
import { Card} from "react-bootstrap";
import './almuerzoList.css';

function AlmuerzoCard(props) {
    return (
        <Card className = "platoCard">
            <Card.Body>
                <Card.Img className="platoImage" variant="top" src={props.props.image} alt={props.props.nombre} />
                <Card.Text className= "platoName">
                    {props.props.nombre}
                </Card.Text>
            </Card.Body>
        </Card>
           
    );
}

export default AlmuerzoCard;