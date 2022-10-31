import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SearchResults({ id, link, image, title, authors, description }) {
    const darkBtn = "btn btn-dark ml-2";
    const successBtn = "btn btn-success ml-2";
    const [classState, setClassState] = useState(darkBtn);

    const handleViewBtnClick = () => {
        window.open(link, '_blank');
    };

    const handleSaveBtnClick = () => {
        axios.post(`/api/save/${id}`)
            .then(res => {
                if (res.data.status === "saved") {
                    toast.success(res.data.msg);
                    setClassState(successBtn);
                } else {
                    toast.warn(res.data.msg);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="border p-3">
            <div className="d-flex flex-row-reverse">
                <button
                    type="button"
                    className={classState}
                    onClick={handleSaveBtnClick}
                >Save</button>
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

export default SearchResults;
