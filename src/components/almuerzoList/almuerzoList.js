import './almuerzoList.css';
import AlmuerzoCard from "./almuerzoCard";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AlmuerzoList(props) {

    const [productData, setProductData] = useState([]);
    const [almuerzoData, setAlmuerzo] = useState([]);
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

                        const almuerzo = data.filter((product) => product.tipoProducto === 'Almuerzo');
                        setAlmuerzo(almuerzo);
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
        <div className="almuerzoList">
            <h1>
                <FormattedMessage id="Lunch" />
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
                    {almuerzoData.map((product) => (
                        <AlmuerzoCard
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

export default AlmuerzoList;