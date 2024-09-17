import { useSelector, useDispatch } from 'react-redux';
import { addMovie } from "../../redux/reducers/movies";
import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const AddMovies = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.token);

    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        genreName: '',
        genreDescription: '',
        directorName: '',
        directorBio: '',
        directorBirth: '',
        directorDeath: '',
        actors: '',
        imageURL: '',
        featured: false,
    });

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMovie({
            ...newMovie,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading...');

        const formattedMovie = {
            Title: newMovie.title,
            Description: newMovie.description,
            Genre: {
                Name: newMovie.genreName,
                Description: newMovie.genreDescription,
            },
            Director: {
                Name: newMovie.directorName,
                Bio: newMovie.directorBio,
                Birth: newMovie.directorBirth,
                Death: newMovie.directorDeath,
            },
            Actors: newMovie.actors.split(',').map(actor => actor.trim()),
            ImagePath: newMovie.imageURL,
            Featured: newMovie.featured,
        };

        try {
            const response = await fetch("http://localhost:5500/movies", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedMovie)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            dispatch(addMovie(data));
            setStatus('succeeded');
            console.log('movie added', data);
            setNewMovie({
                title: '',
                description: '',
                genreName: '',
                genreDescription: '',
                directorName: '',
                directorBio: '',
                directorBirth: '',
                directorDeath: '',
                actors: '',
                imageURL: '',
                featured: false,
            });
            alert('Movie Added successfully!')
        } catch (error) {
            setStatus('failed');
            setError(error.message);
            console.error('Error:', error);
        }
    }

    return (
        <Container>
            <Row>
                <Col md={8} className="mx-auto">
                    <h2>Add a new movie</h2>
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                value={newMovie.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='description'
                                value={newMovie.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="genreName">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type='text'
                                name='genreName'
                                value={newMovie.genreName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="genreDescription">
                            <Form.Label>Genre Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='genreDescription'
                                value={newMovie.genreDescription}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="directorName">
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type='text'
                                name='directorName'
                                value={newMovie.directorName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="directorBio">
                            <Form.Label>About the director</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='directorBio'
                                value={newMovie.directorBio}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="directorBirth">
                            <Form.Label>Director was born on</Form.Label>
                            <Form.Control
                                type='text'
                                name='directorBirth'
                                value={newMovie.directorBirth}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="directorDeath">
                            <Form.Label>Director passed away on</Form.Label>
                            <Form.Control
                                type='text'
                                name='directorDeath'
                                value={newMovie.directorDeath}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="imageURL">
                            <Form.Label>Movie's Image URL</Form.Label>
                            <Form.Control
                                type='text'
                                name='imageURL'
                                value={newMovie.imageURL}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="actors">
                            <Form.Label>Actors</Form.Label>
                            <Form.Control
                                type='text'
                                name='actors'
                                value={newMovie.actors}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="featured">
                            <Form.Label>Is it featured?</Form.Label>
                            <Form.Check
                                type='checkbox'
                                name='featured'
                                checked={newMovie.featured}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant='primary' type='submit'>Add Movie</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMovies;
