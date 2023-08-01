import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import './Restaurant.css';
import SearchBar from "../shared/searchBar/SearchBar";
import AliceCarousel from "react-alice-carousel";

const { useEffect, useState } = require("react");

function Restaurants() {
  const [restaurant, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantCopia, setRestaurantCopy] = useState([]);

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
            setFilteredRestaurants(data);
            setRestaurantCopy(data);
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
    setFilteredRestaurants(restaurantCopia);
  };

  const applyFilters = (searchText, priceRangeFilters, averageRatingFilters, tagFilters) => {
    let filtered = restaurant;

    // Apply name filter
    if (searchText.trim() !== '') {
      filtered = filtered.filter((restaurant) =>
        restaurant.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRangeFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        const price = restaurant.costoPromedio;
        console.log(price);
        // last position of priceRangeFilters is the max price
        return price <= getMoneyValue(priceRangeFilters[priceRangeFilters.length - 1]);
      });
    }

    // Apply average rating filter
    if (averageRatingFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        const averageRating = restaurant.calificacionPromedio;
        return averageRatingFilters.includes(averageRating.toString());
      });
    }

    // Apply tag filter
    if (tagFilters.length > 0) {
      filtered = filtered.filter((restaurant) => {
        const tags = restaurant.tags;
        if (!tags) {
          return false;
        }
        return tagFilters.some((filter) => tags.includes(filter));
      });
    }

    setFilteredRestaurants(filtered);
  };

  const getMoneyValue = (moneySign) => {
    switch (moneySign) {
      case '$':
        return 10;
      case '$$':
        return 20;
      case '$$$':
        return 30;
      case '$$$$':
        return 40;
      default:
        return 0;
    }
  };

  return (
    <div>
      <SearchBar applyFilters={applyFilters} clearFilters={clearFilters} />
      <AliceCarousel autoPlay autoPlayInterval="3000" infinite="true" disableButtonsControls="true" mouseTracking>
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((restaurant) => (
          <Card className="restaurantCard" key={restaurant.id}>
            <Row>
              <Col>
                <Card.Body className="restaurantDescriptionCard">
                  <Card.Title className="restaurantCard"> 
                  <h3 className="label_title"> Nombre </h3>
                  <h4> {restaurant.nombre} </h4>
                  </Card.Title>
                  <br/>
                  <hr style={{color:"black", borderTop: "4px solid black" }}/>
                  <Card.Text className="restaurantCard">
                  <h3 className="label_title"> Dirección </h3>  
                  <h4 className="res"> {restaurant.direccion} </h4>
                  </Card.Text>
                  <Card.Text className="restaurantCard">
                  <h3 className="label_title"> Capacidad </h3>  
                  <h4 className="res"> {restaurant.capacidad} </h4>
                  </Card.Text>
                  <Card.Text className="restaurantCard">
                  <h3 className="label_title"> Costo promedio </h3>  
                  <h4 className="res"> {restaurant.costoPromedio} </h4>
                  </Card.Text>
                  <Card.Text className="restaurantCard">
                  <h3 className="label_title"> calificacion Promedio </h3>  
                  <h4 className="res"> {restaurant.calificacionPromedio} </h4>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col>
                <Card.Img
                  className="restaurantCardImage"
                  variant="top"
                  src={restaurant.image}
                  alt={restaurant.name}
                />
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <div>No restaurants found.</div>
      )}
      </AliceCarousel>
    </div>
  );
}

export default Restaurants;