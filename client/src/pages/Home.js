import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';



const Home = () => {
    const { loading, data } = useQuery(QUERY_TOKEN);

    if (!loading) {
        if (data.getToken.length === 0) {
            fetch("https://us.battle.net/oauth/token", {
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_client_id_secret}=`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            }).then(response => response.json()).then(fetchData => console.log(fetchData.access_token))
        }
        console.log(data);
    }

    return (
        <section>
            <h1>Hello</h1>
            <p>fdlakjfldakl</p>
        </section>
    )
}

export default Home;