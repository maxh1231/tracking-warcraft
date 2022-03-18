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
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.head.bonuses.length > 0) {
            bonusStr = equipment.gear.items.head.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.head.gems.length > 0) {
            gemStr = equipment.gear.items.head.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.head.enchant !== undefined) {
            enchStr = equipment.gear.items.head.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.head.item_id}&ilvl=${equipment.gear.items.head.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.head.icon}.jpg`}></img></a>
    }

    const addNeckBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.neck.bonuses.length > 0) {
            bonusStr = equipment.gear.items.neck.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.neck.gems.length > 0) {
            gemStr = equipment.gear.items.neck.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.neck.enchant !== undefined) {
            enchStr = equipment.gear.items.neck.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.neck.item_id}&ilvl=${equipment.gear.items.neck.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.neck.icon}.jpg`}></img></a>
    }

    const addShoulderBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.shoulder.bonuses.length > 0) {
            bonusStr = equipment.gear.items.shoulder.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.shoulder.gems.length > 0) {
            gemStr = equipment.gear.items.shoulder.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.shoulder.enchant !== undefined) {
            enchStr = equipment.gear.items.shoulder.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.shoulder.item_id}&ilvl=${equipment.gear.items.shoulder.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.shoulder.icon}.jpg`}></img></a>
    }

    const addBackBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.back.bonuses.length > 0) {
            bonusStr = equipment.gear.items.back.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.back.gems.length > 0) {
            gemStr = equipment.gear.items.back.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.back.enchant !== undefined) {
            enchStr = equipment.gear.items.back.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.back.item_id}&ilvl=${equipment.gear.items.back.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.back.icon}.jpg`}></img></a>
    }

    const addChestBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.chest.bonuses.length > 0) {
            bonusStr = equipment.gear.items.chest.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.chest.gems.length > 0) {
            gemStr = equipment.gear.items.chest.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.chest.enchant !== undefined) {
            enchStr = equipment.gear.items.chest.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.chest.item_id}&ilvl=${equipment.gear.items.chest.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.chest.icon}.jpg`}></img></a>
    }

    const addWristBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.wrist.bonuses.length > 0) {
            bonusStr = equipment.gear.items.wrist.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.wrist.gems.length > 0) {
            gemStr = equipment.gear.items.wrist.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.wrist.enchant !== undefined) {
            enchStr = equipment.gear.items.wrist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.wrist.item_id}&ilvl=${equipment.gear.items.wrist.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.wrist.icon}.jpg`}></img></a>
    }

    const addHandsBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.hands.bonuses.length > 0) {
            bonusStr = equipment.gear.items.hands.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.hands.gems.length > 0) {
            gemStr = equipment.gear.items.hands.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.hands.enchant !== undefined) {
            enchStr = equipment.gear.items.hands.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.hands.item_id}&ilvl=${equipment.gear.items.hands.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.hands.icon}.jpg`}></img></a>
    }

    const addWaistBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.waist.bonuses.length > 0) {
            bonusStr = equipment.gear.items.waist.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.waist.gems.length > 0) {
            gemStr = equipment.gear.items.waist.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.waist.enchant !== undefined) {
            enchStr = equipment.gear.items.waist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.waist.item_id}&ilvl=${equipment.gear.items.waist.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.waist.icon}.jpg`}></img></a>
    }

    const addLegsBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.legs.bonuses.length > 0) {
            bonusStr = equipment.gear.items.legs.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.legs.gems.length > 0) {
            gemStr = equipment.gear.items.legs.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.legs.enchant !== undefined) {
            enchStr = equipment.gear.items.legs.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.legs.item_id}&ilvl=${equipment.gear.items.legs.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.legs.icon}.jpg`}></img></a>
    }

    const addFeetBonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.feet.bonuses.length > 0) {
            bonusStr = equipment.gear.items.feet.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.feet.gems.length > 0) {
            gemStr = equipment.gear.items.feet.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.feet.enchant !== undefined) {
            enchStr = equipment.gear.items.feet.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.feet.item_id}&ilvl=${equipment.gear.items.feet.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.feet.icon}.jpg`}></img></a>
    }

    const addFinger1Bonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.finger1.bonuses.length > 0) {
            bonusStr = equipment.gear.items.finger1.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.finger1.gems.length > 0) {
            gemStr = equipment.gear.items.finger1.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.finger1.enchant !== undefined) {
            enchStr = equipment.gear.items.finger1.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.finger1.item_id}&ilvl=${equipment.gear.items.finger1.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger1.icon}.jpg`}></img></a>
    }

    const addFinger2Bonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.finger2.bonuses.length > 0) {
            bonusStr = equipment.gear.items.finger2.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.finger2.gems.length > 0) {
            gemStr = equipment.gear.items.finger2.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.finger2.enchant !== undefined) {
            enchStr = equipment.gear.items.finger2.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.finger2.item_id}&ilvl=${equipment.gear.items.finger2.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger2.icon}.jpg`}></img></a>
    }

    const addTrinket1Bonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.trinket1.bonuses.length > 0) {
            bonusStr = equipment.gear.items.trinket1.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.trinket1.gems.length > 0) {
            gemStr = equipment.gear.items.trinket1.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.trinket1.enchant !== undefined) {
            enchStr = equipment.gear.trinket1.wrist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.trinket1.item_id}&ilvl=${equipment.gear.items.trinket1.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket1.icon}.jpg`}></img></a>
    }

    const addTrinket2Bonus = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.trinket2.bonuses.length > 0) {
            bonusStr = equipment.gear.items.trinket2.bonuses.join(':')
            console.log(bonusStr)
        }

        if (equipment.gear.items.trinket2.gems.length > 0) {
            gemStr = equipment.gear.items.trinket2.gems[0]
            console.log(gemStr)
        }

        if (equipment.gear.items.trinket2.enchant !== undefined) {
            enchStr = equipment.gear.items.trinket2.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.trinket2.item_id}&ilvl=${equipment.gear.items.trinket2.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket2.icon}.jpg`}></img></a>
    }

    const addMainhandBonus = () => {
        const bonusStr = equipment.gear.items.mainhand.bonuses.join(':')

        return <a href="#" data-wowhead={`item=${equipment.gear.items.mainhand.item_id}&ilvl=${equipment.gear.items.mainhand.item_level}&bonus=${bonusStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.mainhand.icon}.jpg`}></img></a>
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

                        <div>
                            {addHelmBonus()}
                        </div>

                        <div>
                            {addNeckBonus()}
                        </div>

                        <div>
                            {addShoulderBonus()}
                        </div>

                        <div>
                            {addBackBonus()}
                        </div>

                        <div>
                            {addChestBonus()}
                        </div>

                        <div>
                            {addWristBonus()}
                        </div>

                        <div>
                            {addHandsBonus()}
                        </div>

                        <div>
                            {addWaistBonus()}
                        </div>

                        <div>
                            {addLegsBonus()}
                        </div>

                        <div>
                            {addFeetBonus()}
                        </div>

                        <div>
                            {addFinger1Bonus()}
                        </div>

                        <div>
                            {addFinger2Bonus()}
                        </div>

                        <div>
                            {addTrinket1Bonus()}
                        </div>

                        <div>
                            {addTrinket2Bonus()}
                        </div>


                        {equipment.gear.items.mainhand.bonuses.length === 0 ?
                            <div>
                                <a href="#" data-wowhead={`item=${equipment.gear.items.mainhand.item_id}&ilvl=${equipment.gear.items.mainhand.item_level}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.mainhand.icon}.jpg`}></img></a>
                            </div>
                            : <div>
                                {addMainhandBonus()}
                            </div>
                        }
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