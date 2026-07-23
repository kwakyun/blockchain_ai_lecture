
/**
 * Pure Node.js Calculator Server (내장 http 모듈만 사용)
 * 
 * 외부 npm 패키지 설치 없이 Node.js 내장 'http' 모듈만을 사용하여
 * 이미지와 동일한 안드로이드 스타일 UI 계산기 웹 서포트 애플리케이션을 제공합니다.
 * 
 * 실행 방법:
 * node calculator_server.js
 * 브라우저 접속: http://localhost:3000
 */

const http = require('http');

const PORT = 3000;

// HTML / CSS / JS 통합 UI 페이지
const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Android Style Calculator - Node.js</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            user-select: none;
        }

        body {
            background-color: #262626;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        /* 스마트폰 에뮬레이터 프레임 */
        .emulator-container {
            width: 360px;
            height: 720px;
            background-color: #e6e6e6;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 2px solid #333;
        }

        /* 에뮬레이터 상태 상단 바 */
        .status-bar {
            height: 40px;
            background-color: #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }

        .status-icons {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        /* 디스플레이 영역 */
        .display-container {
            flex: 1;
            background-color: #e6e6e6;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            padding: 20px 24px;
            word-break: break-all;
        }

        .history-text {
            font-size: 18px;
            color: #757575;
            min-height: 24px;
            margin-bottom: 10px;
        }

        .current-text {
            font-size: 52px;
            font-weight: 700;
            color: #000000;
            line-height: 1.1;
        }

        /* 키패드 그리드 (6행 4열) */
        .keypad-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(6, 1fr);
            gap: 6px;
            padding: 12px;
            background-color: #d6d6d6;
            height: 480px;
        }

        /* 버튼 기본 스타일 */
        .btn {
            border: none;
            outline: none;
            font-size: 20px;
            font-weight: 500;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.15s ease, transform 0.05s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }

        .btn:active {
            transform: scale(0.96);
        }

        /* 기능 버튼 (회색) */
        .btn-func {
            background-color: #e0e0e0;
            color: #212121;
        }

        .btn-func:hover {
            background-color: #d0d0d0;
        }

        /* 연산자 버튼 */
        .btn-op {
            background-color: #e0e0e0;
            color: #111;
            font-size: 22px;
        }

        .btn-op:hover {
            background-color: #d0d0d0;
        }

        /* 숫자 버튼 (흰색) */
        .btn-num {
            background-color: #ffffff;
            color: #000000;
            font-weight: 600;
            font-size: 22px;
        }

        .btn-num:hover {
            background-color: #f5f5f5;
        }

        /* 비활성/보조 텍스트 색상 연한 버튼 */
        .btn-sub {
            background-color: #e0e0e0;
            color: #888888;
        }

        /* 등호 버튼 (파란색 메인 포인트) */
        .btn-equal {
            background-color: #389bbf;
            color: #ffffff;
            font-weight: bold;
            font-size: 26px;
        }

        .btn-equal:hover {
            background-color: #2e87a7;
        }

        /* 하단 내비게이션 바 */
        .nav-bar {
            height: 36px;
            background-color: #000000;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 40px;
        }

        .nav-btn {
            width: 14px;
            height: 14px;
            border: 2px solid #ffffff;
        }
        .nav-back {
            border-right: none;
            border-top: none;
            transform: rotate(45deg);
            width: 12px;
            height: 12px;
        }
        .nav-home {
            border-radius: 50%;
        }
        .nav-rect {
            border-radius: 2px;
        }
    </style>
</head>
<body>

    <div class="emulator-container">
        <!-- 안드로이드 상태바 -->
        <div class="status-bar">
            <span>7:32</span>
            <div class="status-icons">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
            </div>
        </div>

        <!-- 디스플레이 영역 -->
        <div class="display-container">
            <div class="history-text" id="historyDisplay">0</div>
            <div class="current-text" id="currentDisplay">0.0</div>
        </div>

        <!-- 키패드 영역 (이미지 배치 그대로 구현) -->
        <div class="keypad-grid">
            <!-- Row 1 -->
            <button class="btn btn-func" onclick="handlePercent()">%</button>
            <button class="btn btn-func" onclick="handleCE()">CE</button>
            <button class="btn btn-func" onclick="handleC()">C</button>
            <button class="btn btn-func" onclick="handleDel()">DEL</button>

            <!-- Row 2 -->
            <button class="btn btn-func" onclick="handleReciprocal()">1/X</button>
            <button class="btn btn-func" onclick="handleSquare()">X^2</button>

            <button class="btn btn-func" onclick="handleSqrt()">√X</button>
            <button class="btn btn-op" onclick="handleOperator('/')">/</button>

            <!-- Row 3 -->
            <button class="btn btn-num" onclick="handleNumber('7')">7</button>
            <button class="btn btn-num" onclick="handleNumber('8')">8</button>
            <button class="btn btn-num" onclick="handleNumber('9')">9</button>
            <button class="btn btn-op" onclick="handleOperator('*')">X</button>

            <!-- Row 4 -->
            <button class="btn btn-num" onclick="handleNumber('4')">4</button>
            <button class="btn btn-num" onclick="handleNumber('5')">5</button>
            <button class="btn btn-num" onclick="handleNumber('6')">6</button>
            <button class="btn btn-op" onclick="handleOperator('-')">-</button>

            <!-- Row 5 -->
            <button class="btn btn-num" onclick="handleNumber('1')">1</button>
            <button class="btn btn-num" onclick="handleNumber('2')">2</button>
            <button class="btn btn-num" onclick="handleNumber('3')">3</button>
            <button class="btn btn-op" onclick="handleOperator('+')">+</button>

            <!-- Row 6 -->
            <button class="btn btn-func" onclick="handleToggleSign()">+/-</button>
            <button class="btn btn-num" onclick="handleNumber('0')">0</button>
            <button class="btn btn-num" onclick="handleDot()">.</button>
            <button class="btn btn-equal" onclick="handleEqual()">=</button>
        </div>

        <!-- 하단 안드로이드 시스템 버튼 -->
        <div class="nav-bar">
            <div class="nav-btn nav-back"></div>
            <div class="nav-btn nav-home"></div>
            <div class="nav-btn nav-rect"></div>
        </div>
    </div>

    <script>
        let currentInput = "0.0";
        let previousInput = "";
        let operator = null;
        let shouldResetDisplay = false;

        const currentDisplay = document.getElementById('currentDisplay');
        const historyDisplay = document.getElementById('historyDisplay');

        function updateDisplay() {
            currentDisplay.innerText = currentInput;
        }

        function handleNumber(num) {
            if (currentInput === "0.0" || currentInput === "0" || shouldResetDisplay) {
                currentInput = num;
                shouldResetDisplay = false;
            } else {
                currentInput += num;
            }
            updateDisplay();
        }

        function handleDot() {
            if (shouldResetDisplay) {
                currentInput = "0.";
                shouldResetDisplay = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay();
        }

        function handleOperator(op) {
            if (operator !== null && !shouldResetDisplay) {
                calculate();
            }
            previousInput = currentInput;
            operator = op;
            shouldResetDisplay = true;

            const opSymbol = op === '*' ? 'X' : op;
            historyDisplay.innerText = \`\${previousInput} \${opSymbol}\`;
        }

        function calculate() {
            let result = 0;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            if (isNaN(prev) || isNaN(current)) return;

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert("0으로 나눌 수 없습니다.");
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            currentInput = String(Math.round(result * 1e8) / 1e8);
            operator = null;
            updateDisplay();
        }

        function handleEqual() {
            if (operator === null) return;
            const opSymbol = operator === '*' ? 'X' : operator;
            historyDisplay.innerText = \`\${previousInput} \${opSymbol} \${currentInput} =\`;
            calculate();
            shouldResetDisplay = true;
        }

        function handleC() {
            currentInput = "0.0";
            previousInput = "";
            operator = null;
            shouldResetDisplay = false;
            historyDisplay.innerText = "0";
            updateDisplay();
        }

        function handleCE() {
            currentInput = "0.0";
            updateDisplay();
        }

        function handleDel() {
            if (shouldResetDisplay) return;
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = "0.0";
            }
            updateDisplay();
        }

        function handlePercent() {
            const val = parseFloat(currentInput);
            if (!isNaN(val)) {
                currentInput = String(val / 100);
                updateDisplay();
            }
        }

        function handleReciprocal() {
            const val = parseFloat(currentInput);
            if (!isNaN(val) && val !== 0) {
                currentInput = String(1 / val);
                updateDisplay();
            }
        }

        function handleSquare() {
            const val = parseFloat(currentInput);
            if (!isNaN(val)) {
                currentInput = String(val * val);
                updateDisplay();
            }
        }

        function handleSqrt() {
            const val = parseFloat(currentInput);
            if (!isNaN(val) && val >= 0) {
                currentInput = String(Math.sqrt(val));
                updateDisplay();
            }
        }

        function handleToggleSign() {
            const val = parseFloat(currentInput);
            if (!isNaN(val) && val !== 0) {
                currentInput = String(val * -1);
                updateDisplay();
            }
        }

        // 키보드 입력을 위한 이벤트 리스너 추가
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
            else if (e.key === '.') handleDot();
            else if (e.key === '+') handleOperator('+');
            else if (e.key === '-') handleOperator('-');
            else if (e.key === '*') handleOperator('*');
            else if (e.key === '/') handleOperator('/');
            else if (e.key === 'Enter' || e.key === '=') handleEqual();
            else if (e.key === 'Backspace') handleDel();
            else if (e.key === 'Escape') handleC();
        });
    </script>
</body>
</html>`;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
});

// 서버 실행
server.listen(PORT, () => {
    console.log("==================================================");
    console.log(`[Android Style Calculator Server Started]`);
    console.log(`Node.js 서버가 성공적으로 실행되었습니다!`);
    console.log(`브라우저에서 접속 주소: http://localhost:${PORT}`);
    console.log("==================================================");
});
