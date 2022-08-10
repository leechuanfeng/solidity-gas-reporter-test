import _ from "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Testing to observe how gas cost varies between different operations", () => {
    it("Should display gas cost", async () => {
        const testgas_contract = await ethers.getContractFactory("TestGas");
        const testgas_obj = await testgas_contract.deploy();
        await testgas_obj.deployed();

        await testgas_obj.assignAFirstTime();
        await testgas_obj.assignASecondTime();
        await testgas_obj.assignBFirstTime();
        await testgas_obj.assignAThirdTime();
        await testgas_obj.assignAWithFunction();
        await testgas_obj.oneToAPostfix();
        await testgas_obj.oneToAPrefix();
        
        await testgas_obj.postfixAddOneFirstTime();
        await testgas_obj.prefixAddOneFirstTime();
        
        await testgas_obj.theAddition();
        await testgas_obj.theAdditionWithChangingValue();
        
        for (let i:number = 0; i < 10; ++i) {
            await testgas_obj.withNTimesAddition();
            await testgas_obj.withNTimesAdditionChanging();
        }
    });
});