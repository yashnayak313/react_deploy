
import {useEffect, useState} from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchErr, setFetchErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchAPI = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken : source.token
                })
                if(isMounted) {
                    setData(response.data)
                    setFetchErr(null);
                }
            }

            catch (err) {
                if(isMounted) {
                    setFetchErr(err.message)
                    setData([])
                }
            }
            finally {
                isMounted && setTimeout(() => {setIsLoading(false)}, 2000)
            }
        }

        fetchAPI(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])


    return { data, fetchErr , isLoading }

}

export default useAxiosFetch
