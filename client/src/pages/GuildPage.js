import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"

const GuildPage = () => {
    const [guild, setGuild] = useState(null)
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

    return (
        <section>
            {guild !== null && (
                <div>
                    <div>
                        <div>
                            <h2>{guild.name}</h2>
                            <span><span>({guild.region.toUpperCase()})</span> {guild.realm}</span>
                        </div>

                        <div>
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
        </section>
    )
}

export default GuildPage