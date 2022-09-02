import { useEffect } from "react";
import { useState } from "react";
import {
    FaHandRock,
    FaHandPaper,
    FaHandScissors,
    FaHandLizard,
    FaHandSpock,
} from "react-icons/fa";

import DisplayResult from "../components/DisplayResult";

import Spinner from "../utils/Spinner";

import { useSelector } from "react-redux";

function Home() {
    const { user } = useSelector((state) => {
        return state.auth;
    });
    const allMoves = ["rock", "paper", "scissor", "lizard", "spock"];

    const map = new Map();
    map.set("rock", <FaHandRock className="w-20 h-20 icon" />);
    map.set("scissor", <FaHandScissors className="w-20 h-20 icon" />);
    map.set("paper", <FaHandPaper className="w-20 h-20 icon" />);
    map.set("lizard", <FaHandLizard className="w-20 h-20 icon" />);
    map.set("spock", <FaHandSpock className="w-20 h-20 icon" />);

    const result = new Map();
    result.set("user", `${user && user.username} has won`);
    result.set("computer", "Computer has won");
    result.set("draw", "It's a draw");

    const getRandom = () => {
        return Math.floor(Math.random() * 4);
    };

    const [loading, setLoading] = useState(false);
    const [userMove, setUserMove] = useState("");
    const [compMove, setCompMove] = useState("");
    const [winner, setWinner] = useState("");
    const [scores, setScores] = useState({
        userScore: 0,
        compScore: 0,
    });
    const [updatingScores, setUpdatingScores] = useState(false);
    const [finalWinner, setFinalWinner] = useState({
        winner: "",
        loser: "",
        userScore: 0,
        compScore: 0,
        isFinalWinner: false,
    });

    useEffect(() => {
        if (!loading && userMove && compMove) {
            checkWinner();
            setUpdatingScores(true);
        }
        // eslint-disable-next-line
    }, [loading, userMove, compMove]);

    useEffect(() => {
        if (updatingScores) {
            updateScores();
            setUpdatingScores(false);
        }
        // eslint-disable-next-line
    }, [updatingScores]);

    const handleMove = (e) => {
        setLoading(true);
        e.preventDefault();
        let currentMove = e.currentTarget.dataset.move;
        setTimeout(() => {
            setUserMove(currentMove);
            setCompMove(allMoves[getRandom()]);
            setLoading(false);
        }, 500);
    };

    const checkWinner = () => {
        const plays = {
            scissor: ["paper", "lizard"],
            paper: ["rock", "spock"],
            rock: ["lizard", "scissor"],
            spock: ["scissor", "rock"],
            lizard: ["spock", "paper"],
        };

        if (userMove === compMove) {
            setWinner("draw");
            return "draw";
        }

        for (let [key, values] of Object.entries(plays)) {
            if (key.toString() === userMove && values.includes(compMove)) {
                setWinner("user");

                return "user";
            }
        }

        setWinner("computer");

        return "computer";
    };

    const updateScores = () => {
        console.log("Inside update scores function");
        if (winner === "user") {
            setScores((prev) => {
                return {
                    ...prev,
                    userScore: prev.userScore + 1,
                };
            });
        } else if (winner === "computer") {
            setScores((prev) => {
                return {
                    ...prev,
                    compScore: prev.compScore + 1,
                };
            });
        }
    };

    const checkUpdateScores = () => {
        if (scores.userScore >= 10) {
            setFinalWinner({
                winner: user.username,
                loser: "computer",
                userScore: scores.userScore,
                compScore: scores.compScore,
                isFinalWinner: true,
            });
            document.querySelectorAll(".option").forEach((option) => {
                option.classList.add("pointer-events-none");
            });
        } else if (scores.compScore >= 10) {
            setFinalWinner({
                loser: user.username,
                winner: "computer",
                userScore: scores.userScore,
                compScore: scores.compScore,
                isFinalWinner: true,
            });
            document.querySelectorAll(".option").forEach((option) => {
                option.classList.add("pointer-events-none");
            });
        }
    };

    const resetAllData = () => {
        setFinalWinner({
            winner: "",
            loser: "",
            userScore: 0,
            compScore: 0,
            isFinalWinner: false,
        });

        setScores({
            userScore: 0,
            compScore: 0,
        });

        setUserMove("");
        setCompMove("");
        setWinner("");
        setLoading(false);
        document.querySelectorAll(".option").forEach((option) => {
            option.classList.remove("pointer-events-none");
        });
    };

    useEffect(() => {
        checkUpdateScores();
        // eslint-disable-next-line
    }, [scores]);

    return (
        <>
            <div className="user">
                <h2 className="mb-4">Make your move</h2>
                <div className="move-options">
                    <div
                        onClick={handleMove}
                        className="option bg-black px-6 py-6 rounded-xl cursor-pointer flex flex-col items-center"
                        data-move="rock"
                    >
                        <FaHandRock className="w-20 h-20 icon" />
                        <p>Rock</p>
                    </div>
                    <div
                        onClick={handleMove}
                        className="option bg-black px-6 py-6 rounded-xl cursor-pointer hover:bg-white flex flex-col items-center"
                        data-move="paper"
                    >
                        <FaHandPaper className="w-20 h-20 icon" />
                        <p>Paper</p>
                    </div>
                    <div
                        onClick={handleMove}
                        className="option bg-black px-6 py-6 rounded-xl cursor-pointer flex flex-col items-center"
                        data-move="scissor"
                    >
                        <FaHandScissors className="w-20 h-20 icon" />
                        <p>Scissors</p>
                    </div>
                    <div
                        onClick={handleMove}
                        className="option bg-black px-6 py-6 rounded-xl cursor-pointer flex flex-col items-center"
                        data-move="lizard"
                    >
                        <FaHandLizard className="w-20 h-20 icon" />
                        <p>Lizard</p>
                    </div>
                    <div
                        onClick={handleMove}
                        className="option bg-black px-6 py-6 rounded-xl cursor-pointer flex flex-col items-center"
                        data-move="spock"
                    >
                        <FaHandSpock className="w-20 h-20 icon" />
                        <p>Spock</p>
                    </div>
                </div>
            </div>

            <h3 className="text-center mb-8">
                Whoever gets to 10 wins the game
            </h3>
            <div className="user-and-computer">
                <div className="flex gap-12 items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h3>Score</h3>
                        <p>{scores.userScore}</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 user-conatiner">
                        <h2>{user && user.username}</h2>

                        {loading && <Spinner />}
                        {userMove && !loading ? (
                            <div
                                className={`bg-black px-6 py-6 rounded-xl  flex flex-col items-center max-w-fit ${
                                    winner === "user" ? "winner" : "loser"
                                }`}
                            >
                                {map.get(userMove)}
                                <p>
                                    {userMove.charAt(0).toUpperCase()}
                                    {userMove.slice(1)}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <h3 className="mt-8">VS</h3>

                <div className="flex items-center gap-12 comp-container">
                    <div className="flex flex-col items-center gap-4 ">
                        <h2>Computer</h2>
                        {loading && <Spinner />}
                        {compMove && !loading ? (
                            <div
                                className={`bg-black px-6 py-6 rounded-xl  flex flex-col items-center max-w-fit ${
                                    winner === "computer" ? "winner" : "loser"
                                }`}
                            >
                                {map.get(compMove)}
                                <p>
                                    {compMove.charAt(0).toUpperCase()}
                                    {compMove.slice(1)}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="flex flex-col justify-center items-center h-20">
                        <h3>Score</h3>
                        <p>{scores.compScore}</p>
                    </div>
                </div>
            </div>
            {userMove && compMove && !loading ? (
                <h3 className="text-center">{result.get(winner)}</h3>
            ) : (
                ""
            )}
            {finalWinner.isFinalWinner && (
                <DisplayResult
                    finalWinner={finalWinner}
                    resetAllData={resetAllData}
                    user={user}
                />
            )}
        </>
    );
}

export default Home;
