var ethers = require('ethers');
var register = require('./build/Register')
var fs = require('fs');

async function deployAll() {
  var provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const signer0 = provider.getSigner(0);
  let factory = new ethers.ContractFactory(register.abi, register.bytecode, signer0);
  let contract = await factory.deploy();

  console.log("> Contract address : ", contract.address);

  await contract.deployed()
  console.log("> Deployment confirmed")
  
  fs.writeFile("dapp-vuejs/data.json", JSON.stringify(contract), function(err) {
      if (err) {
          console.log(err);
      }
  })
}
deployAll()
