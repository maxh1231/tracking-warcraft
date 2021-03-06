import { useState, useEffect } from 'react';

const ClassLeaderboard = () => {
    const [activeClass, setActiveClass] = useState('warrior');
    const [currentData, setCurrentData] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchData();

        async function fetchData() {
            const response = await fetch(`https://killcors.herokuapp.com/https://raider.io/api/mythic-plus/rankings/characters?region=world&season=season-sl-3&class=${activeClass}&role=all&page=${page}`)

            const data = await response.json();
            setCurrentData(data.rankings.rankedCharacters)
        }
    }, [setCurrentData, activeClass, page])

    const handlePageChange = (event) => {
        if (event.target.id === 'next') {
            setPage(page + 1)
        }

        if (event.target.id === 'prev' && page > 0) {
            setPage(page - 1)
        }
    }

    console.log(currentData)

    const renderSpecs = () => {

        if (activeClass === 'warrior') {
            return (
                <div>
                    <span>Protection</span>
                    <span>Fury</span>
                    <span>Arms</span>
                </div>
            )
        }

        if (activeClass === 'paladin') {
            return (
                <div>
                    <span>Protection</span>
                    <span>Holy</span>
                    <span>Retribution</span>
                </div>
            )
        }

        if (activeClass === 'hunter') {
            return (
                <div>
                    <span>Beast Mastery</span>
                    <span>Survival</span>
                    <span>Marksmanship</span>
                </div>
            )
        }

        if (activeClass === 'rogue') {
            return (
                <div>
                    <span>Subtlety</span>
                    <span>Assassination</span>
                    <span>Outlaw</span>
                </div>
            )
        }

        if (activeClass === 'priest') {
            return (
                <div>
                    <span>Shadow</span>
                    <span>Holy</span>
                    <span>Discipline</span>
                </div>
            )
        }

        if (activeClass === 'shaman') {
            return (
                <div>
                    <span>Restoration</span>
                    <span>Elemental</span>
                    <span>Enhancement</span>
                </div>
            )
        }

        if (activeClass === 'mage') {
            return (
                <div>
                    <span>Frost</span>
                    <span>Fire</span>
                    <span>Arcane</span>
                </div>
            )
        }

        if (activeClass === 'warlock') {
            return (
                <div>
                    <span>Affliction</span>
                    <span>Destruction</span>
                    <span>Demonology</span>
                </div>
            )
        }

        if (activeClass === 'monk') {
            return (
                <div>
                    <span>Brewmaster</span>
                    <span>Windwalker</span>
                    <span>Mistweaver</span>
                </div>
            )
        }

        if (activeClass === 'druid') {
            return (
                <div>
                    <span>Guardian</span>
                    <span>Restoration</span>
                    <span>Feral</span>
                    <span>Balance</span>
                </div>
            )
        }

        if (activeClass === 'demon-hunter') {
            return (
                <div>
                    <span>Vengeance</span>
                    <span>Havoc</span>
                </div>
            )
        }

        if (activeClass === 'death-knight') {
            return (
                <div>
                    <span>Blood</span>
                    <span>Frost</span>
                    <span>unholy</span>
                </div>
            )
        }
    }

    const handleClassChange = (event) => {
        if (event.target.id === 'war') {
            setActiveClass('warrior')
        }
        if (event.target.id === 'pal') {
            setActiveClass('paladin')
        }
        if (event.target.id === 'hunt') {
            setActiveClass('hunter')
        }
        if (event.target.id === 'rogue') {
            setActiveClass('rogue')
        }
        if (event.target.id === 'priest') {
            setActiveClass('priest')
        }
        if (event.target.id === 'sham') {
            setActiveClass('shaman')
        }
        if (event.target.id === 'mage') {
            setActiveClass('mage')
        }
        if (event.target.id === 'lock') {
            setActiveClass('warlock')
        }
        if (event.target.id === 'monk') {
            setActiveClass('monk')
        }
        if (event.target.id === 'druid') {
            setActiveClass('druid')
        }
        if (event.target.id === 'dh') {
            setActiveClass('demon-hunter')
        }
        if (event.target.id === 'dk') {
            setActiveClass('death-knight')
        }
    }


    return (
        <section>
            <div>
                <button id='war' onClick={handleClassChange}>Warrior</button>
                <button id='pal' onClick={handleClassChange}>Paladin</button>
                <button id='hunt' onClick={handleClassChange}>Hunter</button>
                <button id='rogue' onClick={handleClassChange}>Rogue</button>
                <button id='priest' onClick={handleClassChange}>Priest</button>
                <button id='sham' onClick={handleClassChange}>Shaman</button>
                <button id='mage' onClick={handleClassChange}>Mage</button>
                <button id='lock' onClick={handleClassChange}>Warlock</button>
                <button id='monk' onClick={handleClassChange}>Monk</button>
                <button id='druid' onClick={handleClassChange}>Druid</button>
                <button id='dh' onClick={handleClassChange}>Demon Hunter</button>
                <button id='dk' onClick={handleClassChange}>Death Knight</button>
            </div>

            <div>
                {renderSpecs()}
            </div>


            {currentData && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Character</th>
                                <th>Runs</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.rank}</td>
                                    <td>{item.character.name}</td>
                                    <td>runs</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div>
                <button id='prev' onClick={handlePageChange}>Previous</button>
                <button id='next' onClick={handlePageChange}>Next</button>
            </div>

        </section>
    )
}

export default ClassLeaderboard