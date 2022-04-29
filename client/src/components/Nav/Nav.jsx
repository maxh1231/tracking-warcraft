import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="flex justify-end border-b border-black py-6">
            <div className="">
                <ul className="flex justify-around">
                    <Link to="/"><li className="text-lg px-4">Home</li></Link>
                    <Link to="/leaderboards"><li className="text-lg px-4">Leaderboards</li></Link>
                    <Link to="/"><li className="text-lg px-4">Profile</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Nav;