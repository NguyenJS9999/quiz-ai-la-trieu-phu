import './App.css';

function App() {
  return (
  <>
     <section className=" quiz-container   container-fluid ">
        {/* <div class=" quiz-title-name ">Ai là triệu phú</div> */}
        <div className=" infor-btn-points-gift container ">     
          <span>
            <div className=" number-of-question "> Câu hỏi: <b>1</b>/15 </div>&nbsp;
          </span>
          <span>
            <div className=" money-bonus "><i className="fas fa-dollar-sign" />&nbsp;200.000 vnđ</div>&nbsp;
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
          <div className=" questions ">
            <span>Câu hỏi</span>
          </div>
          <div className=" answers  choices-box" id="content">
            <div className=" answer " id="option-1">
              <span className="numerical-order ">1</span>
              <div>Đáp án A: </div>
            </div>
            <div className=" answer " id="option-2">
              <span className="numerical-order ">2</span>
              <div>Đáp án B:</div>
            </div>
            <div className=" answer " id="option-3">
              <span className="numerical-order ">3</span>
              <div>Đáp án C:</div>
            </div>
            <div className=" answer " id="option-4">
              <span className="numerical-order ">4</span>
              <div>Đáp án D:</div>
            </div>
          </div>
          <div className=" buttons ">
            <span className=" skip-question ">Câu tiếp</span>
            <span className=" stop-quiz ">Dừng cuộc chơi?</span>
          </div>
        </div>
      </section>
  
  
  
  
  </>
  );
}

export default App;
