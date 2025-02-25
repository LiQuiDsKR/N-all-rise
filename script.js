let currentStep = 0;
let selectedDate = null;
let timerInterval;

function startTest() {
  const container = document.getElementById('content');
  container.innerHTML = '';
  showQ1();
}

function showQ1() {
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="question-section">
      <p>가장 좋아하는 노래는 무엇인가요?</p>
      </br>
      <p>요즘 너무나도 듣고 싶은 말이 있나요?</p>
      </br>
      <p>상위 1%에 해당된다고 자부하는 것이 있나요?</p>
      <p class="grey-text">아무리 사소하고 하찮더라도 좋습니다!</p>
      <p class="grey-text">저는 키보드에 duddj<sub>영어</sub>로 입력된 오타를 gksrmf<sub>한글</sub>로 해석하는 능력이 상당합니다.</p>
      <button class="underline-button" id="readyBtn" onclick="enableQ1Inputs()">준비 되셨나요?</button>
    </div>
  `;
}

function enableQ1Inputs() {
  // 기존 질문 제거하고 입력 폼만 남김
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="question-section">
      <label>가장 좋아하는 노래는 무엇인가요?</label>
      <input type="text" id="favoriteSong">

      <label>요즘 너무나도 듣고 싶은 말이 있나요?</label>
      <input type="text" id="wantedWords">

      <label>상위 1%에 해당된다고 자부하는 것이 있나요?</label>
      <p class="grey-text">아무리 사소하고 하찮더라도 좋습니다!</p>
      <p class="grey-text">저는 키보드에 duddj<sub>영어</sub>로 입력된 오타를 gksrmf<sub>한글</sub>로 해석하는 능력이 상당합니다.</p>
      <textarea id="topOnePercent"></textarea>

      <button class="underline-button" onclick="showQ2()">다 적었어요!</button>
    </div>
  `;
}

function showQ2() {
  const container = document.getElementById('content');
  const today = new Date();
  let buttonsHTML = '';

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    const className = i === 0 ? 'today' : 'other';
    buttonsHTML += `<button class="date-button ${className}" onclick="selectDate('${dateStr}')">${dateStr}</button>`;
  }

  buttonsHTML += `<button class="date-button outside" onclick="selectDate('그 외 날짜')">그 외 날짜</button>`;

  container.innerHTML = `
    <div class="question-section">
      <p>지난 일주일 동안 가장 많은 일이 있었던 날은 언제였나요?</p>
      ${buttonsHTML}
    </div>
  `;
}

function selectDate(date) {
  selectedDate = date;
  showImmediateQ2FollowUp();
}

function showImmediateQ2FollowUp() {
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="question-section">
      <p>그날 있었던 일을 적어주세요. 기억을 더듬어 상세하게 적을 필요는 없습니다!</p>
      <p>원하는 만큼 적고 넘어가도 좋습니다. 충분한 준비가 되었다면, 시작해볼까요?</p>

      <button class="underline-button" onclick="enableQ2Inputs()">준비 되셨나요?</button>
    </div>
  `;
}

function enableQ2Inputs() {
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="question-section">
      <p>그날 있었던 일을 적어주세요. 기억을 더듬어 상세하게 적을 필요는 없습니다!</p>
      <p>원하는 만큼 적고 넘어가도 좋습니다. 충분한 준비가 되었다면, 시작해볼까요?</p>
      </br>
      <textarea id="dayDetails"></textarea>
      <button class="underline-button" onclick="showQ3()">다 적었어요!</button>
    </div>
  `;
}

function showQ3() {
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="question-section" id="finalQuestion">
      <p id="line1" class="fade-in hidden"><b>특정한 상황</b>을 부여하는 것은 여러분의 상상을 <b>제한</b>하게 됩니다.</p>
      <p id="line2" class="fade-in hidden"><b>여러분이 마음껏 뛰어놀 곳을 <b>놀이터</b>나 <b>공원</b> 같은 <b>특정한 공간</b>으로 <b>제한</b>하지 않겠습니다.</b></p>
      <p id="line3" class="fade-in hidden"><b>주제 :</b> 없음</p>
      <p id="line4" class="fade-in hidden">이 순간 떠오르는 모든 생각과 감정을 자유롭게 적어보세요.</p>

      <div id="timer" class="hidden">
        <span class="timer-icon">⏰</span><span id="time">5:00</span>
      </div>

      <textarea id="finalAnswer" class="hidden"></textarea>
    </div>
  `;

  // 각 줄을 0.5초 간격으로 순차적으로 나타나게 하는 로직
  setTimeout(() => {
    document.getElementById('line1').classList.remove('hidden');
  }, 500);

  setTimeout(() => {
    document.getElementById('line2').classList.remove('hidden');
  }, 1000);

  setTimeout(() => {
    document.getElementById('line3').classList.remove('hidden');
  }, 1500);

  setTimeout(() => {
    document.getElementById('line4').classList.remove('hidden');
  }, 2000);

  // 4줄이 모두 나타난 뒤 타이머와 입력창이 동시에 활성화
  setTimeout(() => {
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('finalAnswer').classList.remove('hidden');
    startTimer(300); // 5분 타이머 시작
  }, 2500);
}

function startTimer(duration) {
  let timeRemaining = duration;
  const timerElement = document.getElementById('time');

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      alert('시간이 끝났습니다!');
    }
  }, 1000);
}
