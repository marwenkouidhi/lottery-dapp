import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert } from 'chai';
import { Contract } from 'ethers';
import { ethers, getNamedAccounts, network } from 'hardhat';
import { developmentChains } from '../../helper-hardhat-config';

!developmentChains.includes(network.name) &&
  describe('Lottery Staging Tests', () => {
    let lotteryContract: Contract, entranceFee: any, deployer: SignerWithAddress;
    const chainId = network.config.chainId;
    beforeEach(async () => {
      deployer = (await ethers.getSigners())[0];
      lotteryContract = await ethers.getContract('Lottery', await deployer.getAddress());
    });

    describe('fulfillRandomWords', () => {
      it('should get triggered by performUpkeep witch got triggered by checkUpkeep', async () => {
        const startingTimeStamp = lotteryContract.getLatestTimestamp();
        entranceFee = (await lotteryContract.getEntranceFee()).toNumber();

        await new Promise<void>(async (resolve, reject) => {
          lotteryContract.one('WinnerPicked', async () => {
            console.log('/t winner picked fired!');
            resolve();
            try {
              const recentWinner = lotteryContract.getRecentWinner();
              const endingTimeStamp = lotteryContract.getLatestTimestamp();
              const lotteryState = await lotteryContract.getLotteryState();

              assert.equal(await lotteryContract.getNumberOfPlayers(), 0);
              assert.equal(lotteryState(), 0);
              assert.equal(await deployer.getBalance(), winnerStatingBalance.add(entranceFee));
              assert(endingTimeStamp > startingTimeStamp);
            } catch (err) {
              console.log(err);
              reject();
            }
          });
        });
        await lotteryContract.enterLottery({
          value: entranceFee,
        });
        const winnerStatingBalance = await await deployer.getBalance();
      });
    });
  });
