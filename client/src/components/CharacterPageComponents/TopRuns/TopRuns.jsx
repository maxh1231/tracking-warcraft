import { v4 as uuid } from 'uuid';

const TopRuns = ({ dungeons }) => {

    const timeFormat = (value) => {
        const date = new Date(value)

        if (date.getSeconds() >= 10) {
            return `${date.getMinutes()}:${date.getSeconds()}`
        } else {
            return `${date.getMinutes()}:0${date.getSeconds()}`
        }

    }

    const dungeonArr = ['The Necrotic Wake', 'Mists of Tirna Scithe', 'Halls of Atonement', 'Spires of Ascension', 'De Other Side', 'Plaguefall', 'Theater of Pain', 'Sanguine Depths', 'Tazavesh: Streets of Wonder', 'Tazavesh: So\'leah\'s Gambit'];

    return (
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
    )
}

export default TopRuns;