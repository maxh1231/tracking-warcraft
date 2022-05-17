import { useParams, useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { CharacterInfo, Gear, Talents, Progression, TopRuns } from "../components/CharacterPageComponents";
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_TOKEN } from "../utils/queries";
import { ADD_BLIZZTOKEN } from "../utils/mutations";

const CharacterPage = () => {
    const [equipment, setEquipment] = useState(null)
    const [talents, setTalents] = useState(null);
    const [dungeons, setDungeons] = useState(null);
    const [currentRaid, setCurrentRaid] = useState('Sepulcher of the First Ones')
    const [currentSeason, setCurrentSeason] = useState(2)
    const location = useLocation()
    const params = useParams();
    const charName = params.name.toLowerCase()
    const { loading, data } = useQuery(QUERY_TOKEN);
    const [addToken] = useMutation(ADD_BLIZZTOKEN)
    const [blizzToken, setBlizzToken] = useState(null);

    // console.log(data)

    useEffect(() => {
        if (!loading && data.getToken.length === 0) {
            fetchToken();
            console.log('fetch token')
        } else if (!loading && data.getToken.length > 0) {
            setBlizzToken(data.getToken[0].access_token)
            console.log('found token')
        }
    }, [data])

    const fetchToken = async () => {
        const response = await fetch("https://us.battle.net/oauth/token", {
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${process.env.REACT_APP_client_id_secret}=`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })

        const token = await response.json();
        console.log(token)


        addToken({
            variables: token
        })

        setBlizzToken(token.access_token);
    }

    console.log(blizzToken)

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

    return (
        <section>
            <CharacterInfo equipment={equipment} />
            <Gear equipment={equipment} />
            <Talents equipment={equipment} talents={talents} />
            <Progression equipment={equipment} currentRaid={currentRaid} setCurrentRaid={setCurrentRaid} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
            <TopRuns dungeons={dungeons} />
        </section>
    )
}

export default CharacterPage