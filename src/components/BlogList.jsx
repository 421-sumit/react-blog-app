
import React from 'react';
import Button from 'react-bootstrap/Button';

export const BlogList = ({ data, handleDelete, handleUpdateClick }) => {
    return (
        <>
            {data && data.map((post) => (
                <div className='p-1' key={post.id}>
                    <div className="card border-info" style={{backgroundColor:'#f0f0f0'}}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                            <Button variant='danger' className='m-2' onClick={() => handleDelete(post.id)}><i class="fa-solid fa-trash"></i> Delete</Button>
                            <Button variant='secondary' onClick={() => handleUpdateClick(post)}><i class="fa-solid fa-pen-to-square"></i> Update</Button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BlogList;