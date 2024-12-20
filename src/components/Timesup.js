import React from "react";

export default function Timesup({ userName, setTimeOut, handleNextQuestion, questionNumber, setGameOver }) {

    const handleClick = () => {
        setTimeOut(false);
        if (questionNumber === 10) {
            setGameOver(true);
        }
        handleNextQuestion(true);
    };

    return (
        <div className="timesup">
            <span className="big"> {userName}</span> <h1>Süre doldu &#128336;! Daha hızlı deneyin !</h1><br/>
            <h1>Devam etmek için <span className="big">2 kere</span> tıkla</h1><br/>
            <p>*ceza olarak bir soru kaybedeceksiniz 😈*</p>
            <button className="col-6 mt-6 btn btn-dark btn-lg" data-bs-toggle="button"
                onClick={handleClick}
            >Oyuna Devam Et</button>
        </div>

    );
}