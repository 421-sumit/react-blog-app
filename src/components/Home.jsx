import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../components/Pagination';
import BlogList from './BlogList';
import UpdateBlog from './UpdateBlog';
import CreateBlog from './CreateBlog';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
// import styles from './home.module.css';

const Home = () => {
    // usestate for manipulating blog data
    const [data, setData] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [updatePost, setUpdatePost] = useState({ id: '', title: '', body: '' });
    const [selectedPostId, setSelectedPostId] = useState('');

    // usestate for manipulating pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    // usestate for conditional rendering of create blog form 
    const [showCreate, setShowCreate] = useState(false);
    const handleCreateClose = () => setShowCreate(false);
    const handleCreateShow = () => setShowCreate(true);

    // usestate for conditional rendering of update blog form 
    const [showUpdate, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    // useeffect for continuous rendering blog list 
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setData(response.data))
        // .catch(error => console.error('Error fetching data', error));
    }, []);


    // function for create new blog
    const handleCreate = () => {
        axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
            .then(response => {
                setData([...data, response.data]);
                setNewPost({ title: '', body: '' });
                handleCreateClose();
            })
            .catch(error => console.error('Error creating post', error));
    };

    //function for delete the blog 
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setData(data.filter(post => post.id !== id));
            })
            .catch(error => console.error('Error deleting post', error));
        }
    };

    // function for update the blog
    const handleUpdate = () => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}`, updatePost)
            .then(response => {
                setData(data.map(post => post.id === selectedPostId ? response.data : post));
                setUpdatePost({ id: '', title: '', body: '' });
                setSelectedPostId('');
                handleUpdateClose(false);
            })
            .catch(error => console.error('Error updating post', error));
    };

    //function for setting and showing the update form
    const handleUpdateClick = (post) => {
        setUpdatePost({ id: post.id, title: post.title, body: post.body });
        setSelectedPostId(post.id);
        handleUpdateShow(true);
    };


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='pt-1'>
            <Stack direction="horizontal">
                <div className="p-2"><h2>Blogs</h2></div>
                <div className="p-2 ms-auto"><Button variant="outline-dark" onClick={handleCreateShow}><i class="fa-solid fa-marker"></i> New Blog</Button>          
            </div>
            </Stack>
        {/* displaying update form */}
            {(
                <Modal  show={showUpdate} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                <h3>Update blog</h3>
                </Modal.Header>
                <Modal.Body>
                    <UpdateBlog updatePost={updatePost} setUpdatePost={setUpdatePost} handleUpdate={handleUpdate} />
                </Modal.Body>
              </Modal>
            )}
        {/* displaying create form */}
            {(
                <Modal show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                <h3> Write blog </h3>
                </Modal.Header>
                <Modal.Body>
                    <CreateBlog newPost={newPost} setNewPost={setNewPost} handleCreate={handleCreate} />
                </Modal.Body>
              </Modal>

            )}
            {/* rendering blog list */}
            <BlogList data={currentPosts} handleDelete={handleDelete} handleUpdateClick={handleUpdateClick} />

            {/*  rendering pagination */}
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    paginate={paginate} />
        </div >
    );
};

export default Home;