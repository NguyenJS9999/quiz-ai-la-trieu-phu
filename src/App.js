import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { QUIZ_DATA, MONEY_BONUS } from "./mockdata";

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const dataLength = QUIZ_DATA.length;

  const [startPage, setStartPage] = useState(true);
  // Chuyển qua dùng state kiểu boolean
  const [questionPage, setQuestionPage] = useState(false);
  const [resultPage, setResultPage] = useState(false);

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

  const [stateMoneyBonus, setMoneyBonus] = useState(0);

  const [message, setMessage] = useState("");
  // Câu hỏi hiện tại lấy ra từ DATA ở index 0 - 1 mảng
  const current_question = QUIZ_DATA[currentQuestionNumber];

  // Thời gian đếm ngược 15s cho Hỗ trợ gọi điện cho người thân
  const [stateWidthByHelpCallDuration, setWidthByHelpCallDuration] = useState( 100 );
  const [stateHelpCallDuration, setHelpCallDuration] = useState(15);
  const [stateCssHelpCallDuration, setCssHelpCallDuration] = useState(false);

 // Thời gian đếm ngược 60s cho mỗi câu hỏi mới cho 100%
 const [stateWidthByQuestionDuration, setWidthByQuestionDuration] = useState( 100 );
//  const [stateTimeClockDurationNumber, setTimeClockDurationNumber] = useState( 10 );

  // Time countdown
  const [counter, setCounter] = useState(null);
  const timer = useRef(null);

  const clearTimer = () => {
    clearTimeout(timer.current);
  };

  useEffect(() => {
    console.log("run useEffect on App");
  }, []);

  useRef(() => {
    console.log("run useRef on App");
  }) 


  function startGame() {
    setStartPage(false);
    setQuestionPage(true);
    setHideNextBtn(true);

    setCounter(10);
    
    setCssHelpCallDuration(false);
    clearInterval(setInterval_call_help_from_relatives);
    // Bắt đầu tính time 60s cho câu hỏi số 1-được hiện lên và sau chuyển câu 
  }

  // Nút chuyển câu
  function nextQuestion() {
    // chuyển câu Xóa interval và cài lại số time
    if ( currentQuestionNumber < dataLength - 1 ) {
      console.log("Câu kế tiếp, dataLength", dataLength);

      setCurrentQuestionNumber( currentQuestionNumber + 1 );
      setChoiceBtnDisable(true);
      // Gán lại time cho câu mới
      // tạm
      clearTimer();
      setCounter(10);

      setSuggestionCss("d-none");
      setIsRight(false);
      setIsWrong(false);
      setChoiceIndex(null);
    } 
    else {
      setCurrentQuestionNumber( dataLength - 1 );
      setChoiceBtnDisable(false);
      clearTimer();
    }
  
  }
 
  // Kiểm tra kết quả
  function checkAnswer(event, index) {  console.log("Kiểm tra kết quả");
    let current_answer = QUIZ_DATA[currentQuestionNumber].ans.trim();
    let choice = event.target.textContent.trim(); 

    setChoiceIndex(index);
    if (choice === current_answer) { console.log("Trả lời đúng");
      clearTimer();
      setIsRight(true);
      setIsWrong(false);
  
      let moneyBonusNum = MONEY_BONUS[currentQuestionNumber];
      setMoneyBonus(moneyBonusNum);
      
      console.log('currentQuestionNumber', currentQuestionNumber)
      setTimeout(nextQuestion, 2000);
    } 
    else {  console.log("Trả lời sai");
      setIsRight(false);
      setIsWrong(true);
      setTimeout(endGame, 2000);
    }
    // Khi hoàn thành
    if (currentQuestionNumber === dataLength - 1) { 
      setHideNextBtn(false);
      setHideFinishBtn("d-block, d-flex");
    }
    setChoiceBtnDisable(true);

  }
  // Nút hỏi các nhà thông thái => đúng 100%
  function eruditeSuggestion() {
    let current_answer = QUIZ_DATA[currentQuestionNumber].ans.trim();
    console.log(`Chúng tôi khuyên bạn chọn đáp án: ${current_answer}`);
    setSuggestion(current_answer);
    setSuggestionCss("d-block");
  }

  // Set Interval Gọi điện cho người thân
  let setInterval_call_help_from_relatives;
  function callAnAcquaintance() { console.log('Goi điện cho người thân, 15s đếm ngược')
    setCssHelpCallDuration(true);
    clearInterval(setInterval_call_help_from_relatives)
    setInterval_call_help_from_relatives = setInterval( count_down_call_An_Acquaintance , 1000);
  }
  // Hàm đếm ngược Gọi điện cho người thân
  let time_call_help_from_relatives = 15;
  function count_down_call_An_Acquaintance(){
    // setHelpCallDuration
    if ( time_call_help_from_relatives > 0  ) {
      let time_call_help_from_relatives_width_ratio = time_call_help_from_relatives * (100 / 15);     
      setWidthByHelpCallDuration( time_call_help_from_relatives_width_ratio )
      setHelpCallDuration( time_call_help_from_relatives -- )
    }
    else if ( time_call_help_from_relatives === 0 ) {
      setHelpCallDuration(0)
      clearInterval(setInterval_call_help_from_relatives)
      console.log('15s gọi điện cho người thân đã hết')
    }
  }

  // Dừng cuộc chơi
  function endGame() {
    console.log("Dừng cuộc chơi vì không chắc chắn đáp án");
    setQuestionPage(false);
    setResultPage(true);
    setHideNextBtn(false) 

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);

    setCounter(0);
    clearTimer();

    stateMoneyBonus > 0
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
    stateMoneyBonus > 0
      ? setMessage("Chúc mừng bạn đã đã hoàn thành cuộc chơi!")
      : setMessage("Hơi tiếc bạn chưa đúng câu nào!");
  }

  // Nút chơi lại - thay đổi giao diện và các giá trị về ban đầu
  function replay() {
    setStartPage(true);
    setResultPage(false);
    setCurrentQuestionNumber(0);
    setQuestionPage(false);
  
    setHideFinishBtn("d-none");
    setMessage("");
    setChoiceBtnDisable(false);

    setIsRight(false);
    setIsWrong(false);
    setChoiceIndex(null);
  }

  // Time countdown
  useEffect( () => {
    if ( counter > 0 ) {
      timer.current = setTimeout(countDown, 1000); console.log('Thời gian đếm ngược, counter')
      setWidthByQuestionDuration( (counter)  * 10 )
      function countDown() {
        // Giảm 
        setCounter( (count) => count - 1);

        if (counter === 1) {
          
          if (currentQuestionNumber < dataLength - 1) {
            // Số thứ thự câu hỏi +1 (chuyển câu), gán lại 10s 
            // setCurrentQuestionNumber(currentQuestionNumber + 1);
            endGame()
          } 
          
          else if  (counter < 0 ){
            setWidthByQuestionDuration( 0 )
            setCurrentQuestionNumber(dataLength - 1);
            endGame()
          }
          
        }

      }

      
    } 
    return clearTimer;

  })

  return (
    <>
      {/* Màn hình bắt đầu che đi ban đầu */}
      <div className={` start-page  container-fluid p-0 ${
            startPage ? "d-block" : "d-none"
          }`
        }>
        
        <div className="start-rule">
          <span>
            <p>Mỗi câu hỏi bạn có <b>10</b> giây để trả lời.</p>
            <p>Đáp án chỉ được lựa chọn 1 lần.</p>
          </span>
        </div>
        

        <button
          type="button"
          className="App-start-btn  btn btn-lg d-block mx-auto py-3 px-5 fs-3"
          onClick={startGame}
        > Vào chơi

        </button>

      </div>
      
      {/* Màn hình để chơi */}
      <section className={` ${ questionPage  ? 'd-flex' : 'd-none' }  quiz-container   container-fluid `} >
        <div className=" infor-btn-points-gift container ">
          <span>
            <div className=" number-of-question ">
              {" "}
              Câu hỏi: <b>{currentQuestionNumber + 1}</b>/{ dataLength }{" "}
            </div>
          </span>

          <div className=" moneys-helps ">
            <div className=" money-bonus ">
              Mức tiền hiện tại:&nbsp;{stateMoneyBonus.toLocaleString()} vnđ
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
        <div className=' process-title '>
          Thời gian cho câu hỏi số <b>{currentQuestionNumber + 1}</b> 
          với 10s bắt đầu
        </div>
        
        <div className=" question-duration-process   container ">

          <div style = {{width: ` calc( ${stateWidthByQuestionDuration}% ) `}} 
            className=" question-duration-actual-progress ">
               {counter }s
            </div>

        </div>

        {/* Thời lượng 15s cho trợ giúp từ người thân*/} 
        <div className= {`${stateCssHelpCallDuration ? 'd-flex' :  'd-none' } ' help-from-relatives-container   container ' `}  >
          
          <div className=' help-from-relatives-title '>Bạn còn {stateHelpCallDuration}s gọi điện cho người thân</div>
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
              className={` ${ hideNextBtn ? 'd-flex' : 'd-none' } skip-question `} onClick={endGame}
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
              Số tiền bạn nhận được: <b>{stateMoneyBonus.toLocaleString()}&nbsp;vnđ</b>
            </span>
          </p>

          <button type="button" className="App-reply-btn " onClick={replay}>
            Chơi lại
          </button>
        </div>

      </div>
    </>
  );
}

export default App;
