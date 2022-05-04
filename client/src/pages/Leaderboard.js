import RunLeaderboard from "../components/RunLeaderboard";
import RoleLeaderboard from "../components/RoleLeaderboard";

const Leaderboard = () => {
    return (
        <section>
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