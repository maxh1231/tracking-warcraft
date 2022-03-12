import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';
import { ADD_BLIZZTOKEN } from '../utils/mutations';

import Search from '../components/Search'



const Home = () => {
    const { loading, data } = useQuery(QUERY_TOKEN);
    const [addToken] = useMutation(ADD_BLIZZTOKEN)

    let access_token;
    useEffect(() => {
        if (!loading && data.getToken.length === 0) {

            fetch("https://us.battle.net/oauth/token", {
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_client_id_secret}=`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            }).then(response => response.json())
                .then((fetchData) => {
                    console.log(fetchData.access_token)
                    access_token = fetchData.access_token;
                    addToken({
                        variables: { access_token }
                    })
                })
        } else if (!loading && data.getToken.length > 0) {
            access_token = data.getToken[0].access_token;
        }
    }, [data])

    // if (!loading) {
    //     console.log(data.getToken[0].access_token);

    // }

    return (
        <section>
            <h1>Hello</h1>
            <p>fdlakjfldakl</p>
            {(!loading && data.getToken.length > 0) ? <Search access_token={data.getToken[0].access_token} /> : <Search access_token={access_token} />}
        </section>
    )
}

export default Home;