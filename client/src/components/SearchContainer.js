import React from 'react';

import SearchForm from './SearchForm';

function SearchContainer() {
    return (
        <div className="rounded bg-light p-4">
            <h2 className="h3">Book Search</h2>
            <SearchForm />
        </div>
    )
}

export default SearchContainer;
