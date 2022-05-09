import { useState, useEffect } from 'react';
import { renderSpecs } from '../../utils/helpers';

const ClassLeaderboard = () => {
    const [activeClass, setActiveClass] = useState('war')

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

    const handleClassChange = (event) => {
        if (event.target.id === 'war') {
            setActiveClass('war')
        }
        if (event.target.id === 'pal') {
            setActiveClass('pal')
        }
        if (event.target.id === 'hunt') {
            setActiveClass('hunt')
        }
        if (event.target.id === 'rogue') {
            setActiveClass('rogue')
        }
        if (event.target.id === 'priest') {
            setActiveClass('priest')
        }
        if (event.target.id === 'sham') {
            setActiveClass('sham')
        }
        if (event.target.id === 'mage') {
            setActiveClass('mage')
        }
        if (event.target.id === 'lock') {
            setActiveClass('lock')
        }
        if (event.target.id === 'monk') {
            setActiveClass('monk')
        }
        if (event.target.id === 'druid') {
            setActiveClass('druid')
        }
        if (event.target.id === 'dh') {
            setActiveClass('dh')
        }
        if (event.target.id === 'dk') {
            setActiveClass('dk')
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
        </section>
    )
}

export default ClassLeaderboard