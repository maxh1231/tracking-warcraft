import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';



const Home = () => {
    const { loading, data } = useQuery(QUERY_TOKEN);

    if (!loading) {
        console.log(data);
        console.log('hi');
    }

    return (
        <section>
            <h1>Hello</h1>
            <p>fdlakjfldakl</p>
        </section>
    )
}

export default Home;