import { FormattedMessage } from "react-intl";
import React, { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlatoCard from './platoCard';

function PlatosList(props) {
    const [productData, setProductData] = useState([]);
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
                    const URL = 'http://localhost:3000/api/v1/establecimientos/'+props.prop+'/menus';
                    const productResponse = await fetch(URL, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (productResponse.ok) {
                        const data = await productResponse.json();
                        const productosResponseMenu = await fetch('http://localhost:3000/api/v1/menus/'+data[0].id+'/productos',{
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (productosResponseMenu.ok) {
                            const productosMenu = await productosResponseMenu.json();
                            setProductData(productosMenu);
                        }
                        
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
                <FormattedMessage id="Products" />
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
                    {productData.map((product) => (
                        <PlatoCard
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

export default PlatosList;