import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';
import { ADD_BLIZZTOKEN } from '../utils/mutations';

import Search from '../components/Search'

const Home = () => {



    return (
        <section>
            <h1>Hello</h1>
            <p>fdlakjfldakl</p>
            <Search />
        </section>
    )
}

export default Home;