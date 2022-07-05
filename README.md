# Vaccine-Registration

**Command Line Development Management Tools** for
creating a DAPP project:

- [Truffle](https://github.com/ConsenSys/truffle) 
- [Embark](https://github.com/iurimatias/embark-framework) 
- [Dapple](https://github.com/nexusdev/dapple) 


**Browser based IDE** to get instant feedback for
solidity code:

- [ReMix](https://remix.ethereum.org/) 
- [EthFiddle](https://ethfiddle.com/) 

**Wallet clients** to connect a ethereum wallet

- Metamask 
- MyEtherWallet 


**Network**

The smart contracts
are deployed on the ethereum network on the EVM. But any transaction
executed on this network requires ether to be spent, hence its not
advicable for development.

Some testnets are :

- **Testrpc**
	– This is a local network running on your compuetr. 10 free wallet
	accounts with test ether is allocated. 
- **Ropsten**
	– This is a global testnet with free test ether. 
- **Rinkeby**
	– Another global testnet with free ether. 

**Wallet**

Wallets are very
important part of a smart contract. It serves 2 purposes:

- It serves as
	client to ethereum wallet. To make a transaction on network ether
	has to be spent and you can authorize these payments using this. 
- To
	communicate with a blockchain and to deploy, you need to either have
	a full node or a wallet client of the network.  A wallet can
	facilitate the communication with the network. 

**Deployment**

To deploy a contract
the following steps are to be taken:

- Compile the
	code and get necessary **bytecodes** and **ABIcodes** 
- Select a
	network to migrate to 
- Make a
	deployment with a wallet address as transaction sender 
- Authenticate
	the transaction form the wallet and pay the transaction cost. 

Your contract will
be deployed and will be assigned a public address which can be used
to access it.

**Web
Interface**

A web app can be
used to work with the contract. A backend  javascript framework,
**web3.js**, can intract with the blockchain. It can connect to
the network, identify the contract and perform transactions. There
are two kinds of transaction operation on a contract:

**1.Call**

A call is a local invocation of a contract function that does not
broadcast or publish anything on the blockchain. It is a read-only
operation and will not consume any Ether. It simulates what would
happen in a transaction, but discards all the state changes when it
is done. It is synchronous and the return value of the contract
function is returned immediately.

**2.Transaction**

A transaction is broadcasted to the network, processed by miners,
and if valid, is published on the blockchain. It is a write-operation
that will affect other accounts, update the state of the blockchain,
and consume Ether (unless a miner accepts it with a gas price of
zero). It is asynchronous, because it is possible that no miners will
include the transaction in a block (for example, the gas price for
the transaction may be too low). Since it is asynchronous, the
immediate **return value of a transaction is always the
transaction's hash.**

The **web3js framework **works in the following way:

- Connect to a network using  ‘**web3Provider**’ to a
	localhost(local testnet) or a global network 
- Create a contract **instance** using the **ABI code **and
	C**ontract address**. Contract address identifies the particular
	contract on the network to interact with and the ABI code specifies
	how to access each function. 
- Use the instance to call contract functions like
	javascript. 

**Steps:**

**Pre requistes**
- Nodejs v12+
- Docker
- ganache-cli (npm i -g ganache-cli)
- truffle (npm i -g truffle)
- yarn (npm i -g yarn)

**Install MetaMask**

1. Go to [https://metamask.io/](https://metamask.io/)
and install the **browser plugin**.

2. Setup a **password** and open the wallet. Select the network
as ‘**Rinkeby Test Network**’ / ‘**Ropsten Test Network**’  .

3. Click on ‘**CREATE ACCOUNT**’ to create a new wallet
account and click ‘**Copy Address to clipboard**’ to copy your
**public address** for the wallet.

4. Go to [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)
to get free test ether to the address. Check your account on metamask
and verify the **balance**. You can also make use of ropsten network, there will be a
faucet option available in metamask to get test ethereum.

5. Repeat steps 3 and 4 to create more accounts.

**Deploying contract**

1.Create .env file with the following format in the root of the cloned repo

```
INFURA_KEY="<paste you infura key>"
MNEMONIC="<Mnemonics>"
```
Please make sure that addresses generated from the mnemonics have some funds in the network you are trying to deploy also is the same mnemonics loaded in metamask for the ease of testing

2. Execute "yarn install

3. Execute "yarn compile"

4. Execute "yarn deploy:ropsten" // or rinkeby

5. Your contract will get deployed to the network

6. Open  **src/js/app.js** file. This is the javascript file
that interacts with the contract.

7. Paste your contract address replacing  '**contract_address**'
in **“web3.eth.Contract(abi, <contract-addess>”)

8. Run "yarn serve" to serve the web app locally

9. Connect your metamask to the web app and interact with the Dapp
