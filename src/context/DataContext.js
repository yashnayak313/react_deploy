import { createContext, useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});


export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchErr, isLoading } = useAxiosFetch("http://localhost:3500/posts" );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filterResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("");
    } catch (err) {
      console.log(`Error:  $(err.message)`);
    }
  };

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, dateTime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:  ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error:  $(err.message)`);
    }
  };


    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResults, fetchErr, isLoading, posts, handleDelete, handleEdit, handleSubmit, 
            postTitle, setPostTitle, postBody, setPostBody, editBody, setEditBody, editTitle, setEditTitle
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext;