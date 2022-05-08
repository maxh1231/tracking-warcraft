import { useState } from 'react'

import RunLeaderboard from "../components/RunLeaderboard";
import RoleLeaderboard from "../components/RoleLeaderboard";

const Leaderboard = () => {
    const [filter, setFilter] = useState('run');

    return (
        <section>
            <div>
                <button>Runs</button>
                <button>Role</button>
                <button>Class</button>
            </div>
            <div>
                <RunLeaderboard />
            </div>
            <div>
                <RoleLeaderboard />
            </div>
        </section>
    )
}

export default Leaderboard;