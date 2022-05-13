import { useParams, useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import DpsClass from "../components/DpsClass";
import HybridClass from "../components/HybridClass";
import DpsRank from "../components/DpsRank";

import { CharacterInfo, Gear, Talents } from "../components/CharacterPageComponents";

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

    const handleSelectChange = (event) => {
        let value = event.target.value;
        console.log(value)
        setCurrentRaid(value);
    }

    const handleRaidInfo = () => {
        let raid = '';
        let n = 11;
        switch (currentRaid) {
            case 'Sepulcher of the First Ones':
                raid = 'sepulcher-of-the-first-ones';
                break;
            case 'Sanctum of Domination':
                raid = 'sanctum-of-domination';
                break;
            case 'Castle Nathria':
                raid = 'castle-nathria';
                n = 10
                break;
        };
        return (
            <ol>
                <li>Mythic: {equipment.raid_progression[raid].mythic_bosses_killed}/{n} M</li>
                <li>Heroic: {equipment.raid_progression[raid].heroic_bosses_killed}/{n} H</li>
                <li>Normal: {equipment.raid_progression[raid].normal_bosses_killed}/{n} N</li>
            </ol>
        )
    }

    const handleSeasonChange = (event) => {
        let value = event.target.value
        switch (value) {
            case 'BFA Season 4':
                setCurrentSeason(6);
                break;
            case 'BFA Season 3':
                setCurrentSeason(5);
                break;
            case 'BFA Season 2':
                setCurrentSeason(4);
                break;
            case 'BFA Season 1':
                setCurrentSeason(3);
                break;
            case 'SL Season 3':
                setCurrentSeason(2);
                break;
            case 'SL Season 2':
                setCurrentSeason(1);
                break;
            case 'SL Season 1':
                setCurrentSeason(0);
                break;
        };
    };

    return (
        <section>

            <CharacterInfo equipment={equipment} />
            <Gear equipment={equipment} />

            {(talents && equipment) !== null && (
                <div>
                    <div>
                        <h3>Talents</h3>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {talents.map((item, index) => (
                            <div key={uuid()}>
                                <a href="#" data-wowhead={`spell=${item.spell_tooltip.spell.id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.talents[index].icon}.jpg`}></img></a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {equipment !== null && (
                <div>
                    <div>
                        <h3>Raid Progression</h3>
                        <select onChange={handleSelectChange}>
                            <option>Sepulcher of the First Ones</option>
                            <option>Sanctum of Domination</option>
                            <option>Castle Nathria</option>
                        </select>
                    </div>

                    <div>
                        <div>
                            <h4>{currentRaid}</h4>
                            <h4>Progress</h4>
                            <h4>Kills</h4>
                        </div>
                        <div>
                            {handleRaidInfo()}
                        </div>
                    </div>
                </div>
            )}

            {equipment !== null && (
                <div>
                    <div>
                        <h3>Mythic+ Progression</h3>
                        <select onChange={handleSeasonChange}>
                            <option>SL Season 3</option>
                            <option>SL Season 2</option>
                            <option>SL Season 1</option>
                            <option>BFA Season 4</option>
                            <option>BFA Season 3</option>
                            <option>BFA Season 2</option>
                            <option>BFA Season 1</option>
                        </select>
                    </div>
                    {
                        (equipment.class === 'Rogue' || equipment.class === 'Mage' || equipment.class === 'Hunter' || equipment.class === 'Warlock')
                            ?
                            <div>
                                <DpsClass equipment={equipment} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
                                <DpsRank equipment={equipment} />
                            </div>
                            :
                            <HybridClass equipment={equipment} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
                    }
                </div>
            )}

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