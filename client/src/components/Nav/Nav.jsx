const Nav = () => {
    return (
        <div className="flex justify-end border-b border-black py-6">
            <div className="">
                <ul className="flex justify-around">
                    <li className="text-lg px-4">Home</li>
                    <li className="text-lg px-4">Leaderboards</li>
                    <li className="text-lg px-4">Profile</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;