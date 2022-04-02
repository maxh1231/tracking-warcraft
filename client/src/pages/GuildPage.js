import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom"

const GuildPage = () => {
    const [guild, setGuild] = useState(null)
    const [roster, setRoster] = useState(null)
    const [officers, setOfficers] = useState(null)
    const [IoData, setIoData] = useState(null)
    const params = useParams();
    console.log(params);
    const location = useLocation();
    console.log(location)
    const guildName = params.name.toLowerCase()

    useEffect(() => {
        guildData()

        async function guildData() {
            const response = await fetch(`https://raider.io/api/v1/guilds/profile?region=${params.region}&realm=${params.realm}&name=${guildName}&fields=raid_progression%2C%20raid_rankings`)


            const data = await response.json()

            setGuild(data)
            console.log(guild)
        }
    }, [setGuild])

    useEffect(() => {
        rosterData()

        async function rosterData() {
            const response = await fetch(`https://${params.region}.api.blizzard.com/data/wow/guild/${params.realm}/${guildName}/roster?namespace=profile-${params.region}&locale=en_US&access_token=${location.state}`)

            const data = await response.json()
            setRoster(data.members)
            setOfficers(data.members.filter((item) => item.rank < 2).sort((a, b) => b.rank + a.rank));
        }
    }, [setOfficers])

    useEffect(() => {
        IOData()

        async function IOData() {
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/guilds/roster?region=eu&realm=tarren-mill&guild=Echo`)

            const data = await response.json()
            setIoData(data)
        }
    }, [setIoData])

    console.log(roster)
    console.log(officers)
    console.log(IoData)

    return (
        <section>
            {guild !== null && (
                <div>
                    <div className="flex">
                        <div>
                            <h2>{guild.name}</h2>
                            <span><span>({guild.region.toUpperCase()})</span> {guild.realm}</span>
                        </div>

                        <div className="flex ">
                            <div>
                                <div>
                                    <span>{guild.raid_progression['sepulcher-of-the-first-ones'].mythic_bosses_killed}/11 M</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['sepulcher-of-the-first-ones'].heroic_bosses_killed}/11 H</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['sepulcher-of-the-first-ones'].normal_bosses_killed}/11 N</span>
                                </div>
                                <h3>Sepulcher</h3>
                            </div>

                            <div>
                                <div>
                                    <span>{guild.raid_progression['sanctum-of-domination'].mythic_bosses_killed}/10 M</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['sanctum-of-domination'].heroic_bosses_killed}/10 H</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['sanctum-of-domination'].normal_bosses_killed}/10 N</span>
                                </div>
                                <h3>Sanctum</h3>
                            </div>

                            <div>
                                <div>
                                    <span>{guild.raid_progression['castle-nathria'].mythic_bosses_killed}/10 M</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['castle-nathria'].heroic_bosses_killed}/10 H</span>
                                </div>
                                <div>
                                    <span>{guild.raid_progression['castle-nathria'].normal_bosses_killed}/10 N</span>
                                </div>
                                <h3>Nathria</h3>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {officers !== null && (
                <div>
                    <h1>not null</h1>
                    <p>Guild Master: <Link to={`/character/${params.region}/${params.realm}/${officers[0].character.name}`} state={location.state}>{officers[0].character.name}</Link></p>
                    <span>Officers: </span>
                    {officers.filter(item => item.rank > 0).map((character, index) => (
                        <span key={index}><Link to={`/character/${params.region}/${params.realm}/${character.character.name}`} state={location.state}>{character.character.name}</Link> </span>
                    ))}
                </div>
            )}


        </section>
    )
}

export default GuildPage