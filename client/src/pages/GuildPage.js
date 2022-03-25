import { useEffect } from "react";
import { useParams } from "react-router-dom"

const GuildPage = () => {
    const params = useParams();
    console.log(params);
    const guildName = params.name.toLowerCase()

    useEffect(() => {
        guildData()

        async function guildData() {
            const response = await fetch(`https://raider.io/api/v1/guilds/profile?region=${params.region}&realm=${params.realm}&name=${guildName}&fields=raid_progression%2C%20raid_rankings`)

            const data = await response.json()
            console.log(data);
        }
    }, [])

    return (
        <section>hi guild page</section>
    )
}

export default GuildPage