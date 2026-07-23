// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CompareNumbers
 * @dev 두 개의 숫자를 입력받아 크기를 비교하고 큰 숫자를 반환/저장하는 스마트 컨트랙트 예제입니다.
 */
contract CompareNumbers {

    // ==========================================
    // 1. 상태 변수 (State Variables)
    // ==========================================
    
    /// @notice 마지막으로 비교한 첫 번째 숫자
    uint256 public lastNumberA;

    /// @notice 마지막으로 비교한 두 번째 숫자
    uint256 public lastNumberB;

    /// @notice 마지막으로 비교했을 때 더 컸던 숫자 (동일한 경우 해당 값)
    uint256 public lastMaxNumber;

    // ==========================================
    // 2. 이벤트 정의 (Event)
    // ==========================================

    /// @notice 숫자가 비교되고 결과가 저장되었을 때 발행되는 이벤트
    /// @param caller 함수를 호출한 주소
    /// @param numberA 입력받은 첫 번째 숫자
    /// @param numberB 입력받은 두 번째 숫자
    /// @param maxNumber 비교 결과 큰 숫자
    event NumbersCompared(
        address indexed caller,
        uint256 numberA,
        uint256 numberB,
        uint256 maxNumber
    );

    // ==========================================
    // 3. pure 함수 (순수 계산 및 큰 숫자 반환)
    // - 블록체인의 상태(State)를 읽거나 쓰지 않고, 입력받은 인자만으로 순수 계산을 수행합니다.
    // - 외부에서 독립 호출 시 가스(Gas) 수수료가 발생하지 않습니다.
    // ==========================================

    /**
     * @notice 입력받은 두 숫자(a, b) 중 더 큰 숫자를 반환합니다.
     * @param a 첫 번째 숫자
     * @param b 두 번째 숫자
     * @return uint256 더 큰 숫자 (두 수가 같으면 해당 숫자 반환)
     */
    function getMax(uint256 a, uint256 b) public pure returns (uint256) {
        // 조건문(if-else)을 이용한 크기 비교
        if (a >= b) {
            return a;
        } else {
            return b;
        }
    }

    /**
     * @notice 삼항 연산자를 이용하여 더 큰 숫자를 반환하는 함수 예제
     * @param a 첫 번째 숫자
     * @param b 두 번째 숫자
     * @return uint256 더 큰 숫자
     */
    function getMaxTernary(uint256 a, uint256 b) public pure returns (uint256) {
        // 삼항 연산자 (조건 ? 참일때 : 거짓일때)
        return a >= b ? a : b;
    }

    /**
     * @notice 입력받은 두 숫자(a, b) 중 더 작은 숫자를 반환합니다. (참고용 추가 기능)
     * @param a 첫 번째 숫자
     * @param b 두 번째 숫자
     * @return uint256 더 작은 숫자
     */
    function getMin(uint256 a, uint256 b) public pure returns (uint256) {
        return a <= b ? a : b;
    }

    // ==========================================
    // 4. 상태 변경 함수 (비교 수행 및 블록체인에 결과 저장)
    // - 비교 결과를 상태 변수에 기록하고 이벤트를 블록체인 트랜잭션 로그에 발행합니다.
    // ==========================================

    /**
     * @notice 두 숫자를 비교하여 큰 숫자를 상태 변수에 저장하고 이벤트를 알린 뒤 결과를 반환합니다.
     * @param a 첫 번째 숫자
     * @param b 두 번째 숫자
     * @return maxNum 비교 결과 더 큰 숫자
     */
    function compareAndStore(uint256 a, uint256 b) public returns (uint256 maxNum) {
        // 1. 크기 비교 수행
        maxNum = getMax(a, b);

        // 2. 블록체인 상태 변수에 업데이트
        lastNumberA = a;
        lastNumberB = b;
        lastMaxNumber = maxNum;

        // 3. 이벤트 발행 (클라이언트 감지용)
        emit NumbersCompared(msg.sender, a, b, maxNum);

        return maxNum;
    }
}
