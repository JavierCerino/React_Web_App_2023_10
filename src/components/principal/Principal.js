import React from "react";
import './Principal.css';
import { Row, Button, Container, Card } from "react-bootstrap";
import PrincipalRectangle from "../principalRectangle/PrincipalRectangle";
import { FormattedMessage } from "react-intl";

function Principal() {
    return (
        <div style={{overflowX: "hidden"}}>
            <div className="contenedor">
                <div className="row w-100 h-100 filaTarjeton">
                    <div className="col-6 columnas">
                        <div className="card tarejetaLogo">
                            <img className="imagenLogo" src="https://cdn.discordapp.com/attachments/1106582725000966205/1106582741853667429/image.png" alt="Card Image" />
                            <div className="card-body">
                                <h1 className="principalText">
                                    <FormattedMessage id="PrincipalText"/>
                                </h1>
                                <Card.Img className="manyDishes" variant="top" src="https://cdn.discordapp.com/attachments/903794830914756638/1107429250774089838/manyDishes.png" alt="EatHere Logo" />
                            </div>
                        </div>
                    </div>
                    <div className="col-6 columnas">
                        <div className="card tarjetaCamarones">
                            <Card.Img className="firstImage" src="https://cdn.discordapp.com/attachments/903794830914756638/1107424179634057368/firstDish.png" alt="firstDish"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="PrincipalContenedor" >
                <PrincipalRectangle/>
            </div>
        </div>
    );
}

export default Principal;