import { useParams, Link, useNavigate } from "react-router-dom";
import Missing from "./Missing";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = ( ) => {
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const { id } = useParams(); // use to get the parameter
  const post = getPostById(id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    deletePost(id);
    navigate("/")
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <Missing />
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
