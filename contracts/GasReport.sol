// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract TestGas {
    // State Variable Declaration
    uint a;
    uint b;

    uint pre;
    uint post;
    uint sum;

    constructor() {
        sum = 0;
    }

    function assignAFirstTime() public {
        a = 1;
    }
    function assignASecondTime() public {
        a = 1;
    }
    function assignBFirstTime() public {
        b = 1;
    }
    function assignAThirdTime() public {
        a = 1;
    }

    function assignAWithFunction() public{
       assignAFirstTime();
    }
    function oneToAPostfix() public {
        a++;
    }
    function oneToAPrefix() public {
        ++a;
    }
    function postfixAddOneFirstTime() public {
        post++;
    }
    function prefixAddOneFirstTime() public {
        ++pre;
    }
    function theAddition() public {
        sum = pre + post;
    }
    function theAdditionWithChangingValue() public {
        sum = ++pre + post++;
    }
    function withNTimesAddition() public {
        theAddition();
    }
    function withNTimesAdditionChanging() public {
        theAdditionWithChangingValue();
    }
}