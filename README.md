# Node Blockchain API Scaffold

### My Hyperledger Fabric Node Express CRUD REST API Scaffold

The objective of this repository is to provide a REST API to a the Hyperledger IBM Visual Studio Code Extension chaincode contract template.

**Install VSCode with IBM Blockchain Platform Extension**:
- [VSCode version 1.39](https://code.visualstudio.com/updates/v1_39)
- [IBM Blockchain Platform Extension for VSCode](https://github.com/IBM-Blockchain/blockchain-vscode-extension)


**On IBM Blockchain Platform Extension**:

- Click on *1 Org Local Fabric* to start (Fabric Environment)
- Click on *Package Open Project* (Smart Contracts) after openning only contracts/users folder on VS Code
- Click on *Fabric Environments -> Smart Contracts -> Installed -> Install* and select `node_blockchain_api_scaffold@0.0.2`
- Click on *Fabric Environments -> Smart Contracts -> Instantiated -> Instantiate* and select `node_blockchain_api_scaffold@0.0.2` use default values (press Enter) for all questions
- Click on *1 Org Local Fabric -> Org 1* -> **right click** *-> Export Wallet* and save on api/wallets (will create a folder called wallets on /api path)

**To check that everything is working before using the API**:

- Click on *Fabric Gateways -> 1 Org Local Fabric - Org1* and selecting admin
- Click on *Fabric Gateways -> 1 Org Local Fabric - Org 1 -> Channels -> mychannel -> node_blockchain_api_scaffold@0.0.2 -> createUser* -> **right click** -> Submit Transaction and send `["1", "Élisson Michael"]` as argument (press Enter on next question) and you should see a "Successfully submitted transaction" notification
- Click on *Fabric Gateways -> 1 Org Local Fabric - Org 1 -> Channels -> mychannel -> node_blockchain_api_scaffold@0.0.2 -> readUser* -> **right click** -> Evaluate Transaction and send `["1"]` as argument (press Enter on next question) and you should see a "Successfully submitted transaction" notification followed by `[SUCCESS] Returned value from readUser: {"value":"Élisson Michael","id":"1"}` message on terminal

**Using the API**:

Install Node 10.20.1:

```bash
  cd api/
  nvm install 10.20.1
  nvm use 10.20.1
  npm run dev
```

Open Insomnia, Postman or Similar and test the following routes on the endpoint `localhost:8081`:

| Route         | Method | Params (JSON)
| --------------| -------| ------------- |
| /users        | POST   | {"id":"2" "value":"Satya Ananda"} |
| /users/:id    | GET    |                                   |
| /users/:id    | PUT    | {"value":"Brandon Nyorai"}        |
| /users/:id    | DELETE |                                   |

![Insomnia Example](/insomnia.png)

Check the [commits history](https://github.com/elissonmichael/node_blockchain_api_scaffold/commits/master) to see some of the [SDK methods](https://hyperledger.github.io/fabric-sdk-node/release-1.4/module-fabric-network.Contract.html) in action.

**Upgrading a Contract**:

Every time you change the contract you'll have to:

- Run automated tests `npm test`
- Update version on *package.json* file
- Click on *Smart Contracts -> Package Open Project* to create a new package
- Click on *Fabric Environments -> Smart Contracts -> Installed -> Install* and select your new contract package
- Click on *Fabric Environments -> Smart Contracts -> Instantiated -> [Your Contract Name] -> Upgrade Smart Contract* and select your new package version
- Check that your new contract appears on *Fabric Gateways -> 1 Org Local Fabric - Org 1 -> Channels -> mychannel*
