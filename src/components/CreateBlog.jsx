import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
});

const CreateBlog = ({ newPost, setNewPost, handleCreate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data);
        handleCreate();
    };

    return (
        <form className='p-2' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="createTitle" className="form-label">Title</label>
                <input name="title" {...register('title')} placeholder='Enter Title' type="text" className="form-control" id="createTitle" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                {errors.title && <p className='text-danger'>Title is required</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="createBody" className="form-label">Content</label>
                <textarea name="content"  {...register('content')} placeholder='Enter your content here..' className="form-control" id="createBody" rows="3" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}></textarea>
                {errors.content && <p className='text-danger'>Content is required</p>}
            </div>
            <div className="mb-3">
            <Button type='submit' variant="outline-success" ><i class="fa-solid fa-share"></i> Post</Button>
            </div>
        </form>
    );
};

export default CreateBlog;