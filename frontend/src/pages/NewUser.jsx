import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import { createNewUser, reset } from "./../features/auth/authSlice";

function NewUser() {
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
            dispatch(createNewUser(userData));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center gap-2 h-80">
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
                    className="bg-transparent hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-white hover:border-transparent rounded text-2xl"
                >
                    Start
                </button>
            </div>
        </form>
    );
}

export default NewUser;
