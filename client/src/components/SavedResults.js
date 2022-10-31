import React from 'react';

function SavedResults({ id, link, image, title, authors, description, handleDelete }) {

    const handleViewBtnClick = () => {
        window.open(link, '_blank');
    };

    return (
        <div className="border p-3">
            <div className="d-flex flex-row-reverse">
                <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(id)}
                >Delete</button>
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleViewBtnClick}
                >View</button>
            </div>
            <div className="media">
                <img
                    src={image}
                    className="align-self-center mr-3"
                    alt={title}
                />
                <div className="media-body">
                    <h5 className="mt-0">{title}</h5>
                    <p>Written By: <span>{authors}</span></p>
                    <p className="mb-0">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default SavedResults;
