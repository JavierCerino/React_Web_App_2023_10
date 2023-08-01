import { Card, Row, Col, Container } from "react-bootstrap";
import './productoList.css';
import ProductoCard from "./productoCard";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from "../shared/searchBar/SearchBar";

function Producto(props) {

    const [productoData, setProductData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pruductCopy, setProductCopy]= useState([]);
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
                        setFilteredProducts(data);
                        setProductCopy(data);

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

    const clearFilters = () => {
        setFilteredProducts(pruductCopy);
    }


    const applyFilters = (searchText, tagFilters) => {
        let filtered = productoData;

        // Apply name filter
        if (searchText.trim() !== '') {
            filtered = filtered.filter((productoData) =>
            productoData.nombre.toLowerCase().includes(searchText.toLowerCase()));
        }
        // Apply tag filter
        if (tagFilters.length > 0) {
            filtered = filtered.filter((productoData) => {
                const tags = productoData.tags;
                if (!tags){
                    return false;
                }
            return tagFilters.some((filter)=> tags.includes(filter));
            });
        }
        setFilteredProducts(filtered);
    };

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
        <div>
        <SearchBar applyFilters={applyFilters} clearFilters={clearFilters} />
        {filteredProducts.length > 0 ? (
        <div className="productoList">
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
                    {filteredProducts.map((product) => (
                        <ProductoCard
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
        </div>) : (<h1></h1>)}
    </div>
    );
}

export default Producto;