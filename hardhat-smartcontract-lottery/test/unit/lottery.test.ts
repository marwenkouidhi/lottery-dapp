import { assert, expect } from 'chai';
import { Contract } from 'ethers';
import { deployments, ethers, getNamedAccounts, network } from 'hardhat';
import { developmentChains, networkConfig } from '../../helper-hardhat-config';

developmentChains.includes(network.name) &&
  describe('Lottery Unit Tests', () => {
    let lotteryContract: Contract,
      vrfCoordinatorV2MockContract: Contract,
      entranceFee: any,
      accounts: any,
      deployer: string,
      interval: number;
    const chainId = network.config.chainId;

    beforeEach(async () => {
      accounts = await getNamedAccounts();
      deployer = accounts.deployer;
      await deployments.fixture(['lottery', 'mocks']);
      lotteryContract = await ethers.getContract('Lottery', deployer);
      vrfCoordinatorV2MockContract = await ethers.getContract('VRFCoordinatorV2Mock', deployer);
      entranceFee = await lotteryContract.getEntranceFee();
      interval = (await lotteryContract.getInterval()).toNumber();
    });

    describe('Constructor', () => {
      it('Lottery initialized correctly', async () => {
        const lotteryStateActualValue = (await lotteryContract.getLotteryState()).toString();
        const lotteryStateExpectedValue = '0';
        assert.equal(lotteryStateActualValue, lotteryStateExpectedValue);

        const lotteryIntervalActualValue = (await lotteryContract.getInterval()).toString();
        const lotteryIntervalExpectedValue = networkConfig[chainId!]['keepersUpdateInterval'];
        assert.equal(lotteryIntervalActualValue, lotteryIntervalExpectedValue);
      });
    });

    describe('entreLottery', () => {
      it('should revert when balance < entranceFee', async () => {
        await expect(lotteryContract.enterLottery()).to.be.revertedWithCustomError(
          lotteryContract,
          'Lottery__NotEnoughETHEntered'
        );
      });

      it('should store players', async () => {
        await lotteryContract.enterLottery({
          value: entranceFee,
        });

        const actual = await lotteryContract.getPlayer(0);
        assert.equal(actual, deployer);
      });

      it('should emit event on entrance of a player', async () => {
        await expect(
          lotteryContract.enterLottery({
            value: entranceFee,
          })
        )
          .to.emit(lotteryContract, 'LotteryEnter')
          .withArgs(deployer);
      });

      it("should't allow entrance when lottery is closed", async () => {
        await lotteryContract.enterLottery({ value: entranceFee });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        await lotteryContract.performUpkeep([]);
        await expect(
          lotteryContract.enterLottery({ value: entranceFee })
        ).to.revertedWithCustomError(lotteryContract, 'Lottery__CLOSED');
      });
    });

    describe('checkUpkeep', () => {
      it('returns false if s_player.length == 0', async () => {
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        const { upkeepNeeded } = await lotteryContract.callStatic.checkUpkeep('0x');
        assert.equal(upkeepNeeded, false);
      });
      it("returns false if raffle isn't open", async () => {
        await lotteryContract.enterLottery({ value: entranceFee });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        await lotteryContract.performUpkeep([]);
        const lotteryState = await lotteryContract.getLotteryState();
        const { upkeepNeeded } = await lotteryContract.callStatic.checkUpkeep('0x');
        assert.equal(lotteryState.toString() == '1', upkeepNeeded == false);
      });
      it("returns false if enough time hasn't passed", async () => {
        await lotteryContract.enterLottery({ value: entranceFee });
        await network.provider.send('evm_increaseTime', [interval - 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        const { upkeepNeeded } = await lotteryContract.callStatic.checkUpkeep('0x');
        assert(!upkeepNeeded);
      });
      it('returns true if enough time has passed, has players, eth, and is open', async () => {
        await lotteryContract.enterLottery({ value: entranceFee });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        const { upkeepNeeded } = await lotteryContract.callStatic.checkUpkeep('0x');
        assert(upkeepNeeded);
      });
    });
    describe('performUpkeep', () => {
      it('should run only if checkUpKeep returns true', async () => {
        await lotteryContract.enterLottery({
          value: entranceFee,
        });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        const tx = await lotteryContract.callStatic.performUpkeep('0x');
        assert(tx);
      });
      it('should revert if checkUpKeep returns false', async () => {
        await expect(lotteryContract.performUpkeep('0x')).to.be.revertedWithCustomError(
          lotteryContract,
          'Lottery__UpkeepNotNeeded'
        );
      });

      it('should change the state to closed and emit a requestId', async () => {
        await lotteryContract.enterLottery({
          value: entranceFee,
        });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
        const txResponse = await lotteryContract.performUpkeep('0x');
        const txReceipt = await txResponse.wait(1);
        const lotteryState = await lotteryContract.getLotteryState();
        const requestId = txReceipt!.events![1].args!.requestId;
        assert(requestId.toNumber() > 0);
        assert(lotteryState == 1);
      });
    });

    describe('fulfillRandomWords', () => {
      beforeEach(async () => {
        await lotteryContract.enterLottery({ value: entranceFee });
        await network.provider.send('evm_increaseTime', [interval + 1]);
        await network.provider.request({ method: 'evm_mine', params: [] });
      });

      it('should be called only after performUpkeep', async () => {
        await expect(
          vrfCoordinatorV2MockContract.fulfillRandomWords(0, lotteryContract.address)
        ).to.be.revertedWith('nonexistent request');
      });

      it('should pick a winner, reset the lottery and send money to the winner', async () => {
        const accounts = await ethers.getSigners();
        for (let i = 1; i < 5; i++) {
          const accountConnectedToLottery = lotteryContract.connect(accounts[i]);
          await accountConnectedToLottery.enterLottery({ value: entranceFee });
        }
        const startingTimeStamp = await lotteryContract.getLatestTimestamp();
        const winnerStatingBalance = await accounts[1].getBalance();

        await new Promise<void>(async (resolve, reject) => {
          lotteryContract.once('WinnerPicked', async () => {
            console.log('\tWinnerPicked event fired!');
            try {
              const recentWinner = await accounts[1];
              const winnerEndingBalance = (await recentWinner.getBalance()).toString();
              const lotteryState = (await lotteryContract.getLotteryState()).toString();
              const nbPlayers = (await lotteryContract.getNumberOfPlayers()).toString();
              const endingTimeStamp = await lotteryContract.getLatestTimestamp();

              assert.equal(
                winnerEndingBalance.toString(),
                winnerStatingBalance.add(entranceFee.mul(5)).toString()
              );
              assert.equal(lotteryState, '0');
              assert.equal(nbPlayers, '0');
              assert(endingTimeStamp > startingTimeStamp);
            } catch {
              reject();
            }
            resolve();
          });

          const tx = await lotteryContract.performUpkeep('0x');
          const txReceipt = await tx.wait(1);

          await vrfCoordinatorV2MockContract.fulfillRandomWords(
            txReceipt.events[1].args.requestId,
            lotteryContract.address
          );
        });
      });
    });
  });
