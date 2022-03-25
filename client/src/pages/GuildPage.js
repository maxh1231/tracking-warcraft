import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const GuildPage = () => {
    const [guild, setGuild] = useState(null)
    const params = useParams();
    console.log(params);
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
                    </div>
                </div>
            )}
        </section>
    )
}

export default GuildPage