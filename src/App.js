import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { quiz, MONEY_BONUS } from "./mockdata";

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [startPage, setStartPage] = useState(true);
  // Chuyển qua dùng state kiểu boolean
  const [questionPage, setQuestionPage] = useState(false);
  const [resultPage, setResultPage] = useState(false);
  const [nextBtnDisable, setNextBtnDisable] = useState(true);

  const [hideNextBtn, setHideNextBtn] = useState(false);
  const [hideFinishBtn, setHideFinishBtn] = useState("d-none");

  const [choiceBtnDisable, setChoiceBtnDisable] = useState(false);
  // State gợi ý nhà thông thái
  const [stateSuggestion, setSuggestion] = useState("");
  const [stateSuggestionCss, setSuggestionCss] = useState("d-none");
  // Css đúng/sai
  const [stateIsRight, setIsRight] = useState(false);
  const [stateIsWrong, setIsWrong] = useState(false);
  const [stateChoiceIndex, setChoiceIndex] = useState(null);

  const [score, setScore] = useState(0);
  const [stateMoneyBonus, setMoneyBonus] = useState(0);

  const [message, setMessage] = useState("");
  // Câu hỏi hiện tại lấy ra từ DATA ở index 0 - 1 mảng
  const current_question = quiz[currentQuestionNumber];
  // Thời gian đếm ngược 60s cho mỗi câu hỏi mới cho 100%
  const [stateWidthByQuestionDuration, setWidthByQuestionDuration] = useState( 100 );
  const [stateTimeClockDurationNumber, setTimeClockDurationNumber] = useState( 60 );
  const timeClockDurationNumberRef = useRef()
  console.log('timeClockDurationNumberRef', timeClockDurationNumberRef);
  // Thời gian đếm ngược 30s cho Hỗ trợ gọi điện cho người thân
  const [stateWidthByHelpCallDuration, setWidthByHelpCallDuration] = useState( 100 );
  const [stateHelpCallDuration, setHelpCallDuration] = useState(30);
  const [stateCssHelpCallDuration, setCssHelpCallDuration] = useState(false);


  useEffect(() => {
    console.log("run useEffect on App");
  }, []);

  useRef(() => {
    console.log("run useRef on App");
  }) 

 
  function pressStart() {
    setStartPage(false);
    setQuestionPage(true);
    setHideNextBtn(true);
    setCssHelpCallDuration(false);
    clearInterval(interval); 
    clearInterval(setInterval_call_help_from_relatives);
    // Bắt đầu tính time 60s cho câu hỏi số 1-được hiện lên và sau chuyển câu 
    setIntervalQuestionDuration();
   
  }
  let interval;
  function setIntervalQuestionDuration() {
    clearInterval(interval);
    // Đặt lại số time đ ngược và 100% width
    setWidthByQuestionDuration( stateWidthByQuestionDuration, 100 );
    setTimeClockDurationNumber( stateTimeClockDurationNumber, 60 );

    interval = setInterval( countDownQuestionDuration, 1000 );
    console.log('set interval 60s-question');
  }
  // Tạo time đếm ngược - time clock tác động đến width
  let time_clock = stateTimeClockDurationNumber;
  function countDownQuestionDuration() { console.log('Chạy setInterval')
    if ( time_clock > 0 ) {     
      let time_width_ratio = time_clock * (100 / 60);      
      setWidthByQuestionDuration(time_width_ratio) // width

      setTimeClockDurationNumber(time_clock --); // Number time
      console.log('time_clock', time_clock)  
    } 
    else if ( time_clock === 0 ) {
      console.log('Thời gian trả lời câu hỏi của bạn đã hết, xóa interval ');
      clearInterval(interval);
      setTimeClockDurationNumber(0);
      // stopTheGame();
    
    }
  } 
  // Kiểm tra kết quả
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
    } 
    else {  console.log("Trả lời sai");
      setIsRight(false);
      setIsWrong(true);
      setTimeout(stopTheGame, 2000);
    }
    // Khi hoàn thành
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
  // Set Interval Gọi điện cho người thân
  let setInterval_call_help_from_relatives;
  function callAnAcquaintance() { console.log('Goi điện cho người thân, 30s đếm ngược')
    setCssHelpCallDuration(true);
    clearInterval(setInterval_call_help_from_relatives)
    setInterval_call_help_from_relatives = setInterval( count_down_call_An_Acquaintance , 1000);
  }
  // Hàm đếm ngược Gọi điện cho người thân
  let time_call_help_from_relatives = 30;
  function count_down_call_An_Acquaintance(){
    // setHelpCallDuration
    if ( time_call_help_from_relatives > 0  ) {
      let time_call_help_from_relatives_width_ratio = time_call_help_from_relatives * (100 / 30);     
      setWidthByHelpCallDuration( time_call_help_from_relatives_width_ratio )
      setHelpCallDuration( time_call_help_from_relatives -- )
    }
    else if ( time_call_help_from_relatives === 0 ) {
      setHelpCallDuration(0)
      clearInterval(setInterval_call_help_from_relatives)
      console.log('30s gọi điện cho người thân đã hết')
    }
  }

  // Nút chuyển câu
  function nextQuestion() {
    console.log("Câu kế tiếp");
    setSuggestionCss("d-none");
    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
    // chuyển câu KO xóa interval và cài lại số time
    setIntervalQuestionDuration()
    
    setWidthByQuestionDuration( 100 );
    setTimeClockDurationNumber( 60 );


    if (currentQuestionNumber < quiz.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setChoiceBtnDisable(false);
    }
    setNextBtnDisable(true);
  }
  // Dừng cuộc chơi
  function stopTheGame() {
    console.log("Dừng cuộc chơi vì không chắc chắn đáp án");
    setQuestionPage(false);
    setResultPage(true);
    setHideNextBtn(false) 

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
    score > 0
      ? setMessage("Chúc mừng bạn đã đã hoàn thành cuộc chơi!")
      : setMessage("Hơi tiếc bạn chưa đúng câu nào!");
  }
  // Màn thông báo kết quả
  function showResultPage() {
    setQuestionPage(false);
    setResultPage(true);
    setHideNextBtn(false) 

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
    setResultPage(false);
    setCurrentQuestionNumber(0);
    setQuestionPage(false);
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
      <section className={` ${ questionPage  ? 'd-flex' : 'd-none' }  quiz-container   container-fluid `} >
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
              
              {/* Trợ giúp ngườ thân - Trả lời random 4 câu trả lời - ko chắc */}
              <span>
                <i onClick={callAnAcquaintance} 
                   className= {` fas fa-phone-volume `}/> 
              </span>
             
              {/* Hỏi ý  kiến của khán giả - nhiều người-random 4 câu trả lời -  2 đáp án ko chắc  */}
              <span>
                <i className="fas fa-users" />
              </span>
              
              {/* Hỏi ý kiến nhà thông thái - đáp án đúng 100% */}
              <span onClick={eruditeSuggestion}>
                <i className="fas fa-graduation-cap" />
              </span>
              
              <span className={`eruditeSuggestion  ${stateSuggestionCss} `}>
                {stateSuggestion}
              </span>

            </div>

          </div>
        </div>

        {/* Thời lượng của 1 câu hỏi */}
        <div className=' process-title '>Thời gian cho câu hỏi số <b>{currentQuestionNumber + 1}</b> với 60s bắt đầu</div>
        <div className=" question-duration-process   container ">

          <div style = {{width: ` calc( 0% + ${stateWidthByQuestionDuration}% ) `}} 
            className=" question-duration-actual-progress ">
              { stateTimeClockDurationNumber }s
            </div>

        </div>

        {/* Thời lượng 30s cho trợ giúp từ người thân*/} 
        <div className= {`${stateCssHelpCallDuration ? 'd-flex' :  'd-none' } ' help-from-relatives-container   container ' `}  >
          
          <div className=' help-from-relatives-title '>Bạn có {stateHelpCallDuration}s gọi điện cho người thân</div>
          <div className=" help-from-relatives ">
            <div style = {{width: ` calc( 0% + ${stateWidthByHelpCallDuration}% ) `}}
                className={` help-from-relatives-actual-progress `}>
                { stateHelpCallDuration }s
            </div>
        
          </div>

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
    
            <span
              className={` ${ hideNextBtn ? 'd-flex' : 'd-none' } skip-question `}
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
      {/* Màn hình kết thúc */}
      <div className={` ${ hideNextBtn ? 'd-flex' : 'd-none' } `} ></div>
      <div
        className={`  ${resultPage ? 'd-flex' : 'd-none'} result-page-container   container-fluid p-0 `}
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
