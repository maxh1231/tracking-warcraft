import { useParams } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'
import { useEffect, useState } from "react";

const CharacterPage = () => {
    const [character, setCharacter] = useState(null)


    const params = useParams();
    const charName = params.name.toLowerCase()
    const upperCaseRegion = params.region.toUpperCase();
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
            const response = await fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&name=${charName}&fields=gear%2Ccovenant%2Craid%2Cguild`)
            const data = await response.json()

            setCharacter(data)

        }
    }, [setCharacter])

    console.log(character)

    return (
        <section>

            {character !== null &&
                <div>
                    <div>
                        <img src={character.thumbnail_url} ></img>
                    </div>
                    <div>
                        <div>
                            <span>{character.name}</span>
                        </div>
                        {character.guild !== null && (
                            <div>
                                <span>{"<"}{character.guild.name}{">"}</span>
                            </div>
                        )}
                        <div>
                            <span>({upperCaseRegion}) {character.realm}</span>
                        </div>
                        <div>
                            <span>{character.race}<span> {character.active_spec_name} {character.class}</span></span>
                        </div>
                    </div>
                </div>}
        </section>
    )
}

export default CharacterPage