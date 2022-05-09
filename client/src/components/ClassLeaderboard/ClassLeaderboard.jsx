import { useState, useEffect } from 'react';
import { renderSpecs } from '../../utils/helpers';

const ClassLeaderboard = () => {
    const [activeClass, setActiveClass] = useState('warrior')

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

        if (activeClass === 'demon hunter') {
            return (
                <div>
                    <span>Vengeance</span>
                    <span>Havoc</span>
                </div>
            )
        }

        if (activeClass === 'death knight') {
            return (
                <div>
                    <span>Blood</span>
                    <span>Frost</span>
                    <span>unholy</span>
                </div>
            )
        }
    }


    return (
        <section>
            <div>
                <button>Warrior</button>
                <button>Paladin</button>
                <button>Hunter</button>
                <button>Rogue</button>
                <button>Priest</button>
                <button>Shaman</button>
                <button>Mage</button>
                <button>Warlock</button>
                <button>Monk</button>
                <button>Druid</button>
                <button>Demon Hunter</button>
                <button>Death Knight</button>
            </div>

            <div>
                {renderSpecs}
            </div>
        </section>
    )
}

export default ClassLeaderboard