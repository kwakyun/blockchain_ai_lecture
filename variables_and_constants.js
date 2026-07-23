/**
 * Node.js - 변수(Variables)와 상수(Constants) 예제 코드
 * 
 * 자바스크립트/Node.js에는 변수와 상수를 선언하는 3가지 키워드가 있습니다:
 * 1. let   : 값 재할당이 가능한 '변수' (권장)
 * 2. const : 값 재할당이 불가능한 '상수' (권장)
 * 3. var   : 과거에 사용되던 변수 (재선언 및 호이스팅 문제로 현재는 사용 지양)
 */

console.log("==========================================");
console.log(" 1. let 키워드 예제 (변수 - 값 변경 가능)");
console.log("==========================================");

// 1. let 선언: 초깃값 설정 후 언제든 값을 다시 할당할 수 있습니다.
let score = 100;
console.log("최초 점수 (score):", score);

// 값 변경 (재할당)
score = 150;
console.log("수정된 점수 (score):", score);

score = score + 50;
console.log("최종 점수 (score):", score);


console.log("\n==========================================");
console.log(" 2. const 키워드 예제 (상수 - 값 변경 불가)");
console.log("==========================================");

// 2. const 선언: 한 번 할당된 값을 다시 바꿀 수 없는 읽기 전용 상수입니다.
const PI = 3.141592;
const MAX_USERS = 100;

console.log("원주율 (PI):", PI);
console.log("최대 사용자 수 (MAX_USERS):", MAX_USERS);

// [오류 테스트] const로 선언된 상수의 값을 변경하려고 하면 TypeError가 발생합니다.
// PI = 3.14; // Uncaught TypeError: Assignment to constant variable.


console.log("\n==========================================");
console.log(" 3. const와 객체/배열 (참조형 데이터)");
console.log("==========================================");

// const로 선언한 객체(Object)나 배열(Array)은 식별자(변수) 자체의 재할당은 금지되지만,
// 내부 속성(Property)이나 요소(Element)는 변경할 수 있습니다.
const user = {
    name: "홍길동",
    age: 25
};

console.log("변경 전 user:", user);

// 객체 내부 속성 변경 가능
user.age = 26;
user.job = "개발자";
console.log("변경 후 user:", user);

// 하지만 user 객체 자체를 다른 객체로 재할당하는 것은 불가능합니다.
// user = { name: "이순신" }; // TypeError 발생


console.log("\n==========================================");
console.log(" 4. var 키워드 예제 (과거 방식 - 사용 지양)");
console.log("==========================================");

// var는 동일한 이름으로 재선언이 가능하며, 스코프(범위) 관리가 미흡하여 예기치 못한 버그를 유발합니다.
var legacyVar = "첫 번째 선언";
var legacyVar = "두 번째 재선언"; // 동일 이름 재선언 허용 (위험)
console.log("var 변수 값:", legacyVar);


console.log("\n==========================================");
console.log(" 5. 요약 비교");
console.log("==========================================");
console.log("| 키워드 | 구분 | 재할당 | 재선언 | 스코프 |");
console.log("|--------|------|--------|--------|--------|");
console.log("|  let   | 변수 |   O    |   X    |  블록  |");
console.log("| const  | 상수 |   X    |   X    |  블록  |");
console.log("|  var   | 변수 |   O    |   O    |  함수  |");
