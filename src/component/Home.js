
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({isLoading, fetchErr} ) => {
  const searchResults = useStoreState((state) => state.searchResults)
  const sortedPosts = [...searchResults].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
  return (
    <main className='Home'>
    <>
    {isLoading ? (<p>Loading for posts ... </p>): 
    (fetchErr ?  (<p style={{'color':'red' }}>{fetchErr}</p>) : 
      (sortedPosts.length ? (
            <Feed posts = {sortedPosts} />
      ) : (
            <p style={{ marginTop : "2rem"}}>
                No posts to display.
            </p>
      )))
    }

      </>
    </main>
  )
}

export default Home
