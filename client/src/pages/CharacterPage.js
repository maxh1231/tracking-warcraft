import { useParams } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'
import { useEffect, useState } from "react";

const CharacterPage = () => {
    const [character, setCharacter] = useState(null)


    const params = useParams();
    const charName = params.name.toLowerCase()
    console.log(params)

    const api = new BlizzAPI({
        region: `${params.region}`,
        clientId: process.env.REACT_APP_client_id,
        clientSecret: process.env.REACT_APP_client_secret,
    });

    // console.log(process.env.REACT_APP_client_id)
    // console.log(process.env.REACT_APP_client_secret)

    // const equipData = api.query(`/profile/wow/character/tichondrius/maxh/equipment?namespace=profile-us&locale=en_US`)
    // console.log(equipData);


    useEffect(() => {
        ioFetch();

        async function ioFetch() {
            const response = await fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&name=${charName}&fields=gear`)
            const data = await response.json()

            setCharacter(data)

        }
    }, [setCharacter])

    console.log(character)

    return (
        <section>hi character page</section>
    )
}

export default CharacterPage