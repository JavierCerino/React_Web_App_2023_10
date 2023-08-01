import { Card, Row, Col , Container} from "react-bootstrap";
import AliceCarousel from 'react-alice-carousel';
import './restaurantList.css';
import React, { useEffect, useState, useRef } from 'react';
import RestaurantCard from "./restaurantCard";

function RestaurantList(props) {
    const [restauranteData, setRestaurant] = useState([]);
    const carouselRef = useRef();
    useEffect(() => {
        const loginUser = async () => {
            try {
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

                    const productResponse = await fetch('http://localhost:3000/api/v1/establecimientos', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (productResponse.ok) {
                        const data = await productResponse.json();
                        setRestaurant(data);

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
        <div className="restaurantList">
            <div className="carousel-button-container">
                <AliceCarousel
                    responsive={{
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                    }}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    ref={carouselRef}
                    infinite={true}
                >
                    {restauranteData.map((restaurant) => (
                        <RestaurantCard 
                            restaurante={restaurant}
                        />
                    ))}
                </AliceCarousel>

            </div>
        </div>
    );

}

export default RestaurantList;
