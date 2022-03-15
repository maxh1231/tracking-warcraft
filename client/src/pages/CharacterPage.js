import { useParams } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'

const CharacterPage = () => {
    const params = useParams();
    console.log(params)

    const api = new BlizzAPI({
        region: `${params.region}`,
        clientId: process.env.REACT_APP_client_id,
        clientSecret: process.env.REACT_APP_client_secret,
    });

    console.log(process.env.REACT_APP_client_id)
    console.log(process.env.REACT_APP_client_secret)

    const data = api.query(`/profile/wow/character/tichondrius/maxh/equipment?namespace=profile-us&locale=en_US`)
    console.log(data);



    return (
        <section>hi character page</section>
    )
}

export default CharacterPage