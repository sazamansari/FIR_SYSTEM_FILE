import React, { useContext } from 'react';
import { DataContext } from '../utils/DataContext';
import uuid from 'react-uuid';

import SearchResults from './SearchResults';

function ResultsContainer() {
    const [dataState, setDataState] = useContext(DataContext);

    return (
        <div className="rounded bg-light mt-4 p-4">
            <h2 className="h3 mb-4">Results</h2>
            {dataState.length > 0 ? dataState.map(book => (
                <SearchResults
                    key={uuid()}
                    id={book.id}
                    link={book.volumeInfo.canonicalVolumeLink}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                />
            )) : <p>No books found</p>}
        </div>
    )
}

export default ResultsContainer;
