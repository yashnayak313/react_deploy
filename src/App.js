import Home from "./component/Home";
import NewPost from "./component/NewPost";
import PostPage from "./component/PostPage";
import About from "./component/About";
import Layout from "./component/Layout";
import EditPost from "./component/EditPost";
import Missing from "./component/Missing";
import { Route, Routes } from "react-router-dom";
// import { DataProvider } from "./context/DataContext";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";


function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchErr, isLoading } = useAxiosFetch("http://localhost:3500/posts" );

  useEffect( () => {
     setPosts(data);

  }, [data, setPosts]);


  return (

    <Routes>
      <Route
        path="/"
        element={<Layout  />}
      >
        <Route index element={<Home isLoading = {isLoading} fetchErr = {fetchErr}  />} />
        <Route
          path="post"
          index
          element={
            <NewPost
            />
          }
        />
        <Route
          path="edit/:id"
          index
          element={
            <EditPost/>
          }
        />
        <Route
          path="post/:id"
          index
          element={<PostPage />}
        />
        <Route path="about" index element={<About />} />
        <Route path="*" index element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
