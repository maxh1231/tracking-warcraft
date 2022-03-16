import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../../utils/queries';
import { ADD_BLIZZTOKEN } from '../../utils/mutations';

const Search = () => {
    const [field, setField] = useState('')
    const [accessToken, setAccessToken] = useState(null)

    const { loading, data } = useQuery(QUERY_TOKEN);
    const [addToken] = useMutation(ADD_BLIZZTOKEN)

    useEffect(() => {
        if (!loading && data.getToken.length === 0) {
            fetchToken()
        } else if (!loading && data.getToken.length > 0) {
            setAccessToken(data.getToken[0].access_token)
        }
    }, [data])

    const fetchToken = async () => {
        const response = await fetch("https://us.battle.net/oauth/token", {
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${process.env.REACT_APP_client_id_secret}=`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })

        const token = await response.json();
        console.log(token)

        addToken({
            variables: token
        })

        setAccessToken(token.access_token)
    }


    const handleChange = (event) => {
        setField(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


    }


    console.log(accessToken)
    console.log(typeof (accessToken))

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                />
                <button type='submit'><Link to={{ pathname: `/search-results/${field}`, state: { name: 'hi' } }}>Submit</Link></button>
                {/* <button type='submit'><Link to={`/search-results/${field}`} component={accessToken}>Submit</Link></button> */}
            </form>
        </section>
    )
}

export default Search;