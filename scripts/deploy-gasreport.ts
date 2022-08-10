import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const testgas_contract = await ethers.getContractFactory("TestGas");
    const testgas_obj = await testgas_contract.deploy();
    await testgas_obj.deployed();

    return testgas_obj;
}

// @ts-ignore
deploy().then();