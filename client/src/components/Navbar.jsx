export default function Navbar() {
    return (
        <div className="flex justify-between px-1">
            <div className="flex space-x-2.5">
                <div>Home</div>
                <div>My Profile</div>
                <div>My Clubs</div>
                <div>Find Articles</div>
            </div>

            <div>
                <div>Logout</div>
            </div>
        </div>
    )
}