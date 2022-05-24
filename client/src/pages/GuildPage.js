import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"

import { GuildProgression, GuildRoster, GuildOfficers } from "../components/GuildPageComponents";

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
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/guilds/roster?region=${params.region}&realm=${params.realm}&guild=${params.name}`)

            const data = await response.json()
            setIoData(data.guildRoster.roster)
        }
    }, [setIoData])

    console.log(roster)
    console.log(officers)
    console.log(IoData)

    return (
        <section>

            <GuildProgression guild={guild} />
            <GuildOfficers officers={officers} />
            {IoData !== null && (
                <GuildRoster IoData={IoData} />
            )}

        </section>
    )
}

export default GuildPage