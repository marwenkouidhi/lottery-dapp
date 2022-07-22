import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
  developmentChains,
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from '../helper-hardhat-config';
import verify from '../utils/verify';

const FUND_AMOUNT = '1000000000000000000000';

const deployLottery: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract('VRFCoordinatorV2Mock');
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const txResponse = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await txResponse.wait();
    subscriptionId = txReceipt.events[0].args.subId;
    await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[network.config.chainId!]['vrfCoordinatorV2'];
    subscriptionId = networkConfig[network.config.chainId!]['subscriptionId'];
  }

  const args = [
    vrfCoordinatorV2Address,
    subscriptionId,
    networkConfig[network.config.chainId!]['keyHash'],
    networkConfig[network.config.chainId!]['lotteryEntranceFee'],
    networkConfig[network.config.chainId!]['callbackGasLimit'],
    networkConfig[network.config.chainId!]['keepersUpdateInterval'],
  ];
  const waitConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  const lottery = await deploy('Lottery', {
    from: deployer,
    args,
    log: true,
    waitConfirmations,
  });

  // Verify the deployment
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log('Verifying...');
    await verify(lottery.address, args);
  }

  log('Run Price Feed contract with command:');
  const networkName = network.name == 'hardhat' ? 'localhost' : network.name;
  log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`);
  log('----------------------------------------------------');
};
export default deployLottery;
deployLottery.tags = ['all', 'lottery'];
