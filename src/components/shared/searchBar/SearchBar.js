import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Modal } from "react-bootstrap";
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';


function SearchBar({ applyFilters, clearFilters }) {
    const intl = useIntl();
    const [show, setShow] = useState(false);
    const [priceRangeFilters, setPriceRangeFilters] = useState([]);
    const [averageRatingFilters, setAverageRatingFilters] = useState([]);
    const [tagFilters, setTagFilters] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClearFilters = () => {
        clearFilters();
        setShow(false);
    };

    const handlePriceRangeFilterChange = (event) => {
        const filter = event.target.value;
        if (priceRangeFilters.includes(filter)) {
            setPriceRangeFilters(priceRangeFilters.filter((f) => f !== filter));
        } else {
            setPriceRangeFilters([...priceRangeFilters, filter]);
        }
    };

    const handleAverageRatingFilterChange = (event) => {
        const filter = event.target.value;
        if (averageRatingFilters.includes(filter)) {
            setAverageRatingFilters(averageRatingFilters.filter((f) => f !== filter));
        } else {
            setAverageRatingFilters([...averageRatingFilters, filter]);
        }
    };

    const handleTagFilterChange = (event) => {
        const filter = event.target.value;
        if (tagFilters.includes(filter)) {
            setTagFilters(tagFilters.filter((f) => f !== filter));
        } else {
            setTagFilters([...tagFilters, filter]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        applyFilters(searchText, priceRangeFilters, averageRatingFilters, tagFilters);
      };

    const handleApplyFilters = () => {
        applyFilters(searchText, priceRangeFilters, averageRatingFilters, tagFilters);
        handleClose();
    };

    return (
        <div className="parent-element">
            <Form className="SearchBar">
                <Button className="btn btn-outline-success me-2" type="button" onClick={handleShow}>
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
                <Button className="btn btn-outline-danger me-2" type="button" onClick={handleClearFilters}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
                <Form.Control className="me-2" type="search" placeholder={intl.formatMessage({ id: 'Search' })} aria-label="Search" value={searchText}
                onChange={handleSearchChange}/>
                <Button className="btn btn-outline-success" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FormattedMessage id="Filters" />
                            <FontAwesomeIcon className="ms-2" icon={faFilter} />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="priceRange">
                                <Form.Label>
                                    <FormattedMessage id="Price" />
                                </Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="$"
                                    value="$"
                                    onChange={handlePriceRangeFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="$$"
                                    value="$$"
                                    onChange={handlePriceRangeFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="$$$"
                                    value="$$$"
                                    onChange={handlePriceRangeFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="$$$$"
                                    value="$$$$"
                                    onChange={handlePriceRangeFilterChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="averageRating">
                                <Form.Label>
                                    <FormattedMessage id="AverageRating" />
                                </Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="1"
                                    value="1"
                                    onChange={handleAverageRatingFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="2"
                                    value="2"
                                    onChange={handleAverageRatingFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="3"
                                    value="3"
                                    onChange={handleAverageRatingFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="4"
                                    value="4"
                                    onChange={handleAverageRatingFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="5"
                                    value="5"
                                    onChange={handleAverageRatingFilterChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="tags">
                                <Form.Label>
                                    <FormattedMessage id="Tags" />
                                </Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Mexican"
                                    value="Mexican"
                                    onChange={handleTagFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Italian"
                                    value="Italian"
                                    onChange={handleTagFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Vegetarian"
                                    value="Vegetarian"
                                    onChange={handleTagFilterChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Fast Food"
                                    value="Fast Food"
                                    onChange={handleTagFilterChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            <FormattedMessage id="Cancel" />
                        </Button>
                        <Button variant="primary" onClick={handleApplyFilters}>
                            <FormattedMessage id="Apply" />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
}

export default SearchBar;