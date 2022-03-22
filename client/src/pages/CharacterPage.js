import { useParams, useLocation } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'
import { useEffect, useState } from "react";

const CharacterPage = () => {
    const [equipment, setEquipment] = useState(null)
    const [talents, setTalents] = useState(null);
    const [dungeons, setDungeons] = useState(null);
    const location = useLocation()
    const params = useParams();
    const charName = params.name.toLowerCase()
    const upperCaseRegion = params.region.toUpperCase();
    console.log(params)

    // unknown if will use
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
            const response = await fetch(`https://raider-io.p.rapidapi.com/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&fields=gear%2Ccovenant%2Craid%2Cguild%2Ctalents%2Cmythic_plus_best_runs&name=${charName}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "raider-io.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_RADERIO_KEY
                }
            })

            const data = await response.json()
            setEquipment(data)
            setDungeons(data.mythic_plus_best_runs)
        }
    }, [setEquipment], [setDungeons])

    useEffect(() => {
        blizzFetch()

        async function blizzFetch() {
            const response = await fetch(`https://${params.region}.api.blizzard.com/profile/wow/character/${params.realm}/${charName}/specializations?namespace=profile-${params.region}&locale=en_US&access_token=${location.state}`)

            const data = await response.json()
            setTalents(data.specializations[0].talents)
        }
    }, [setTalents])

    let tyranArr = []
    let fortArr = []
    useEffect(() => {
        dungeonFetch()

        async function dungeonFetch() {
            // const response = await fetch(`https://${params.region}.api.blizzard.com/profile/wow/character/${params.realm}/${charName}/mythic-keystone-profile/season/7?namespace=profile-us&locale=en_US&access_token=${location.state}`)

            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/characters/mythic-plus-runs?season=season-sl-3&characterId=91057123&role=all&mode=timed&affixes=tyrannical&dung=plaguefall&date=all`)

            const data = await response.json()

            // for (let i = 0; i < data.best_runs.length; i++) {
            //     if (data.best_runs[i].keystone_affixes[0].name === 'Tyrannical') {
            //         tyranArr.push(data.best_runs[i])
            //     } else {
            //         fortArr.push(data.best_runs[i])
            //     }
            // }
            // setDungeons(data);
        }
    }, [setDungeons])

    console.log(equipment)
    console.log(talents)
    console.log(dungeons)
    console.log("Tazavesh: So'leah's Gambit")



    const addHelmParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.head.bonuses.length > 0) {
            bonusStr = equipment.gear.items.head.bonuses.join(':')
        }

        if (equipment.gear.items.head.gems.length > 0) {
            gemStr = equipment.gear.items.head.gems[0]
        }

        if (equipment.gear.items.head.enchant !== undefined) {
            enchStr = equipment.gear.items.head.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.head.item_id}&ilvl=${equipment.gear.items.head.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.head.icon}.jpg`}></img></a>
    }

    const addNeckParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.neck.bonuses.length > 0) {
            bonusStr = equipment.gear.items.neck.bonuses.join(':')
        }

        if (equipment.gear.items.neck.gems.length > 0) {
            gemStr = equipment.gear.items.neck.gems[0]
        }

        if (equipment.gear.items.neck.enchant !== undefined) {
            enchStr = equipment.gear.items.neck.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.neck.item_id}&ilvl=${equipment.gear.items.neck.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.neck.icon}.jpg`}></img></a>
    }

    const addShoulderParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.shoulder.bonuses.length > 0) {
            bonusStr = equipment.gear.items.shoulder.bonuses.join(':')
        }

        if (equipment.gear.items.shoulder.gems.length > 0) {
            gemStr = equipment.gear.items.shoulder.gems[0]
        }

        if (equipment.gear.items.shoulder.enchant !== undefined) {
            enchStr = equipment.gear.items.shoulder.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.shoulder.item_id}&ilvl=${equipment.gear.items.shoulder.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.shoulder.icon}.jpg`}></img></a>
    }

    const addBackParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.back.bonuses.length > 0) {
            bonusStr = equipment.gear.items.back.bonuses.join(':')
        }

        if (equipment.gear.items.back.gems.length > 0) {
            gemStr = equipment.gear.items.back.gems[0]
        }

        if (equipment.gear.items.back.enchant !== undefined) {
            enchStr = equipment.gear.items.back.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.back.item_id}&ilvl=${equipment.gear.items.back.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.back.icon}.jpg`}></img></a>
    }

    const addChestParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.chest.bonuses.length > 0) {
            bonusStr = equipment.gear.items.chest.bonuses.join(':')
        }

        if (equipment.gear.items.chest.gems.length > 0) {
            gemStr = equipment.gear.items.chest.gems[0]
        }

        if (equipment.gear.items.chest.enchant !== undefined) {
            enchStr = equipment.gear.items.chest.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.chest.item_id}&ilvl=${equipment.gear.items.chest.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.chest.icon}.jpg`}></img></a>
    }

    const addWristParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.wrist.bonuses.length > 0) {
            bonusStr = equipment.gear.items.wrist.bonuses.join(':')
        }

        if (equipment.gear.items.wrist.gems.length > 0) {
            gemStr = equipment.gear.items.wrist.gems[0]
        }

        if (equipment.gear.items.wrist.enchant !== undefined) {
            enchStr = equipment.gear.items.wrist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.wrist.item_id}&ilvl=${equipment.gear.items.wrist.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.wrist.icon}.jpg`}></img></a>
    }

    const addHandsParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.hands.bonuses.length > 0) {
            bonusStr = equipment.gear.items.hands.bonuses.join(':')
        }

        if (equipment.gear.items.hands.gems.length > 0) {
            gemStr = equipment.gear.items.hands.gems[0]
        }

        if (equipment.gear.items.hands.enchant !== undefined) {
            enchStr = equipment.gear.items.hands.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.hands.item_id}&ilvl=${equipment.gear.items.hands.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.hands.icon}.jpg`}></img></a>
    }

    const addWaistParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.waist.bonuses.length > 0) {
            bonusStr = equipment.gear.items.waist.bonuses.join(':')
        }

        if (equipment.gear.items.waist.gems.length > 0) {
            gemStr = equipment.gear.items.waist.gems[0]
        }

        if (equipment.gear.items.waist.enchant !== undefined) {
            enchStr = equipment.gear.items.waist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.waist.item_id}&ilvl=${equipment.gear.items.waist.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.waist.icon}.jpg`}></img></a>
    }

    const addLegsParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.legs.bonuses.length > 0) {
            bonusStr = equipment.gear.items.legs.bonuses.join(':')
        }

        if (equipment.gear.items.legs.gems.length > 0) {
            gemStr = equipment.gear.items.legs.gems[0]
        }

        if (equipment.gear.items.legs.enchant !== undefined) {
            enchStr = equipment.gear.items.legs.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.legs.item_id}&ilvl=${equipment.gear.items.legs.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.legs.icon}.jpg`}></img></a>
    }

    const addFeetParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.feet.bonuses.length > 0) {
            bonusStr = equipment.gear.items.feet.bonuses.join(':')
        }

        if (equipment.gear.items.feet.gems.length > 0) {
            gemStr = equipment.gear.items.feet.gems[0]
        }

        if (equipment.gear.items.feet.enchant !== undefined) {
            enchStr = equipment.gear.items.feet.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.feet.item_id}&ilvl=${equipment.gear.items.feet.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.feet.icon}.jpg`}></img></a>
    }

    const addFinger1Params = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.finger1.bonuses.length > 0) {
            bonusStr = equipment.gear.items.finger1.bonuses.join(':')
        }

        if (equipment.gear.items.finger1.gems.length > 0) {
            gemStr = equipment.gear.items.finger1.gems[0]
        }

        if (equipment.gear.items.finger1.enchant !== undefined) {
            enchStr = equipment.gear.items.finger1.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.finger1.item_id}&ilvl=${equipment.gear.items.finger1.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger1.icon}.jpg`}></img></a>
    }

    const addFinger2Params = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.finger2.bonuses.length > 0) {
            bonusStr = equipment.gear.items.finger2.bonuses.join(':')
        }

        if (equipment.gear.items.finger2.gems.length > 0) {
            gemStr = equipment.gear.items.finger2.gems[0]
        }

        if (equipment.gear.items.finger2.enchant !== undefined) {
            enchStr = equipment.gear.items.finger2.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.finger2.item_id}&ilvl=${equipment.gear.items.finger2.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.finger2.icon}.jpg`}></img></a>
    }

    const addTrinket1Params = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.trinket1.bonuses.length > 0) {
            bonusStr = equipment.gear.items.trinket1.bonuses.join(':')
        }

        if (equipment.gear.items.trinket1.gems.length > 0) {
            gemStr = equipment.gear.items.trinket1.gems[0]
        }

        if (equipment.gear.items.trinket1.enchant !== undefined) {
            enchStr = equipment.gear.trinket1.wrist.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.trinket1.item_id}&ilvl=${equipment.gear.items.trinket1.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket1.icon}.jpg`}></img></a>
    }

    const addTrinket2Params = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.trinket2.bonuses.length > 0) {
            bonusStr = equipment.gear.items.trinket2.bonuses.join(':')
        }

        if (equipment.gear.items.trinket2.gems.length > 0) {
            gemStr = equipment.gear.items.trinket2.gems[0]
        }

        if (equipment.gear.items.trinket2.enchant !== undefined) {
            enchStr = equipment.gear.items.trinket2.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.trinket2.item_id}&ilvl=${equipment.gear.items.trinket2.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.trinket2.icon}.jpg`}></img></a>
    }

    const addMainhandParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.mainhand.bonuses.length > 0) {
            bonusStr = equipment.gear.items.mainhand.bonuses.join(':')
        }

        if (equipment.gear.items.mainhand.gems.length > 0) {
            gemStr = equipment.gear.items.mainhand.gems[0]
        }

        if (equipment.gear.items.mainhand.enchant !== undefined) {
            enchStr = equipment.gear.items.mainhand.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.mainhand.item_id}&ilvl=${equipment.gear.items.mainhand.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.mainhand.icon}.jpg`}></img></a>
    }

    const addOffhandParams = () => {
        let bonusStr = '';
        let gemStr = '';
        let enchStr = '';

        if (equipment.gear.items.offhand.bonuses.length > 0) {
            bonusStr = equipment.gear.items.offhand.bonuses.join(':')
        }

        if (equipment.gear.items.offhand.gems.length > 0) {
            gemStr = equipment.gear.items.offhand.gems[0]
        }

        if (equipment.gear.items.offhand.enchant !== undefined) {
            enchStr = equipment.gear.items.offhand.enchant
        }

        return <a href="#" data-wowhead={`item=${equipment.gear.items.offhand.item_id}&ilvl=${equipment.gear.items.offhand.item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items.offhand.icon}.jpg`}></img></a>
    }



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
                            {addHelmParams()}
                        </div>

                        <div>
                            {addNeckParams()}
                        </div>

                        <div>
                            {addShoulderParams()}
                        </div>

                        <div>
                            {addBackParams()}
                        </div>

                        <div>
                            {addChestParams()}
                        </div>

                        <div>
                            {addWristParams()}
                        </div>

                        <div>
                            {addHandsParams()}
                        </div>

                        <div>
                            {addWaistParams()}
                        </div>

                        <div>
                            {addLegsParams()}
                        </div>

                        <div>
                            {addFeetParams()}
                        </div>

                        <div>
                            {addFinger1Params()}
                        </div>

                        <div>
                            {addFinger2Params()}
                        </div>

                        <div>
                            {addTrinket1Params()}
                        </div>

                        <div>
                            {addTrinket2Params()}
                        </div>

                        <div>
                            {addMainhandParams()}
                        </div>

                        {equipment.gear.items.offhand !== undefined && (
                            <div>
                                {addOffhandParams()}
                            </div>
                        )}

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

            <div>
                <table>
                    <th>
                        <tr>
                            <td>Dungeon</td>
                            <td>Affixes</td>
                            <td>Level</td>
                            <td>Time</td>
                        </tr>
                    </th>
                    <tbody>
                        <tr>
                            <td>The Necrotic Wake</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('The Necrotic Wake') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('The Necrotic Wake') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Mists of Tirna Scithe</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Mists of Tirna Scithe') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Mists of Tirna Scithe') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Halls of Atonement</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Halls of Atonement') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Halls of Atonement') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Spires of Ascension</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Spires of Ascension') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Spires of Ascension') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>De Other Side</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('De Other Side') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('De Other Side') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Plaguefall</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Plaguefall') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Plaguefall') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Theater of Pain</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Theater of Pain') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Theater of Pain') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Sanguine Depths</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Sanguine Depths') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Sanguine Depths') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Tazavesh: Streets of Wonder</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Tazavesh: Streets of Wonder') && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes('Tazavesh: Streets of Wonder') && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    item.affixes.map((affix) => (
                                        <td><a href="#" data-wowhead={affix.wowhead_url}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a></td>
                                    ))
                                ))
                            )}
                        </tr>
                        <tr>
                            <td>Tazavesh: So'leah's Gambit</td>
                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes("Tazavesh: So'leah's Gambit") && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    <td>is tyrannical</td>
                                ))
                            )}

                            {dungeons !== null && (
                                dungeons.filter(dungeon => dungeon.dungeon.includes("Tazavesh: So'leah's Gambit") && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    <td>is fortified</td>
                                ))
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default CharacterPage