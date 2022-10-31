import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import SavedResults from './SavedResults';

function SavedContainer() {
    const [dbBookState, setDbBookState] = useState();

    const fetchSavedBooks = () => {
        axios.get("/api/saved_books")
            .then(res => {
                const data = res.data;
                setDbBookState(data);
            })
            .catch(err => console.log(err));
    }

    const handleDeleteBtnClick = (id) => {
        axios.delete(`/api/delete/${id}`)
            .then(res => {
                if (res.data.status === "200") {
                    toast.info('Book deleted from list');
                    setDbBookState(dbBookState.filter(book => book.id !== id));
                } else {
                    toast.error('Something went wrong');
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchSavedBooks();
    }, []);

    return (
        <div>
            {dbBookState ? dbBookState.map(book => (
                <SavedResults
                    key={uuid()}
                    id={book.id}
                    link={book.link}
                    image={book.image}
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    handleDelete={handleDeleteBtnClick}
                />
            )) : <h4 className="mt-4">There are no saved books.</h4>}
        </div>
    )
}

export default SavedContainer;
