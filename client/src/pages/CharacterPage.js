import { useParams, useLocation } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'
import { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TOKEN } from '../utils/queries';

const CharacterPage = () => {
    const [equipment, setEquipment] = useState(null)
    const [talents, setTalents] = useState(null);
    const location = useLocation()

    // const [loading, data] = useQuery(QUERY_TOKEN);


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
            // const response = await fetch(`https://hidden-retreat-58836.herokuapp.com/https://raider.io/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&name=${charName}&fields=gear%2Ccovenant%2Craid%2Cguild`)
            // const data = await response.json()

            const response = await fetch(`https://raider-io.p.rapidapi.com/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&fields=gear%2Ccovenant%2Craid%2Cguild%2Ctalents&name=${charName}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "raider-io.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_RADERIO_KEY
                }
            })

            const data = await response.json()

            setEquipment(data)



        }
    }, [setEquipment])

    useEffect(() => {
        blizzFetch()

        async function blizzFetch() {
            const response = await fetch(`https://${params.region}.api.blizzard.com/profile/wow/character/${params.realm}/${charName}/specializations?namespace=profile-${params.region}&locale=en_US&access_token=${location.state}`)

            const data = await response.json()

            setTalents(data.specializations[0].talents)
        }
    }, [setTalents])

    console.log(equipment)
    console.log(talents)

    const addHelmBonus = () => {
        const bonusStr = equipment.gear.items.head.bonuses.join(':')

        return <a href="#" data-wowhead={`item=${equipment.gear.items.head.item_id}&ilvl=${equipment.gear.items.head.item_level}&bonus=${bonusStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.head.icon}.jpg`}></img></a>
    }

    const addNeckBonus = () => {
        const bonusStr = equipment.gear.items.neck.bonuses.join(':')

        return <a href="#" data-wowhead={`item=${equipment.gear.items.neck.item_id}&ilvl=${equipment.gear.items.neck.item_level}&bonus=${bonusStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.neck.icon}.jpg`}></img></a>
    }

    const addShoulderBonus = () => {
        const bonusStr = equipment.gear.items.shoulder.bonuses.join(':')

        return <a href="#" data-wowhead={`item=${equipment.gear.items.shoulder.item_id}&ilvl=${equipment.gear.items.shoulder.item_level}&bonus=${bonusStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.shoulder.icon}.jpg`}></img></a>
    }

    // if (equipment) {
    //     addBonus()
    // }



    return (
        <section>

            {equipment !== null &&
                <div>
                    <div>
                        <img src={equipment.thumbnail_url} ></img>
                    </div>
                    <div>
                        <div>
                            <span>{equipment.name}</span>
                        </div>
                        {equipment.guild !== null && (
                            <div>
                                <span>{"<"}{equipment.guild.name}{">"}</span>
                            </div>
                        )}
                        <div>
                            <span>({upperCaseRegion}) {equipment.realm}</span>
                        </div>
                        <div>
                            <span>{equipment.race}<span> {equipment.active_spec_name} {equipment.class}</span></span>
                        </div>
                    </div>
                </div>}

            {equipment !== null && (
                <div>
                    <div>
                        <span>{equipment.gear.item_level_equipped} Item Level</span>
                    </div>
                    <div>

                        {equipment.gear.items.head.bonuses.length < 0 ?
                            <div>
                                <a href="#" data-wowhead={`item=${equipment.gear.items.head.item_id}&ilvl=${equipment.gear.items.head.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.head.icon}.jpg`}></img></a>
                            </div>
                            : <div>
                                {addHelmBonus()}
                            </div>
                        }

                        {equipment.gear.items.neck.bonuses.length < 0 ?
                            <div>
                                <a href="#" data-wowhead={`item=${equipment.gear.items.neck.item_id}&ilvl=${equipment.gear.items.neck.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.neck.icon}.jpg`}></img></a>
                            </div>
                            : <div>
                                {addNeckBonus()}
                            </div>
                        }

                        {equipment.gear.items.shoulder.bonuses.length < 0 ?
                            <div>
                                <a href="#" data-wowhead={`item=${equipment.gear.items.shoulder.item_id}&ilvl=${equipment.gear.items.shoulder.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.shoulder.icon}.jpg`}></img></a>
                            </div>
                            : <div>
                                {addShoulderBonus()}
                            </div>
                        }
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.back.item_id}&ilvl=${equipment.gear.items.back.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.back.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.chest.item_id}&ilvl=${equipment.gear.items.chest.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.chest.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.wrist.item_id}&ilvl=${equipment.gear.items.wrist.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.wrist.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.hands.item_id}&ilvl=${equipment.gear.items.hands.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.hands.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.waist.item_id}&ilvl=${equipment.gear.items.waist.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.waist.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.legs.item_id}&ilvl=${equipment.gear.items.legs.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.legs.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.feet.item_id}&ilvl=${equipment.gear.items.feet.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.feet.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.finger1.item_id}&ilvl=${equipment.gear.items.finger1.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger1.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.finger2.item_id}&ilvl=${equipment.gear.items.finger2.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger2.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.trinket1.item_id}&ilvl=${equipment.gear.items.trinket1.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket1.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.trinket2.item_id}&ilvl=${equipment.gear.items.trinket2.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket2.icon}.jpg`}></img></a>
                        </div>
                        <div>
                            <a href="#" data-wowhead={`item=${equipment.gear.items.mainhand.item_id}&ilvl=${equipment.gear.items.mainhand.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.mainhand.icon}.jpg`}></img></a>
                        </div>
                    </div>
                </div>
            )}

            {(talents && equipment) !== null && (
                <div>
                    <div>
                        <h3>Talents</h3>
                    </div>
                    <div>
                        {talents.map((item, index) => (
                            <div key={index}>
                                <a href="#" data-wowhead={`spell=${item.spell_tooltip.spell.id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.talents[index].icon}.jpg`}></img></a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default CharacterPage