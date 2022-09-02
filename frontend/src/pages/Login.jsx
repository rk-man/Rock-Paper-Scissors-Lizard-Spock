import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import { login, reset } from "./../features/auth/authSlice";

function Login() {
    const { user, isSuccess, isError, message, isLoading } = useSelector(
        (state) => {
            return state.auth;
        }
    );

    const [userData, setUserData] = useState({
        username: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && user) {
            toast.success(`${userData.username} has Logged in Successfully`);
            navigate("/");
        } else if (isError && message) {
            toast.error(message);
        }
        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const updateUsername = (e) => {
        setUserData({
            username: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.username.length <= 6) {
            toast.error(
                `${userData.username} doesn't have more than 6 characters`
            );
        } else {
            dispatch(login(userData));
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-14">Login Here</h1>
            <div className="flex flex-col items-center justify-center gap-2 h-200">
                <label htmlFor="username">Enter Your Username</label>
                <input
                    type="text"
                    id="username"
                    className="rounded-md mb-4"
                    onChange={updateUsername}
                    value={userData.username}
                />
                <button
                    type="submit"
                    className="bg-transparent hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl mb-4"
                >
                    Login
                </button>
                <p>
                    New User ?{" "}
                    <Link to="/new-user">
                        <span className="text-green-300 font-bold">
                            Start Here...
                        </span>
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Login;
