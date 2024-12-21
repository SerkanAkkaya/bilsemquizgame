import "./App.css";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Questionnaire } from "./components";

import Timer from "./components/Timer";
import Change from "./components/Change";
import Start from "./components/Start";
import Timesup from "./components/Timesup";
import DoubleTime from "./components/DoubleTime";

function App() {
    const [userName, setUserName] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [earn, setEarn] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeOut, setTimeOut] = useState(false);
    const [timer, setTimer] = useState(30);
    const [doubleTimeUsed, setDoubleTimeUsed] = useState(false);
    const [changeUsed, setChangeUsed] = useState(false);

    // Yeni state: Veri kaynağını takip eder
    const [dataSource, setDataSource] = useState("./data.json");

    const moneyPyramid = useMemo(
        () =>
            [
                { id: 1, amount: 100 },
                { id: 2, amount: 200 },
                { id: 3, amount: 300 },
                { id: 4, amount: 500 },
                { id: 5, amount: 1000 },
                { id: 6, amount: 2000 },
                { id: 7, amount: 4000 },
                { id: 8, amount: 8000 },
                { id: 9, amount: 16000 },
                { id: 10, amount: 32000 },
            ].reverse(),
        []
    );

    // Veri kaynağını yükler
    useEffect(() => {
        fetch(dataSource)
            .then((res) => res.json())
            .then((data) => {
                const questions = data.results.map((question) => ({
                    ...question,
                    answers: [
                        question.correct_answer,
                        ...question.incorrect_answers,
                    ].sort(() => Math.random() - 0.5),
                }));
                setQuestions(questions);
            });
    }, [dataSource]);

    const handleAnswer = (answer) => {
        if (answer === questions[currIndex].correct_answer) {
            setEarn(moneyPyramid[10 - questionNumber].amount + earn);
        }
        handleNextQuestion(true);
    };

    const handleNextQuestion = (changeQuestion) => {
        if (questionNumber === 10) {
            setGameOver(true);
        }
        if (changeQuestion) {
            setQuestionNumber(questionNumber + 1);
        }
        setCurrIndex(currIndex + 1);
    };

    // Veri kaynağını değiştirir
    const toggleDataSource = () => {
        setDataSource((prevSource) =>
            prevSource === "./data.json" ? "./data1.json" : "./data.json"
        );
    };

    const restartGame = () => {
        setUserName(null);
        setQuestions([]);
        setCurrIndex(0);
        setQuestionNumber(1);
        setEarn(0);
        setGameOver(false);
        setTimeOut(false);
        setTimer(30);
        setDoubleTimeUsed(false);
        setChangeUsed(false);
        setDataSource("./data.json");
    };

    return !userName ? (
        <div className="startScreen">
            <div className="title">Tasarrufu Biliyorum Oyununa Hoşgeldiniz</div>
            <Start setUsername={setUserName} />
            <footer>
                <p className="copyRight">Küçükçekmece Bilsem</p>
            </footer>
        </div>
    ) : questions.length > 0 ? (
        <div className="app vh-100">
            <>
                <div className="main col-9">
                    {gameOver ? (
                        <div className="endScreen">
                            <h1>
                                Oyun Bitti! <br/> <span className="big">{userName}</span> ★{" "}
                                {earn} puan kazandınız!
                            </h1>
                            {/* Tekrar Oyna Butonu */}
                            <button
                                onClick={restartGame}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "darkblue",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                            >
                                Tekrar Oyna
                            </button>
                        </div>
                    ) : timeOut ? (
                        <Timesup
                            userName={userName}
                            setTimeOut={setTimeOut}
                            timeOut={timeOut}
                            setGameOver={setGameOver}
                            questionNumber={questionNumber}
                            handleNextQuestion={handleNextQuestion}
                        />
                    ) : (
                        <>
                            <div className="top">
                                <div className="timer">
                                    <Timer
                                        setTimeOut={setTimeOut}
                                        questionNumber={questionNumber}
                                        timer={timer}
                                        setTimer={setTimer}
                                        changeUsed={changeUsed}
                                    />
                                </div>

                                {/* Veri kaynağını değiştirme butonu */}
                                <button onClick={toggleDataSource}
                                        style={{backgroundColor: 'darkgreen', color: 'white'}}>
                                      Soruları Değiştir
                                </button>
                            </div>
                            <div className="bottom">
                                <Questionnaire
                                    data={questions[currIndex]}
                                    handleAnswer={handleAnswer}
                                    setTimeOut={setTimeout}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="pyramid col-3">
                    <div className="moneyList vh-100">
                        {moneyPyramid.map((m, idx) => (
                            <div
                                className={
                                    questionNumber === m.id
                                        ? "moneyListItem active row"
                                        : "moneyListItem row"
                                }
                                key={idx}
                            >
                                <div className="moneyListItemNumber col-3 d-flex align-items-center">
                                    {m.id}
                                </div>
                                <div className="moneyListItemAmount col-9 d-flex align-items-center">
                                    ★ {m.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    ) : (
        <h2 className="big">Loading...</h2>
    );
}

export default App;
