/**
 * Node.js - 함수(Function) 이해를 위한 예제 코드
 * 
 * 함수(Function)는 특정 작업(로직)을 수행하도록 묶어놓은 코드 블록입니다.
 * 재사용성이 높아지며, 입력값(매개변수)을 받아 처리 후 결과값(반환값)을 돌려줍니다.
 */

console.log("==========================================");
console.log(" 1. 기본 함수 선언문 (Function Declaration)");
console.log("==========================================");

// 가장 전통적이고 표준적인 함수 정의 방식입니다.
function sayHello(name) {
    return `안녕하세요, ${name}님! Node.js의 세계에 오신 것을 환영합니다.`;
}

// 함수 호출 (Arguments 전달)
const greetingMsg = sayHello("홍길동");
console.log(greetingMsg);


console.log("\n==========================================");
console.log(" 2. 매개변수와 반환값이 있는 함수 (Addition)");
console.log("==========================================");

// 두 숫자를 매개변수(a, b)로 받아서 합을 return(반환)하는 함수
function addNumbers(a, b) {
    const result = a + b;
    return result;
}

const sum = addNumbers(10, 20);
console.log("10 + 20 =", sum);


console.log("\n==========================================");
console.log(" 3. 함수 표현식 (Function Expression)");
console.log("==========================================");

// 변수에 함수를 값처럼 할당하는 방식입니다.
const multiply = function(a, b) {
    return a * b;
};

console.log("5 * 4 =", multiply(5, 4));


console.log("\n==========================================");
console.log(" 4. 화살표 함수 (Arrow Function - ES6+)");
console.log("==========================================");

// 'function' 키워드 대신 '=>' (화살표)를 사용하여 훨씬 간결하게 작성합니다.
const subtract = (a, b) => {
    return a - b;
};

// 본문이 단일 식인 경우 return 및 중괄호 생략 가능
const divide = (a, b) => a / b;

console.log("50 - 15 =", subtract(50, 15));
console.log("100 / 4 =", divide(100, 4));


console.log("\n==========================================");
console.log(" 5. 기본 매개변수 (Default Parameters)");
console.log("==========================================");

// 인자 값이 전달되지 않았을 때 기본값을 자동으로 사용합니다.
function welcomeUser(user = "방문자") {
    console.log(`[로그인 메시지] ${user}님이 접속하셨습니다.`);
}

welcomeUser("김철수"); // 인자 전달
welcomeUser();         // 인자 미전달 (기본값 사용)


console.log("\n==========================================");
console.log(" 6. 콜백 함수 (Callback Function)");
console.log("==========================================");

// 함수를 다른 함수의 매개변수(인자)로 전달하여 나중에 실행하는 패턴입니다.
// Node.js의 비동기 처리나 이벤트에서 매우 중요하게 사용됩니다.

function calculateAndPrint(a, b, operationCallback) {
    const result = operationCallback(a, b); // 전달받은 함수 실행
    console.log(`연산 결과: ${result}`);
}

// 덧셈 연산을 수행하는 함수를 인자로 전달
calculateAndPrint(7, 3, (x, y) => x + y);

// 곱셈 연산을 수행하는 함수를 인자로 전달
calculateAndPrint(7, 3, (x, y) => x * y);
