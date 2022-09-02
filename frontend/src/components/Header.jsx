import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { logout } from "./../features/auth/authSlice";

function Header() {
    const { user, token } = useSelector((state) => {
        return state.auth;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
        }
    }, [user, token]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        toast.success("Logged out successfully");
    };
    return (
        <div className="h-40 flex items-center justify-between px-12">
            <h2 className="text-white justify-self-end">
                Rock Paper Scissor Lizard Spock
            </h2>
            {user && (
                <div className="flex gap-12">
                    <button
                        onClick={handleLogout}
                        className="bg-transparent hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
