import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { quiz, MONEY_BONUS } from './mockdata';

function App() {

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [startPage, setStartPage] = useState( true );
  const [questionPage, setQuestionPage] = useState('d-none');
  const [resultPage, setResultPage] = useState('d-none');
  const [nextBtnDisable, setNextBtnDisable] = useState(true);

  const [hideNextBtn, setHideNextBtn] = useState("d-block");
  const [hideFinishBtn, setHideFinishBtn] = useState("d-none");

  const [choiceBtnDisable, setChoiceBtnDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [stateMoneyBonus, setMoneyBonus] = useState(0);

  const [message, setMessage] = useState("");
  // Câu hỏi hiện tại lấy ra từ DATA ở index 0 - 1 mảng
  const current_question = quiz[currentQuestionNumber];

  function pressStart() {
    setStartPage( false );
    setQuestionPage('d-block, d-flex')
  }

  function checkAnswer(e) { console.log('Kiểm tra kết quả')
    let current_answer = quiz[currentQuestionNumber].ans; console.log('current_answer', current_answer); console.log('currentQuestionNumber Index', currentQuestionNumber)
    
    let choice = e.target.textContent; console.log('choice', choice)

    if (choice === current_answer) { console.log('Trả lời đúng')
      // alert('Bạn đã trả lời ĐÚNG')
      setScore(score + 10);

      
    } else { console.log('Trả lời sai')
      // alert('Bạn đã trả lời SAI')
      let moneyBonusNum = MONEY_BONUS[currentQuestionNumber]; console.log('moneyBonusNum', moneyBonusNum)
      setMoneyBonus( moneyBonusNum )
    }

    if (currentQuestionNumber === quiz.length - 1) {
      setHideNextBtn('d-none');
      setHideFinishBtn('d-block, d-flex');
    };
    setChoiceBtnDisable(true);
    setNextBtnDisable(false);
  }
  // Nút chuyển câu
  function nextQuestion() { console.log('Câu kế tiếp')
    if (currentQuestionNumber < quiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setChoiceBtnDisable(false);
    };
    setNextBtnDisable(true);
  }
  // Màn thông báo kết quả
  function showResultPage() {
    setQuestionPage('d-none');
    setResultPage('d-block, d-flex');
    (score > 0) ? setMessage("Chúc mừng bạn đã đã hoàn thành cuộc chơi!") : setMessage("Hơi tiếc bạn chưa đúng câu nào!")
  }
  // Nút chơi lại - thay đổi giao diện và các giá trị về ban đầu
  function replay() {
    setStartPage( true );
    setResultPage('d-none');
    setCurrentQuestionNumber(0);
    setQuestionPage('d-none');
    setNextBtnDisable('true');
    setHideFinishBtn('d-none');
    setScore(0);
    setMessage('');
    setChoiceBtnDisable(false);

  }
  return (
  <>
    {/* Màn hình bắt đầu che đi ban đầu */}
    <div className={` start-page  container-fluid p-0 ${ startPage ? 'd-block' : 'd-none' }`}>
      <button type="button" className="App-start-btn  btn btn-lg d-block mx-auto py-3 px-5 fs-3" onClick={pressStart}>Start</button>
    </div>  

    {/* Màn hình để chơi */}
    <section className= { ` quiz-container  ${questionPage} container-fluid ` } >

      <div className=" infor-btn-points-gift container ">     

        <span>
          <div className=" number-of-question "> Câu hỏi: <b>{currentQuestionNumber + 1}</b>/10 </div>&nbsp;
        </span>

        <span>
          <div className=" money-bonus ">Điểm&nbsp;{score} &nbsp; <i className="fas fa-dollar-sign" /> {stateMoneyBonus} vnđ</div>&nbsp;

          <div className=" helps ">
            {/* Bỏ đi ngẫu nhiên 2 đáp án sai */}
            <span><b>50:50</b></span>
            {/* Trả lời random 4 câu trả lời - ko chắc */}
            <span> <i className="fas fa-phone-volume" /> </span>
            {/* Hỏi ý  kiến của khán giả - nhiều người-random 4 câu trả lời -  2 đáp án ko chắc  */}
            <span> <i className="fas fa-users" /> </span>
            {/* Hỏi ý kiến nhà thông thái - đáp án đúng 100% */}
            <span> <i className="fas fa-graduation-cap" /> </span>
          </div>

        </span>

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

          <div onClick={checkAnswer} disabled={choiceBtnDisable} className=" answer " id="option-1">
            <span className="numerical-order ">1</span>
            <div> { current_question.choices[0] } </div>
          </div>

          <div onClick={checkAnswer} disabled={choiceBtnDisable} className=" answer " id="option-2">
            <span className="numerical-order ">2</span>
            <div> { current_question.choices[1] } </div>
          </div>

          <div onClick={checkAnswer} disabled={choiceBtnDisable} className=" answer " id="option-3">
            <span className="numerical-order ">3</span>
            <div> { current_question.choices[2] } </div>
          </div>

          <div onClick={checkAnswer} disabled={choiceBtnDisable} className=" answer " id="option-4">
            <span className="numerical-order ">4</span>
            <div> { current_question.choices[3] } </div>
          </div>

        </div>
        
        <div className=" buttons ">
          <span className= { ` ${ hideNextBtn } skip-question `} onClick={nextQuestion} disabled={nextBtnDisable}  >&nbsp;Câu tiếp&nbsp;</span>
          <span className={`${hideFinishBtn} stop-quiz `} onClick={showResultPage} >Finish</span>

        </div>
      </div>

    </section>
    {/* Màn hình để chơi */}

    <div className={` result-page   container-fluid p-0 ${resultPage}`}>
      <span>
        <p className='h2 text-center'>{message}</p>
        <p className='h3 text-center'>
          <span>Số tiền bạn nhận được: { stateMoneyBonus }</span> <br/>
          Và <span className="text-success">{score}</span> điểm 
          
        </p>

        <button type="button" className="App-start-btn " onClick={replay}>Replay</button>
      </span>
    </div>
      
  
  </>
  );
}

export default App;
