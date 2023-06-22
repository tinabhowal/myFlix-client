import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
    const filter = useSelector((state) => state.movies.filter);
    const dispatch = useDispatch();

    return (
        <Form.Control
        type="text"
        placeholder="search"
        aria-placeholder="search"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        style={{ width:'80%', marginTop: '100px', marginBottom: '20px'}}
        />
        );
};