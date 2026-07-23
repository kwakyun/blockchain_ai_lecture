/**
 * Node.js - 객체(Object) 이해를 위한 예제 코드
 * 
 * 객체(Object)는 관련 데이터(속성, Property)와 기능(메서드, Method)을
 * 키-값(Key-Value) 쌍으로 묶어서 관리하는 자바스크립트의 핵심 데이터 구조입니다.
 */

console.log("==========================================");
console.log(" 1. 객체 생성 (Object Literal)");
console.log("==========================================");

// 객체 리터럴 방식으로 사용자 정보 객체 생성
const student = {
    name: "이순신",
    age: 20,
    major: "컴퓨터공학",
    isEnrolled: true
};

console.log("생성된 student 객체:", student);


console.log("\n==========================================");
console.log(" 2. 객체 속성 접근 / 수정 / 추가 / 삭제");
console.log("==========================================");

// 1) 마침표(Dot) 표기법으로 접근
console.log("이름 (Dot 표기법):", student.name);

// 2) 대괄호(Bracket) 표기법으로 접근 (동적 키 접근 시 유용)
console.log("전공 (Bracket 표기법):", student["major"]);

// 3) 속성 수정
student.age = 21;
console.log("수정된 나이:", student.age);

// 4) 새로운 속성 추가
student.email = "lee@example.com";
console.log("이메일 추가 후:", student);

// 5) 속성 삭제
delete student.isEnrolled;
console.log("isEnrolled 삭제 후:", student);


console.log("\n==========================================");
console.log(" 3. 객체 메서드 (Method)와 this 키워드");
console.log("==========================================");

// 객체 내부에는 함수(메서드)도 들어갈 수 있으며, `this`로 자신의 속성에 접근합니다.
const calculator = {
    owner: "홍길동의 계산기",
    add: function (a, b) {
        return a + b;
    },
    // 축약형 메서드 정의 방식
    introduce() {
        console.log(`안녕하세요! 이것은 [${this.owner}] 입니다.`);
    }
};

calculator.introduce();
console.log("15 + 25 =", calculator.add(15, 25));


console.log("\n==========================================");
console.log(" 4. 객체 구조 분해 할당 (Destructuring)");
console.log("==========================================");

const car = {
    brand: "현대",
    model: "아이오닉 5",
    year: 2024
};

// 객체의 키 이름을 기반으로 변수에 개별 추출하여 할당합니다.
const { brand, model, year } = car;
console.log(`차량 정보: ${year}년식 ${brand} ${model}`);


console.log("\n==========================================");
console.log(" 5. Object 내장 메서드 (Keys, Values, Entries)");
console.log("==========================================");

const product = {
    id: "P101",
    title: "스마트폰",
    price: 1000000
};

// 키 목록 배열 반환
console.log("Object.keys():", Object.keys(product));

// 값 목록 배열 반환
console.log("Object.values():", Object.values(product));

// [키, 값] 쌍 배열 반환
console.log("Object.entries():", Object.entries(product));


console.log("\n==========================================");
console.log(" 6. 클래스(Class)를 이용한 객체 생성 (ES6+)");
console.log("==========================================");

// 동일한 구조의 객체를 여러 개 찍어내기 위한 템플릿(틀)입니다.
class User {
    constructor(username, role) {
        this.username = username;
        this.role = role;
    }

    getProfile() {
        return `[사용자] ${this.username} (권한: ${this.role})`;
    }
}

const user1 = new User("admin", "관리자");
const user2 = new User("guest", "일반회원");

console.log(user1.getProfile());
console.log(user2.getProfile());

