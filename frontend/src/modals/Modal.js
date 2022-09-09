import ReactDOM from "react-dom";

export default function Modal({ finalWinner, resetAllData, user }) {
    const modalContent = (
        <div className="modal">
            <div className="flex justify-center items-center display-result p-4">
                <div className="w-full h-fit">
                    <h2 className="text-center mb-8">
                        Winner is {finalWinner.winner}
                    </h2>
                    <div className="flex justify-around mb-8">
                        <div className="flex flex-col justify-center items-center">
                            <h3>{user.username}</h3>
                            <p>{finalWinner.userScore}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h3>Computer</h3>
                            <p>{finalWinner.compScore}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={resetAllData}
                            className="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded text-2xl"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
}
