// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CrudContract
 * @dev Solidity를 사용한 데이터의 추가(Create), 조회(Read), 수정(Update), 삭제(Delete) 기능을 구현한 스마트 컨트랙트 예제입니다.
 */
contract CrudContract {
    // 저장할 데이터 구조체 정의
    struct User {
        uint256 id;
        string name;
        string email;
    }

    // ID를 Key로 하여 User 데이터를 저장하는 매핑
    mapping(uint256 => User) private users;

    // 특정 ID의 데이터 존재 여부를 빠르게 확인하기 위한 매핑
    mapping(uint256 => bool) private userExists;

    // 등록된 모든 ID 목록을 저장하는 배열 (조회 편의성 제공)
    uint256[] private userIds;

    // 데이터 변경 사항을 블록체인에 기록하기 위한 이벤트
    event UserCreated(uint256 indexed id, string name, string email);
    event UserUpdated(uint256 indexed id, string name, string email);
    event UserDeleted(uint256 indexed id);

    /**
     * @notice 1. 데이터 추가 (Create)
     * @param _id 등록할 사용자의 고유 ID
     * @param _name 등록할 사용자의 이름
     * @param _email 등록할 사용자의 이메일
     */
    function createUser(
        uint256 _id,
        string memory _name,
        string memory _email
    ) public {
        // 이미 해당 ID가 존재하는지 검증
        require(!userExists[_id], "Error: User with this ID already exists.");
        // 이름과 이메일의 유효성 검증 (빈 문자열 차단)
        require(bytes(_name).length > 0, "Error: Name cannot be empty.");
        require(bytes(_email).length > 0, "Error: Email cannot be empty.");

        // 데이터 저장
        users[_id] = User(_id, _name, _email);
        userExists[_id] = true;
        userIds.push(_id);

        // 이벤트 발행
        emit UserCreated(_id, _name, _email);
    }

    /**
     * @notice 2. 데이터 단건 조회 (Read)
     * @param _id 조회할 사용자의 고유 ID
     * @return id 사용자 ID
     * @return name 사용자 이름
     * @return email 사용자 이메일
     */
    function readUser(
        uint256 _id
    )
        public
        view
        returns (uint256 id, string memory name, string memory email)
    {
        // 해당 데이터가 존재하는지 검증
        require(userExists[_id], "Error: User does not exist.");

        User memory user = users[_id];
        return (user.id, user.name, user.email);
    }

    /**
     * @notice 3. 데이터 수정 (Update)
     * @param _id 수정할 사용자의 고유 ID
     * @param _name 새로 변경할 사용자의 이름
     * @param _email 새로 변경할 사용자의 이메일
     */
    function updateUser(
        uint256 _id,
        string memory _name,
        string memory _email
    ) public {
        // 해당 데이터가 존재하는지 검증
        require(userExists[_id], "Error: User does not exist.");
        // 이름과 이메일의 유효성 검증
        require(bytes(_name).length > 0, "Error: Name cannot be empty.");
        require(bytes(_email).length > 0, "Error: Email cannot be empty.");

        // 데이터 업데이트
        users[_id].name = _name;
        users[_id].email = _email;

        // 이벤트 발행
        emit UserUpdated(_id, _name, _email);
    }

    /**
     * @notice 4. 데이터 삭제 (Delete)
     * @param _id 삭제할 사용자의 고유 ID
     */
    function deleteUser(uint256 _id) public {
        // 해당 데이터가 존재하는지 검증
        require(userExists[_id], "Error: User does not exist.");

        // 매핑에서 데이터 삭제 및 존재 여부 플래그 해제
        delete users[_id];
        userExists[_id] = false;

        // userIds 배열에서 해당 ID 제거
        for (uint256 i = 0; i < userIds.length; i++) {
            if (userIds[i] == _id) {
                // 배열의 마지막 원소를 삭제하려는 위치로 이동시키고, 마지막 원소를 pop하여 효율적으로 제거 (순서는 보장되지 않음)
                userIds[i] = userIds[userIds.length - 1];
                userIds.pop();
                break;
            }
        }

        // 이벤트 발행
        emit UserDeleted(_id);
    }

    /**
     * @notice 등록된 모든 사용자 ID 목록 조회
     * @return uint256[] 전체 사용자 ID 리스트
     */
    function getAllUserIds() public view returns (uint256[] memory) {
        return userIds;
    }

    /**
     * @notice 특정 ID의 존재 여부 확인
     * @param _id 확인할 사용자의 고유 ID
     * @return bool 존재 여부
     */
    function isUserExists(uint256 _id) public view returns (bool) {
        return userExists[_id];
    }
}
