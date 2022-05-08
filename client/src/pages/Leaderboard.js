import { useState } from 'react'

import RunLeaderboard from "../components/RunLeaderboard";
import RoleLeaderboard from "../components/RoleLeaderboard";

const Leaderboard = () => {
    const [filter, setFilter] = useState('run');

    const renderComponent = () => {
        if (filter === 'run') {
            return (
                <RunLeaderboard />
            )
        };

        if (filter === 'role') {
            return (
                <RoleLeaderboard />
            )
        }

        // conditional for class component
    }

    const handleFilter = (event) => {
        if (event.target.id === 'run') {
            setFilter('run')
        }

        if (event.target.id === 'role') {
            setFilter('role')
        }

        if (event.target.id === 'class') {
            setFilter('class')
        }
    }

    return (
        <section>
            <div>
                <button id='run' onClick={handleFilter}>Runs</button>
                <button id='role' onClick={handleFilter}>Role</button>
                <button id='class' onClick={handleFilter}>Class</button>
            </div>
            <div>
                {renderComponent()}
            </div>
        </section>
    )
}

export default Leaderboard;