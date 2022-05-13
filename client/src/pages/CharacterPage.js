import { useParams, useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';


import { CharacterInfo, Gear, Talents, Progression } from "../components/CharacterPageComponents";

const CharacterPage = () => {
    const [equipment, setEquipment] = useState(null)
    const [talents, setTalents] = useState(null);
    const [dungeons, setDungeons] = useState(null);
    const [currentRaid, setCurrentRaid] = useState('Sepulcher of the First Ones')
    const [currentSeason, setCurrentSeason] = useState(2)
    const location = useLocation()
    const params = useParams();
    const charName = params.name.toLowerCase()

    // console.log(params);


    const dungeonArr = ['The Necrotic Wake', 'Mists of Tirna Scithe', 'Halls of Atonement', 'Spires of Ascension', 'De Other Side', 'Plaguefall', 'Theater of Pain', 'Sanguine Depths', 'Tazavesh: Streets of Wonder', 'Tazavesh: So\'leah\'s Gambit'];

    // fetches character info, M+ info, Raid info form RIO
    useEffect(() => {
        ioFetch();

        async function ioFetch() {
            const response = await fetch(`https://raider-io.p.rapidapi.com/api/v1/characters/profile?region=${params.region}&realm=${params.realm}&fields=gear%2Ccovenant%2Craid%2Cguild%2Ctalents%2Cmythic_plus_best_runs%2Cmythic_plus_scores_by_season:season-sl-1:season-sl-2:season-sl-3:season-bfa-1:season-bfa-2:season-bfa-3:season-bfa-4%2Cmythic_plus_ranks%2Craid_progression%2Craid_achievement_curve:sepulcher-of-the-first-ones:sanctum-of-domination&name=${charName}`, {
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

    // fetches character's current talent and specialization info 
    useEffect(() => {
        blizzFetch()

        async function blizzFetch() {
            const response = await fetch(`https://${params.region}.api.blizzard.com/profile/wow/character/${params.realm}/${charName}/specializations?namespace=profile-${params.region}&locale=en_US&access_token=${location.state}`)

            const data = await response.json()
            setTalents(data.specializations[0].talents)
        }
    }, [setTalents])




    const timeFormat = (value) => {
        const date = new Date(value)

        if (date.getSeconds() >= 10) {
            return `${date.getMinutes()}:${date.getSeconds()}`
        } else {
            return `${date.getMinutes()}:0${date.getSeconds()}`
        }

    }



    if (equipment) {
        // console.log(equipment.raid_progression[`sanctum-of-domination`].mythic_bosses_killed)
    }



    return (
        <section>

            <CharacterInfo equipment={equipment} />
            <Gear equipment={equipment} />
            <Talents equipment={equipment} talents={talents} />
            <Progression equipment={equipment} currentRaid={currentRaid} setCurrentRaid={setCurrentRaid} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />




            {/* {(equipment.class === 'Rogue' || equipment.class === 'Mage' || equipment.class === 'Hunter' || equipment.class === 'Warlock')
                ?
                <DpsRank equipment={equipment} />
                :
                null
            } */}

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Dungeon</th>
                            <th>Level</th>
                            <th>Affixes</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dungeons !== null && (
                            dungeonArr.map((d) => (
                                dungeons.filter(dungeon => dungeon.dungeon.includes(d) && dungeon.affixes[0].name.includes('Tyrannical')).map(item => (
                                    <tr key={uuid()}>
                                        <td>{item.dungeon}</td>
                                        <td>{`+${item.mythic_level}`}</td>
                                        <td>{item.affixes.map(affix => (
                                            <a href="#" data-wowhead={affix.wowhead_url} key={uuid()}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a>
                                        ))}</td>
                                        <td>{timeFormat(item.clear_time_ms)}</td>
                                    </tr>
                                ))
                            ))
                        )}
                        {dungeons !== null && (
                            dungeonArr.map((d) => (
                                dungeons.filter(dungeon => dungeon.dungeon.includes(d) && dungeon.affixes[0].name.includes('Fortified')).map(item => (
                                    <tr key={uuid()}>
                                        <td>{item.dungeon}</td>
                                        <td>{`+${item.mythic_level}`}</td>
                                        <td>{item.affixes.map(affix => (
                                            <a href="#" data-wowhead={affix.wowhead_url} key={uuid()}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${affix.icon}.jpg`}></img></a>
                                        ))}</td>
                                        <td>{timeFormat(item.clear_time_ms)}</td>
                                    </tr>
                                ))
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CharacterPage