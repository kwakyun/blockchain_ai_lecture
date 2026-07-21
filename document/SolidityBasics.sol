// SPDX-License-Identifier: MIT
// 컴파일러에게 소스 코드의 라이선스를 명시합니다. MIT 라이선스는 오픈소스 사용 및 재배포를 허용합니다.

pragma solidity ^0.8.20;
// 솔리디티 컴파일러 버전을 지정합니다. ^0.8.20은 0.8.20 이상 0.9.0 미만 버전으로 컴파일 가능함을 의미합니다.

/**
 * @title SolidityBasics
 * @dev 솔리디티(Solidity) 스마트 컨트랙트 기초 문법을 종합적으로 다루는 교육용 예제입니다.
 * 주요 개념: 상태 변수, 매핑, 구조체, 이벤트, 제어자(Modifier), 생성자, 상태 변경 함수, View/Pure 함수, Payable 함수
 */
contract SolidityBasics {
    // ==========================================
    // 1. 상태 변수 (State Variables)
    // - 스마트 컨트랙트 내부에 선언되며, 이더리움 블록체인의 스토리지(Storage) 영역에 영구적으로 저장됩니다.
    // - public 접근 제어자를 사용하면 컴파일러가 자동으로 동명의 읽기 전용 Getter 함수를 생성해 줍니다.
    // ==========================================

    /// @dev 스마트 컨트랙트 배포자(소유자)의 이더리움 주소 (20바이트)
    address public owner;

    /// @dev 문자열 데이터 (동적 크기 데이터/스토리지 저장)
    string public storedText;

    /// @dev 256비트 부호 없는 양의 정수 (0 ~ 2^256 - 1). 기본 초기값은 0입니다.
    uint256 public counter;

    /// @dev 불리언 값 (true 또는 false). 기본 초기값은 false입니다.
    bool public isActive;

    // ------------------------------------------
    // 매핑 (Mapping)
    // - Key-Value 형태의 해시 테이블 데이터 구조입니다.
    // - 모든 가능 키(Key)에 대해 기본값(0, false, address(0) 등)이 매핑되어 존재합니다.
    // - 주소(address)를 키로, 잔액/포인트(uint256)를 값으로 저장합니다.
    // ------------------------------------------
    mapping(address => uint256) public userBalances;

    // ------------------------------------------
    // 구조체 (Struct)
    // - 서로 다른 타입의 변수들을 하나로 묶어 사용자 정의 커스텀 데이터 타입을 정의합니다.
    // ------------------------------------------
    struct UserProfile {
        string name; // 사용자 이름
        uint256 age; // 사용자 나이
    }

    // 주소(address)별 사용자 프로필(UserProfile) 데이터를 관리하는 매핑
    mapping(address => UserProfile) public profiles;

    // ==========================================
    // 2. 이벤트 (Events)
    // - 트랜잭션이 성공적으로 수행되었을 때 블록체인의 트랜잭션 영수증(Logs)에 기록되는 데이터입니다.
    // - 외부 클라이언트(Web3.js, Ethers.js, DApp 프론트엔드 등)가 컨트랙트의 상태 변화를 감지/구독(Listen)할 수 있게 합니다.
    // - indexed 키워드: 매개변수에 최대 3개까지 지정 가능하며, 외부에서 이벤트를 검색 및 필터링할 때 인덱스로 활용됩니다.
    // ==========================================

    /// @notice 텍스트가 업데이트되었음을 알리는 이벤트
    /// @param sender 텍스트를 변경한 계정 주소 (검색 가능하도록 indexed 설정)
    /// @param newText 새로 변경된 문자열 데이터
    event TextUpdated(address indexed sender, string newText);

    /// @notice 카운터 값이 증가했음을 알리는 이벤트
    /// @param newValue 증가된 후의 카운터 값
    event CounterIncremented(uint256 newValue);

    /// @notice 이더(ETH) 입금이 완료되었음을 알리는 이벤트
    /// @param sender 입금한 계정 주소
    /// @param amount 입금된 이더 금액 (wei 단위)
    event Deposit(address indexed sender, uint256 amount);

    // ==========================================
    // 3. 제어자 (Modifiers)
    // - 함수 실행 전/후에 조건 검증 및 공통 사전 처리 로직을 수행하기 위해 사용되는 재사용 가능한 코드 블록입니다.
    // - require 문을 만족하지 못하면 트랜잭션이 즉시 revert(취소)되며 변경된 상태가 원복되고 남은 가스는 환불됩니다.
    // ==========================================

    /// @dev 함수 호출자가 소유자(owner)인지 검증하는 제어자
    modifier onlyOwner() {
        // msg.sender: 현재 이 함수/트랜잭션을 호출한 계정 주소
        require(msg.sender == owner, "Only owner can call this function");
        _; // 머지 포인트(_): 이 위치에 제어자가 적용된 본래 함수의 본문 코드가 합쳐져 실행됩니다.
    }

    // ==========================================
    // 4. 생성자 (Constructor)
    // - 스마트 컨트랙트가 블록체인 네트워크상에 배포될 때 단 1회만 실행되는 초기화 전용 함수입니다.
    // - 배포 완료 후에는 다시 호출할 수 없습니다.
    // ==========================================

    /// @notice 스마트 컨트랙트 배포 시 초기 상태를 설정합니다.
    /// @param initialText 배포 시 저장할 초기 문자열 (memory 키워드 사용)
    constructor(string memory initialText) {
        owner = msg.sender; // 컨트랙트를 배포한 계정 주소를 owner 상태 변수에 저장
        storedText = initialText; // 인자로 전달받은 초기 텍스트 설정
        isActive = true; // 컨트랙트 활성화 상태 설정
    }

    // ==========================================
    // 5. 상태 변경 함수 (State Changing Functions)
    // - 상태 변수의 값을 수정하므로 블록체인의 상태(State)를 직접 변경합니다.
    // - 블록체인에 트랜잭션을 발생시키며, 연산 및 저장에 따른 가스(Gas, 수수료) 비용이 소모됩니다.
    // ==========================================

    /// @notice storedText 변수의 값을 변경하고 이벤트를 발생시킵니다.
    /// @param _newText 새로 저장할 문자열 (memory: 함수 실행 중에만 메모리에 임시 유지되는 변수)
    function setStoredText(string memory _newText) public {
        storedText = _newText; // 스토리지에 저장된 상태 변수 값 업데이트
        emit TextUpdated(msg.sender, _newText); // 로그 생성을 위한 이벤트 발행
    }

    /// @notice counter 값을 1 증가시키고 이벤트를 발생시킵니다.
    function incrementCounter() public {
        counter += 1; // 카운터 값 1 증가 (Solidity 0.8.0 이상에서는 오버플로우 자동 검사 수행)
        emit CounterIncremented(counter); // 이벤트 발행
    }

    /// @notice 소유자(owner)만 실행할 수 있는 카운터 초기화 함수
    /// @dev onlyOwner 제어자가 적용되어 owner가 아닌 다른 계정이 호출할 경우 트랜잭션이 즉시 revert 됩니다.
    function resetCounter() public onlyOwner {
        counter = 0;
    }

    /// @notice 이더(ETH)를 컨트랙트로 입금받는 함수
    /// @dev payable 키워드: 함수 호출 시 트랜잭션을 통해 실제 이더(ETH)를 송금받을 수 있게 지정합니다.
    /// msg.value: 트랜잭션에 동반되어 송금된 이더 금액 (기본 최소 단위: wei, 1 ETH = 10^18 wei)
    function depositETH() public payable {
        require(msg.value > 0, "Must send some ETH"); // 0 Wei 초과 입금 필수 조건 검증
        userBalances[msg.sender] += msg.value; // 입금자의 주소별 매핑 잔액 추가
        emit Deposit(msg.sender, msg.value); // 입금 내역 이벤트 발행
    }

    /// @notice 사용자 프로필 정보를 설정 및 등록하는 함수
    /// @param _name 사용자 이름 (문자열)
    /// @param _age 사용자 나이 (양의 정수)
    function setProfile(string memory _name, uint256 _age) public {
        // 매핑에 구조체(UserProfile) 인스턴스를 직관적으로 생성하여 저장
        profiles[msg.sender] = UserProfile(_name, _age);
    }

    // ==========================================
    // 6. 조회 전용 함수 (View & Pure Functions)
    // - 블록체인의 상태 변수 값을 변경하지 않는 읽기 전용 함수입니다.
    // - 외부(클라이언트, 웹 UI 등)에서 독립적으로 호출할 경우 가스(Gas) 수수료가 발생하지 않습니다.
    // - 단, 상태를 변경하는 다른 함수 내부에서 호출될 때에는 전체 트랜잭션 가스비에 연산 비용이 포함됩니다.
    // ==========================================

    /// @notice view 함수: 블록체인의 상태(상태 변수)를 읽기만 하고 변경하지 않는 함수입니다.
    /// @return (storedText, counter, owner) 컨트랙트의 주요 상태 변수를 튜플(Tuple) 형태로 반환
    function getContractSummary()
        public
        view
        returns (string memory, uint256, address)
    {
        return (storedText, counter, owner);
    }

    /// @notice pure 함수: 블록체인 상태 변수를 읽지도 쓰지도 않고, 전달받은 매개변수만으로 순수 계산을 수행하는 함수입니다.
    /// @param a 첫 번째 정수
    /// @param b 두 번째 정수
    /// @return 입력받은 두 정수의 합 (a + b)
    function addNumbers(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}

