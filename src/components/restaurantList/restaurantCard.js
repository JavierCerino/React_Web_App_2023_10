import {React} from "react";
import { Card} from "react-bootstrap";
import './restaurantList.css';
import { useNavigate } from "react-router-dom";

function RestaurantCard(props) {
    const restaurant = props.restaurante;
    const navigate = useNavigate();
    const detailRestaurant = (id) => 
    {

        navigate('/restaurantes/'+id);
    }
    return (
        <Card className = "restaurantCard">
            <Card.Body>
                <Card.Text className= "restaurantName">
                    {restaurant.nombre}
                </Card.Text>
                <Card.Img onClick={()=>{detailRestaurant(restaurant.id)}}  className="restaurantImage" variant="top" src={restaurant.image} alt="EatHere Logo" />
            </Card.Body>
        </Card>
    );
}

export default RestaurantCard;