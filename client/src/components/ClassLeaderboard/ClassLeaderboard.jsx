import { useState, useEffect } from 'react';
import { renderSpecs } from '../../utils/helpers';

const ClassLeaderboard = () => {
    const [activeClass, setActiveClass] = useState('warrior')

    const renderSpecs = () => {

        if (activeClass === 'war') {
            return (
                <div>
                    <span>Protection</span>
                    <span>Fury</span>
                    <span>Arms</span>
                </div>
            )
        }

        if (activeClass === 'pal') {
            return (
                <div>
                    <span>Protection</span>
                    <span>Holy</span>
                    <span>Retribution</span>
                </div>
            )
        }

        if (activeClass === 'hunt') {
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

        if (activeClass === 'sham') {
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

        if (activeClass === 'lock') {
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

        if (activeClass === 'dh') {
            return (
                <div>
                    <span>Vengeance</span>
                    <span>Havoc</span>
                </div>
            )
        }

        if (activeClass === 'dk') {
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
                <button id='war'>Warrior</button>
                <button id='pal'>Paladin</button>
                <button id='hunt'>Hunter</button>
                <button id='rogue'>Rogue</button>
                <button id='priest'>Priest</button>
                <button id='sham'>Shaman</button>
                <button id='mage'>Mage</button>
                <button id='lock'>Warlock</button>
                <button id='monk'>Monk</button>
                <button id='druid'>Druid</button>
                <button id='dh'>Demon Hunter</button>
                <button id='dk'>Death Knight</button>
            </div>

            <div>
                {renderSpecs}
            </div>
        </section>
    )
}

export default ClassLeaderboard