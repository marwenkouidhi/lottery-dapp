// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

/* Errors */
error Lottery__NotEnoughETHEntred();
error Lottery__TransferFailed();

/* Contract */
contract Lottery is VRFConsumerBaseV2 {
    /* Events */
    event LotteryEnter(address indexed lotteryPlayer);
    event RquestedWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed lotteryWinner);

    /* State variables */
    address payable[] private s_players;
    address private s_recentWinner;
    uint256 private immutable i_entranceFee;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_keyHash;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;

    /* Methods */
    constructor(
        uint256 entranceFee,
        address vrfCoordinator,
        bytes32 keyHash,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinator) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        i_keyHash = keyHash;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    function enterLottery() public payable {
        if (msg.value < i_entranceFee) {
            revert Lottery__NotEnoughETHEntred();
        }
        s_players.push(payable(msg.sender));
        emit LotteryEnter(msg.sender);
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external {
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_keyHash,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit RquestedWinner(requestId);
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        uint256 lotteryWinnerIndex = randomWords[0] % s_players.length;
        address payable lotteryWinner = s_players[lotteryWinnerIndex];
        s_recentWinner = lotteryWinner;
        (bool success, ) = lotteryWinner.call{value: address(this).balance}("");
        if (!success) {
            revert Lottery__TransferFailed();
        }
        emit WinnerPicked(lotteryWinner);
    }

    /* View methodes */
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }
}
