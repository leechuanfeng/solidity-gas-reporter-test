# Gas Reporter Test

This is a project to observe how different operations will affect the cost of gas. (All cost of gas are an estimate provided by the gas reporter module)

## Setup

Make sure to install the dependencies

```bash
yarn install
```

## Run the project

Run the following command to execute the test

```bash
npx hardhat compile
npx hardhat test
```

## Gas Reporter Results

Results:
```bash
  Testing to observe how gas cost varies between different operations
    √ Should display gas cost

·---------------------------------------------|----------------------------|-------------|-----------------------------·
|             Solc version: 0.8.9             ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
··············································|····························|·············|······························
|  Methods                                                                                                             │
·············|································|··············|·············|·············|···············|··············
|  Contract  ·  Method                        ·  Min         ·  Max        ·  Avg        ·  # calls      ·  eur (avg)  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  assignAFirstTime              ·           -  ·          -  ·      43366  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  assignASecondTime             ·           -  ·          -  ·      23444  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  assignAThirdTime              ·           -  ·          -  ·      23445  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  assignAWithFunction           ·           -  ·          -  ·      23447  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  assignBFirstTime              ·           -  ·          -  ·      43367  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  oneToAPostfix                 ·           -  ·          -  ·      26434  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  oneToAPrefix                  ·           -  ·          -  ·      26451  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  postfixAddOneFirstTime        ·           -  ·          -  ·      43535  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  prefixAddOneFirstTime         ·           -  ·          -  ·      43573  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  theAddition                   ·           -  ·          -  ·      47761  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  theAdditionWithChangingValue  ·           -  ·          -  ·      36787  ·            1  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  withNTimesAddition            ·           -  ·          -  ·      30663  ·           10  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  TestGas   ·  withNTimesAdditionChanging    ·           -  ·          -  ·      36832  ·           10  ·          -  │
·············|································|··············|·············|·············|···············|··············
|  Deployments                                ·                                          ·  % of limit   ·             │
··············································|··············|·············|·············|···············|··············
|  TestGas                                    ·           -  ·          -  ·     241942  ·        0.8 %  ·          -  │
·---------------------------------------------|--------------|-------------|-------------|---------------|-------------·

  1 passing (4s)
```

Observations:

=> Notice that the initial call to any state variable is more costly compared to the subsequent call. This can be observed when calling assignAFirstTime and assignBFirstTime

=> The usual optimization such as the pre and post operator in solidity is not significant

=> Complexity of a function will greatly impact the cost of gas.


## Other Observations

Observing the differences in deployment cost for: 

> ### State Variables

1: Empty contract

```bash
contract TestGas {}
```
*Gas used: 67054 of 67054*

2: Contract with 1 state variable
```bash
contract TestGas {
    uint a;
}
```
*Gas used: 67054 of 67054*

3: Contract with 2 state variable
```bash
contract TestGas {
    uint a;
    uint b;
}
```
*Gas used: 67066 of 67066*

4: Contract with 10 state variable
```bash
contract TestGas {
    uint a;
    uint b;
    uint c;
    uint d;
    uint e;
    uint f;
    uint g;
    uint h;
    uint i;
    uint j;
}
```
*Gas used: 67066 of 67066*

**Observation: The amount of state variable does not affect the cost of gas**


> ### The Constructor

1: Assigning 1 state variable with a default value

```bash
contract TestGas {
    uint a = 1;
}
```

*Gas used: 89228 of 89228*


2: Assigning 1 state variable with a default value using the constructor

```bash
contract TestGas {
    uint a;
    constructor(){
        a = 1;
    }
}
```

*Gas used: 89296 of 89296*

**Observation: The cost of gas when using the constructor to assign the default value is the same as assigning a default value to it directly**

> ### Reassignment

1: Reassigning the same variable in constructor 2 time

```bash
contract TestGas {
    uint a;
    constructor () {
        a = 1;
        a = 2;
    }
}
```

*Gas used: 89526 of 89526*

2: Reassigning the same variable in constructor 5 time

```bash
contract TestGas {
    uint a;
    constructor () {
        a = 1;
        a = 2;
        a = 3;
        a = 4;
        a = 5;
    }
}
```

*Gas used: 90216 of 90216*

3: Reassigning the same variable in constructor 10 time

```bash
contract TestGas {
    uint a;
    constructor () {
        a = 1;
        a = 2;
        a = 3;
        a = 4;
        a = 5;
        a = 6;
        a = 7;
        a = 8;
        a = 9;
        a = 10;
    }
}
```

*Gas used: 91366 of 91366*

**Observation: The cost of gas when assigning the same state variable multiple times in the constructor is not costly but it will still cost gas!**

> ### Runtime Evaluation

1: Contract with 1 pure function

```bash
contract TestGas {
    function test() pure public {
        uint a = 1;
    }
}
```

*Gas used: 78475 of 78475*

2: Contract with 1 state variable altering function

```bash
contract TestGas {
    uint a;
    function test() public {
        a = 1;
    }
}
```

*Gas used: 78691 of 78691*

**Observation: During initialization of contract the state variable will remain unassigned until function is called, hence no gas is used.**

> ### Similar Functions

1: Contract with 2 state variable altering function

```bash
contract TestGas {
    uint a;
    function test1() public {
        a = 1;
    }
    function test2() public {
        a = 1;
    }
}
```

*Gas used: 84725 of 84725*

2: Contract with 5 state variable altering function

```bash
contract TestGas {
    uint a;
    function test1() public { a = 1; }
    function test2() public { a = 1; }
    function test3() public { a = 1; }
    function test4() public { a = 1; }
    function test5() public { a = 1; }
}
```

*Gas used: 102819 of 102819*

**Observation: Having more functions even though they do the same thing, it will also cost gas!**

> ### Functions with return value

1: Contract with 1 pure (no state altering or read) returns function

```bash
contract TestGas {
    function test() pure public returns (uint) { 
        return 1; 
    }
}
```

*Gas used: 92727 of 92727*

2: Contract with 1 view (read access of state variable) returns function

```bash
contract TestGas {
    uint a;
    function test() view public returns (uint) { 
        return a; 
    }
}
```

*Gas used: 92727 of 92727*

**Observation: Function with return value is more expensive.**

> ### Not all function are the same

1: Contract with 1 pure (no state altering or read) returns function and the use of 1 local variable

```bash
contract TestGas {
    function test() pure public returns (uint) { 
        uint a = 1;
        return a; 
    }
}
```

*Gas used: 93795 of 93795*

2: Assigning to state variable after some computation

```bash
contract TestGas {
    uint a;
    function test() public { 
        a = 1 * 3 + 700 - 123 + 8000;
    }
}
```

*Gas used: 78907 of 78907*

3: Assigning to state variable after some more computation

```bash
contract TestGas {
    uint a;
    function test() public { 
        a = 1 * 3 + 700 - 123 + 8000;
        for (uint i = 0; i < 10; ++i){
            a += i * 2;
        }
    }
}
```

*Gas used: 159751 of 159751*

**Observation: Complexity of a function will greatly impact the cost of gas.**