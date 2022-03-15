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

            {character !== null && (
                <div>
                    <div>
                        <span>{character.gear.item_level_equipped} Item Level</span>
                    </div>
                    <div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.head.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.head.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.neck.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.neck.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.shoulder.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.shoulder.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.back.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.back.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.chest.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.chest.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.wrist.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.wrist.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.hands.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.hands.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.waist.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.waist.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.legs.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.legs.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.feet.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.feet.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.finger1.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.finger1.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.finger2.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.finger2.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.trinket1.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.trinket1.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.trinket2.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.trinket2.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${character.gear.items.mainhand.item_id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${character.gear.items.mainhand.icon}.jpg`}></img></a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default CharacterPage