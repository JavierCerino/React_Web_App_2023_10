import React, { useState } from 'react';
import Calendario from '../calendar/Calendario';
import './HacerReserva.css';
import AlmuerzoCard from '../almuerzoList/almuerzoCard';
import { FormattedMessage } from "react-intl";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


function HacerReserva() {
    const location = useLocation();
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservaCreated, setReservaCreated] = useState(false);
    const [restaurant, setRestaurants] = useState([]);
    const [firstRestaurant, setFirstRestaurantID] = useState(null);
    const [reservationData, setReservationData] = useState({
        fecha: selectedDate,
        mesaAsignada: -1,
        numPersonas: 0,
        tipo: '',
        descripcion: 'Default description',
        establecimiento: {
            id: ''
        }
    });

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

                    const restaurantResponse = await fetch('http://localhost:3000/api/v1/establecimientos', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (restaurantResponse.ok) {
                        const data = await restaurantResponse.json();
                        setRestaurants(data);
                        setFirstRestaurantID(data[0].id);
                        setReservationData({
                            ...reservationData,
                            establecimiento: {
                                id: data[0].id,
                                nombre: data[0].nombre,
                                direccion: data[0].direccion,
                                capacidad: data[0].capacidad,
                                costoPromedio: data[0].costoPromedio,
                                calificacion: data[0].calificacion
                            }
                        });
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

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const cardId = urlParams.get('cardId');
        const cardNombre = urlParams.get('cardNombre');
        const cardImage = urlParams.get('cardImage');

        // Set the selectedCard state with the retrieved card information
        setSelectedCard({
            id: cardId,
            nombre: cardNombre,
            image: cardImage
        });
    }, [location.search]);
    const [activeButton, setActiveButton] = useState(null);
    const [additionalButton, setAdditionalButton] = useState(null);
    const almuerzoExp = [{ id: 1, nombre: "Almuerzo 1", image: "https://i.imgur.com/4QX5j8u.jpg" }]

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
        setReservationData({
            ...reservationData,
            numPersonas: buttonIndex
        });
    };

    const handleAdditionalButtonClick = (buttonIndex) => {
        setAdditionalButton(buttonIndex);
        let tipo = '';
        if (buttonIndex === 1) {
            tipo = 'Para llevar';
        }
        else {
            tipo = 'En sitio';
        }

        setReservationData({
            ...reservationData,
            tipo: tipo
        });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('bearerToken');
            const response = await fetch('http://localhost:3000/api/v1/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                console.log('Reservation created successfully');
                setReservaCreated(true);
                // Handle success scenario
            } else {
                console.error('Failed to create reservation');
                // Show server error message
                
            }
        } catch (error) {
            console.error('Failed to create reservation', error);
            // Handle error scenario
        }
    };

    return (
        <div className="HacerReserva">
            <div className="leftRectangle"></div>
            <div className="contentWrapper">
                <div className="bigImage">
                    <div className="imageText">
                        <FormattedMessage id="MakeReservation" />
                    </div>
                </div>
                <div className="rightRectangle">
                    <div className="text">
                        <FormattedMessage id="ChosenDish" />
                    </div>
                    {selectedCard && <AlmuerzoCard props={selectedCard} />}
                    <div className="text">
                        <FormattedMessage id="SelectADate" />
                    </div>
                    <div className="calendar">
                        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>
                    <div className="text">
                        <FormattedMessage id="Availability" />
                    </div>
                    <div className='buttons'>
                        <button className={activeButton === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
                            1
                        </button >
                        <button className={activeButton === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
                            2
                        </button>
                        <button className={activeButton === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
                            3
                        </button>
                        <button className={activeButton === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
                            4
                        </button>
                        <button className={activeButton === 5 ? 'active' : ''} onClick={() => handleClick(5)}>
                            5
                        </button>
                        <button className={activeButton === 6 ? 'active' : ''} onClick={() => handleClick(6)}>
                            6
                        </button>
                    </div>
                    <div className="additionalButtons">
                        <button className={additionalButton === 1 ? 'active' : ''} onClick={() => handleAdditionalButtonClick(1)}>
                            <FormattedMessage id="Take-Out" />
                        </button>
                        <button className={additionalButton === 2 ? 'active' : ''} onClick={() => handleAdditionalButtonClick(2)}>
                            <FormattedMessage id="OnSite" />
                        </button>
                    </div>
                    <a className="continueButton" onClick={handleSubmit}>
                        <span>
                            <FormattedMessage id="Continue" />
                        </span>
                        <div className="arrow"></div>
                    </a>
                </div>
                {/* Make div to appear if reservaCreated is true */}
                {reservaCreated && <div className="reservationCreated">
                    <h3>
                        <FormattedMessage id="ReservationCreated" />
                    </h3>

                    </div>
                }
            </div>
        </div>
    );
}

export default HacerReserva;