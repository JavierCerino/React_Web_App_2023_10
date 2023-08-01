import { Card, Row, Col, Container } from "react-bootstrap";
import './desayunoList.css';
import DesayunoCard from "./desayunoCard";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DesayunoList(props) {

    const [productData, setProductData] = useState([]);
    const [desayunoData, setDesayuno] = useState([]);
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

                    const productResponse = await fetch('http://localhost:3000/api/v1/productos', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (productResponse.ok) {
                        const data = await productResponse.json();
                        setProductData(data);

                        const desayuno = data.filter((product) => product.tipoProducto === 'Desayuno');
                        setDesayuno(desayuno);
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

    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    return (
        <div className="desayunoList">
            <h1>
                <FormattedMessage id="Breakfast" />
            </h1>
            <div className="carousel-button-container">
                <div
                    className="carousel-button carousel-button-prev"
                    onClick={handlePrevClick}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="carousel-arrow-icon" />
                </div>
                <AliceCarousel
                    responsive={{
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                        992: { items: 4 },
                    }}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    ref={carouselRef}
                    infinite={true}
                >
                    {desayunoData.map((product) => (
                        <DesayunoCard
                            key={product.id}
                            props={product}
                        />
                    ))}
                </AliceCarousel>
                <div
                    className="carousel-button carousel-button-next"
                    onClick={handleNextClick}
                >
                    <FontAwesomeIcon icon={faChevronRight} className="carousel-arrow-icon" />
                </div>
            </div>
        </div>
    );
}

export default DesayunoList;