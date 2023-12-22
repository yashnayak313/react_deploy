import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Missing from './Missing'
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from "react-router-dom";


const EditPost = ( ) => {

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
 
  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const getPostById = useStoreState((state) => state.getPostById)
  const { id } = useParams(); // use to get the parameter
  const post = getPostById(id);
  const navigate = useNavigate();

    useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id,e) => {
      e.preventDefault();
      const dateTime = format(new Date(), "MMMM dd, yyyy pp");
      const updatePost = { id, title: editTitle, dateTime, body: editBody };
     editPost(updatePost);
     navigate(`/post/${id}`);
    };

    
  return (
    <main className='NewPost'>
    {post.title && 
    <>
    <h2>Edit Post</h2>
    <form action="" className='newPostForm' onSubmit={(e) => handleEdit(post.id,e)}>
        <label htmlFor="postTitle">Title:</label>
        <input 
        id='postTitle'
        type="text" 
        required
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
         id="postBody" 
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)} 
        />
        <button type='submit'>Submit</button>
    </form>
    </>
    }
    {!post.title &&
    <>
      <Missing />
    </>
    }
</main>
  )
}

export default EditPost
