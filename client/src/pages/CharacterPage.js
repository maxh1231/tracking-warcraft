import { useParams, useLocation, Link } from "react-router-dom"
import { BlizzAPI } from 'blizzapi'
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import DpsClass from "../components/DpsClass";
import HybridClass from "../components/HybridClass";
import DpsRank from "../components/DpsRank";

const CharacterPage = () => {
    const [equipment, setEquipment] = useState(null)
    const [talents, setTalents] = useState(null);
    const [dungeons, setDungeons] = useState(null);
    const [currentRaid, setCurrentRaid] = useState('Sepulcher of the First Ones')
    const [currentSeason, setCurrentSeason] = useState(2)
    const location = useLocation()
    const params = useParams();
    const charName = params.name.toLowerCase()
    const upperCaseRegion = params.region.toUpperCase();
    // console.log(params);

    const paramArr = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2', 'mainhand', 'offhand'];
    const dungeonArr = ['The Necrotic Wake', 'Mists of Tirna Scithe', 'Halls of Atonement', 'Spires of Ascension', 'De Other Side', 'Plaguefall', 'Theater of Pain', 'Sanguine Depths', 'Tazavesh: Streets of Wonder', 'Tazavesh: So\'leah\'s Gambit'];

    // unknown if will use
    const api = new BlizzAPI({
        region: `${params.region}`,
        clientId: process.env.REACT_APP_client_id,
        clientSecret: process.env.REACT_APP_client_secret,
    });

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

    useEffect(() => {
        blizzFetch()

        async function blizzFetch() {
            const response = await fetch(`https://${params.region}.api.blizzard.com/profile/wow/character/${params.realm}/${charName}/specializations?namespace=profile-${params.region}&locale=en_US&access_token=${location.state}`)

            const data = await response.json()
            setTalents(data.specializations[0].talents)
        }
    }, [setTalents])

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

    const paramAdder = (type) => {
        if (type === 'offhand') {
            if (equipment.gear.items[type] === undefined) {
                return;
            };
        };
        let bonusStr = '';
        let gemStr = '';
        let enchantStr = '';

        if (equipment.gear.items[type].bonuses.length > 0) {
            bonusStr = equipment.gear.items[type].bonuses.join(':');
        };

        if (equipment.gear.items[type].gems.length > 0) {
            gemStr = equipment.gear.items[type].gems[0];
        };

        if (equipment.gear.items[type].enchant !== undefined) {
            enchantStr = equipment.gear.items[type].enchant;
        };

        // console.log({bonusStr: bonusStr, gemStr: gemStr, enchantStr: enchantStr});

        return <a href="#" data-wowhead={`item=${equipment.gear.items[type].item_id}&ilvl=${equipment.gear.items[type].item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchantStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items[type].icon}.jpg`}></img></a>
    };

    const timeFormat = (value) => {
        const date = new Date(value)

        if (date.getSeconds() >= 10) {
            return `${date.getMinutes()}:${date.getSeconds()}`
        } else {
            return `${date.getMinutes()}:0${date.getSeconds()}`
        }

    }

    const aotcFormat = (value) => {
        return `${value.slice(5, 7)}-${value.slice(8, 10)}-${value.slice(0, 4)}`
    }

    const calcProg = () => {
        if (equipment.raid_progression[`sanctum-of-domination`].mythic_bosses_killed > 0) {
            return `${equipment.raid_progression['sanctum-of-domination'].mythic_bosses_killed}/11 M`;
        } else if (equipment.raid_progression[`sanctum-of-domination`].heroic_bosses_killed > 0) {
            return equipment.raid_progression[`sanctum-of-domination`].heroic_bosses_killed
        } else {
            return equipment.raid_progression[`sanctum-of-domination`].normal_bosses_killed
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

            {equipment !== null &&
                <div>
                    <div>
                        <img src={equipment.thumbnail_url} ></img>
                    </div>
                    <div>
                        <div>
                            <span>{equipment.name}</span>
                        </div>
                        {equipment.guild.name !== null && (
                            <div>
                                <span><Link to={`/guild/${params.region}/${params.realm}/${equipment.guild.name}`} state={location.state}>{"<"}{equipment.guild.name}{">"}</Link></span>
                            </div>
                        )}
                        <div>
                            <span>({upperCaseRegion}) {equipment.realm}</span>
                        </div>
                        <div>
                            <span>{equipment.race}<span> {equipment.active_spec_name} {equipment.class}</span></span>
                        </div>
                        <div>
                            <span>{equipment.mythic_plus_scores_by_season[2].scores.all} M+ Score</span>
                        </div>
                        {equipment.raid_achievement_curve.filter(raid => raid.raid.includes('sanctum-of-domination')).map(item => (
                            <div key={uuid()}>
                                <span>{calcProg()} </span>
                                <span>Sanctum of Domination AOTC on {aotcFormat(item.aotc)}</span>
                            </div>

                        ))}

                        {equipment.raid_achievement_curve.filter(raid => raid.raid.includes('sepulcher-of-the-first-ones')).map(item => (
                            <div key={uuid()}>
                                <span>Sepulcher of the First Ones AOTC on {aotcFormat(item.aotc)}</span>
                            </div>
                        ))}
                    </div>
                </div>}

            {equipment !== null && (
                <div>
                    <div>
                        <span>{equipment.gear.item_level_equipped} Item Level</span>
                    </div>
                    <div style={{display: 'flex'}}>
                        {paramArr.map((param) => (
                            <div key={uuid()}>
                                {paramAdder(param)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(talents && equipment) !== null && (
                <div>
                    <div>
                        <h3>Talents</h3>
                    </div>
                    <div style={{display: 'flex'}}>
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