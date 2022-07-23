// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol';
import '@chainlink/contracts/src/v0.8/KeeperCompatible.sol';

/* Errors */
error Lottery__NotEnoughETHEntered();
error Lottery__TransferFailed();
error Lottery__CLOSED();
error Lottery__UpkeepNotNeeded(uint256 currentBalance, uint256 numPlayers, uint256 lotteryState);

/* @title Lottery Contract
 * @author Marwen Kouidhi
 * @dev This contract implemnts Chainlink VRFv2 and Chainlink Keepers
 */
contract Lottery is VRFConsumerBaseV2, KeeperCompatible {
    /* Events */
    event LotteryEnter(address indexed lotteryPlayer);
    event RequestedWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed lotteryWinner);

    /* Custom types */
    enum LotteryState {
        OPEN, // uint256 0 = OPEN
        CLOSED // uint256 1 = CLOSED
    }

    /* State variables */
    /* Storage variables */
    address payable[] private s_players;
    address private s_recentWinner;
    LotteryState private s_lotteryState;
    uint256 private s_lastTimestamp;

    /* Immutables */
    uint256 private immutable i_entranceFee;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_keyHash;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint256 private immutable i_interval;

    /* Constants */
    uint32 private constant NUM_WORDS = 1;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;

    /* Methods */
    constructor(
        address vrfCoordinator,
        uint64 subscriptionId,
        bytes32 keyHash,
        uint256 entranceFee,
        uint32 callbackGasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(vrfCoordinator) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        i_subscriptionId = subscriptionId;
        i_keyHash = keyHash;
        i_entranceFee = entranceFee;
        s_lotteryState = LotteryState.OPEN;
        i_callbackGasLimit = callbackGasLimit;
        i_interval = interval;
        s_lastTimestamp = block.timestamp;
    }

    function enterLottery() public payable {
        if (msg.value < i_entranceFee) {
            revert Lottery__NotEnoughETHEntered();
        }
        if (s_lotteryState != LotteryState.OPEN) {
            revert Lottery__CLOSED();
        }
        s_players.push(payable(msg.sender));
        emit LotteryEnter(msg.sender);
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        uint256 lotteryWinnerIndex = randomWords[0] % s_players.length;
        address payable lotteryWinner = s_players[lotteryWinnerIndex];
        s_recentWinner = lotteryWinner;
        s_lotteryState = LotteryState.OPEN;
        s_players = new address payable[](0);
        s_lastTimestamp = block.timestamp;
        (bool success, ) = lotteryWinner.call{value: address(this).balance}('');
        if (!success) {
            revert Lottery__TransferFailed();
        }
        emit WinnerPicked(lotteryWinner);
    }

    /**
     * This function contains the logic that runs off-chain during every block
     * to determine if performUpkeep should be executed on-chain.
     *
     * We don't use the checkData in this example. The checkData is Fixed and
     * specified at Upkeep registration and used in every checkUpkeep. Can be empty "0x".
     *
     * Conditions to be verified in order to return true:
     * 1. Time interval should have passed
     * 2. Subscription should be funded with enough LINK
     * 3. The lottery state should be "open"
     */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        bool isOpen = (s_lotteryState == LotteryState.OPEN);
        bool timePassed = ((block.timestamp - s_lastTimestamp) > i_interval);
        bool hasPlayers = (s_players.length > 0);
        bool hasBalance = (address(this).balance > 0);
        upkeepNeeded = (isOpen && timePassed && hasPlayers && hasBalance);
    }

    // Assumes the subscription is funded sufficiently.
    // Will revert if subscription is not set and funded.
    // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep('');
        if (!upkeepNeeded) {
            revert Lottery__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_lotteryState)
            );
        }
        s_lotteryState = LotteryState.CLOSED;
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_keyHash,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit RequestedWinner(requestId);
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

    function getLotteryState() public view returns (LotteryState) {
        return s_lotteryState;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getLatestTimestamp() public view returns (uint256) {
        return s_lastTimestamp;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    /* Pure methodes */
    function getNumWords() public pure returns (uint256) {
        return NUM_WORDS;
    }

    function getRequestConfirmations() public pure returns (uint256) {
        return REQUEST_CONFIRMATIONS;
    }
}
