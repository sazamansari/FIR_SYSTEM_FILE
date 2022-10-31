import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../utils/DataContext';

function SearchForm() {
    const [bookState, setBookState] = useState({ search: "" });
    const [dataState, setDataState] = useContext(DataContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookState({ ...bookState, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let searchTerm = bookState;
        searchTerm = searchTerm.search.toLowerCase();

        axios.get(`/api/search/${searchTerm}`)
            .then(res => {
                const data = res.data;
                setDataState(data);
            })
            .catch(err => console.log(err));

        setBookState({ search: "" });
    }

    return (
        <div>
            <form className="mt-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        aria-describedby="bookSearch"
                        placeholder="Enter the name of the book to search"
                        value={bookState.search}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;
