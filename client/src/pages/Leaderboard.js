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
    }


    return (
        <section>
            <div>
                <button>Runs</button>
                <button>Role</button>
                <button>Class</button>
            </div>
            <div>
                {renderComponent()}
            </div>
        </section>
    )
}

export default Leaderboard;