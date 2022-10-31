import React from 'react';

import SavedContainer from '../components/SavedContainer';

function Search() {
    return (
        <div className="rounded bg-light p-4">
            <h2 className="h3">Saved Books</h2>
            <SavedContainer />
        </div>
    )
}

export default Search;