import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { quiz, MONEY_BONUS } from "./mockdata";

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [startPage, setStartPage] = useState(true);
  // Chuyển qua dùng state kiểu boolean
  const [questionPage, setQuestionPage] = useState("d-none");
  const [resultPage, setResultPage] = useState("d-none");
  const [nextBtnDisable, setNextBtnDisable] = useState(true);

  const [hideNextBtn, setHideNextBtn] = useState(false);
  const [hideFinishBtn, setHideFinishBtn] = useState("d-none");

  const [choiceBtnDisable, setChoiceBtnDisable] = useState(false);
  // State gợi ý nhà thông thái
  const [stateSuggestion, setSuggestion] = useState("");
  const [stateSuggestionCss, setSuggestionCss] = useState("d-none");
  // State thêm css cho đáp án đúng và sai
  const [stateAlertCssAnswer, setAlertCssAnswer] = useState("");
  // Css đúng/sai
  const [stateIsRight, setIsRight] = useState(false);
  const [stateIsWrong, setIsWrong] = useState(false);
  const [stateChoiceIndex, setChoiceIndex] = useState(null);

  const [score, setScore] = useState(0);
  const [stateMoneyBonus, setMoneyBonus] = useState(0);

  const [message, setMessage] = useState("");
  // Câu hỏi hiện tại lấy ra từ DATA ở index 0 - 1 mảng
  const current_question = quiz[currentQuestionNumber];

  useEffect(() => {
    console.log("run useEffect on App");
  }, []);

  function pressStart() {
    setStartPage(false);
    setQuestionPage("d-flex");
  }

  function checkAnswer(event, index) {  console.log("Kiểm tra kết quả");
    let current_answer = quiz[currentQuestionNumber].ans.trim();
    let choice = event.target.textContent.trim(); 

    setChoiceIndex(index);
    if (choice === current_answer) { console.log("Trả lời đúng");
      setIsRight(true);
      setIsWrong(false);

      setScore(score + 10);
      let moneyBonusNum = MONEY_BONUS[currentQuestionNumber];
      setMoneyBonus(moneyBonusNum);
      
      console.log('currentQuestionNumber', currentQuestionNumber)
      setTimeout(nextQuestion, 2000);
    } else {  console.log("Trả lời sai");
      // setAlertCssAnswer("wrong-answer");
      setIsRight(false);
      setIsWrong(true);
      setTimeout(stopTheGame, 2000);
    }

    if (currentQuestionNumber === quiz.length - 1) { 
      setHideNextBtn(false);
      setHideFinishBtn("d-block, d-flex");
    }
    setChoiceBtnDisable(true);
    setNextBtnDisable(false);
  }
  // Nút hỏi các nhà thông thái => đúng 100%
  function eruditeSuggestion() {
    let current_answer = quiz[currentQuestionNumber].ans.trim();
    console.log(`Chúng tôi khuyên bạn chọn đáp án: ${current_answer}`);
    setSuggestion(current_answer);
    setSuggestionCss("d-block");
  }
  // Nút chuyển câu
  function nextQuestion() {
    console.log("Câu kế tiếp");
    setSuggestionCss("d-none");
    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);

    if (currentQuestionNumber < quiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setChoiceBtnDisable(false);
    }
    setNextBtnDisable(true);
  }
  // Dừng cuộc chơi
  function stopTheGame() {
    console.log("Dừng cuộc chơi vì không chắc chắn đáp án");
    setQuestionPage("d-none");
    setResultPage("d-block, d-flex");

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
    score > 0
      ? setMessage("Chúc mừng bạn đã đã hoàn thành cuộc chơi!")
      : setMessage("Hơi tiếc bạn chưa đúng câu nào!");
  }
  // Màn thông báo kết quả
  function showResultPage() {
    setQuestionPage("d-none");
    setResultPage("d-block, d-flex");

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
    score > 0
      ? setMessage("Chúc mừng bạn đã đã hoàn thành cuộc chơi!")
      : setMessage("Hơi tiếc bạn chưa đúng câu nào!");
  }
  // Nút chơi lại - thay đổi giao diện và các giá trị về ban đầu
  function replay() {
    setStartPage(true);
    setResultPage("d-none");
    setCurrentQuestionNumber(0);
    setQuestionPage("d-none");
    setNextBtnDisable("true");
    setHideFinishBtn("d-none");
    setScore(0);
    setMessage("");
    setChoiceBtnDisable(false);

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
  }

  return (
    <>
      {/* Màn hình bắt đầu che đi ban đầu */}
      <div
        className={` start-page  container-fluid p-0 ${
          startPage ? "d-block" : "d-none"
        }`}
      >
        <button
          type="button"
          className="App-start-btn  btn btn-lg d-block mx-auto py-3 px-5 fs-3"
          onClick={pressStart}
        >
          Start
        </button>
      </div>

      {/* Màn hình để chơi */}
      <section className={` quiz-container  ${questionPage} container-fluid `}>
        <div className=" infor-btn-points-gift container ">
          <span>
            <div className=" number-of-question ">
              {" "}
              Câu hỏi: <b>{currentQuestionNumber + 1}</b>/10{" "}
            </div>
          </span>

          <div className=" moneys-helps ">
            <div className=" money-bonus ">
              Điểm&nbsp;{score} &nbsp; <i className="fas fa-dollar-sign" />{" "}
              {stateMoneyBonus} vnđ
            </div>

            <div className=" helps ">
              {/* Bỏ đi ngẫu nhiên 2 đáp án sai */}
              <span>
                <b>50:50</b>
              </span>
              {/* Trả lời random 4 câu trả lời - ko chắc */}
              <span>
                {" "}
                <i className="fas fa-phone-volume" />{" "}
              </span>
              {/* Hỏi ý  kiến của khán giả - nhiều người-random 4 câu trả lời -  2 đáp án ko chắc  */}
              <span>
                {" "}
                <i className="fas fa-users" />{" "}
              </span>
              {/* Hỏi ý kiến nhà thông thái - đáp án đúng 100% */}
              <span onClick={eruditeSuggestion}>
                {" "}
                <i className="fas fa-graduation-cap" />{" "}
              </span>
              <span className={`eruditeSuggestion  ${stateSuggestionCss} `}>
                {" "}
                {stateSuggestion}{" "}
              </span>
            </div>
          </div>
        </div>

        {/*  */}
        <div className=" process   container ">
          <div className=" actual-progress ">0%</div>
        </div>

        {/* Phần khung quiz */}
        <div className=" quiz-form    container ">
          {/* Câu hỏi */}
          <div className=" questions ">
            <span> {current_question.question} </span>
          </div>

          <div className=" answers  choices-box" id="content">

            {current_question.choices.map((choise, index) => (
              <div
                onClick={(event) => checkAnswer(event, index)}
                disabled={choiceBtnDisable}
                className={` ${
                  stateIsRight && index === stateChoiceIndex
                    ? "correct-answer"
                    : stateIsWrong && index === stateChoiceIndex
                    ? "wrong-answer"
                    : ""
                } answer  option-${index + 1} `}
              >
                {current_question.choices[index]}
              </div>
            ))}
            
          </div>

          <div className=" buttons ">
            {/* <span className= { ` ${ hideNextBtn } skip-question `} onClick={nextQuestion} disabled={nextBtnDisable}  >&nbsp;Câu tiếp&nbsp;</span>*/}
            <span
              className={` ${hideNextBtn ? 'd-flex' : 'd-none' } skip-question `}
              onClick={stopTheGame}
              disabled={nextBtnDisable}
            >
              &nbsp;Không chắc chắn đáp án - dừng cuộc chơi!&nbsp;
            </span>
            <span
              className={`${hideFinishBtn} stop-quiz `}
              onClick={showResultPage}
            >
              Finish
            </span>
          </div>
        </div>
      </section>
      {/* Màn hình để chơi */}

      <div
        className={` result-page-container   container-fluid p-0 ${resultPage}`}
      >
        <div className=" result-page ">
          <p className="h2 text-center">{message}</p>
          <p className="h3 text-center">
            <span>
              Số tiền bạn nhận được: <b>{stateMoneyBonus}&nbsp;vnđ</b>
            </span>{" "}
            <br />
            Và{" "}
            <span className="text-success">
              <b>{score}</b>
            </span>{" "}
            điểm
          </p>

          <button type="button" className="App-reply-btn " onClick={replay}>
            Replay
          </button>
        </div>

      </div>
    </>
  );
}

export default App;
