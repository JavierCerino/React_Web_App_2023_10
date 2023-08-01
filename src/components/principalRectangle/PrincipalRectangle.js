import React from "react";
import { div, Button, Container,Row } from "react-bootstrap";
import './PrincipalRectangle.css';
import RestaurantList from "../restaurantList/restaurantList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import DesayunoList from "../desayunoList/desayunoList";
import AlmuerzoList from "../almuerzoList/almuerzoList";
import { FormattedMessage } from "react-intl";

function PrincipalRectangle() {
    return (
        <div className="mainRectangle">
            <div className="row centerThings">
                <div className="textHambre">
                    <h1>
                        <FormattedMessage id="Slogan" />
                    </h1>
                </div>
                <Button className="buttonDown" variant="primary">
                    <FontAwesomeIcon className="iconForm" icon={faArrowDown} />
                </Button>
            </div>
            <div className="row">
                <RestaurantList />
            </div>
            <div className="row">
                <DesayunoList />
            </div>
            <div className="row">
                <AlmuerzoList />
            </div>

           
        </div>

    );
}

export default PrincipalRectangle;