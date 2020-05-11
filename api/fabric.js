const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path       = require('path');
const fileSystem = require('fs');

const wallet = () => {
  const walletPath = path.join(process.cwd(), 'wallets');
  return new FileSystemWallet(walletPath);
}

const gatewayOptions = (user) => { 
  return { 
    wallet: wallet(), 
    identity: user, 
    discovery: { "enabled": true, "asLocalhost": true }
  } 
}

const config = () => {
  const configPath = path.join(process.cwd(), 'fabric_connection.json');
  const configJSON = fileSystem.readFileSync(configPath, 'utf8');
  return JSON.parse(configJSON);  
}

exports.connectToNetwork = async (user) => {
  const gateway  = new Gateway();
  await gateway.connect(config(), gatewayOptions(user));
  const network  = await gateway.getNetwork('mychannel');
  const contract = await network.getContract('node_blockchain_api_scaffold');
  return { contract: contract, network: network, gateway: gateway };
}