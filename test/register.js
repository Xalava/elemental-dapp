const chai = require('chai')
const {MockProvider, deployContract, solidity} = require('ethereum-waffle')
const SimpleContractMock = require('../build/Register.json')
const {expect} = chai

chai.use(solidity)
describe('Test Register', () => {
  const provider = new MockProvider()
  const [ wallet , walletTo ] = provider.getWallets(provider)
  let contract
  beforeEach(async () => {
    contract = await deployContract(wallet, SimpleContractMock)
  })
  
  it('Get Empty document ', async () => {
    let dochash = await contract.hashData('blablabla')
    const date = await contract.getDate(dochash)
    expect(date).to.eq(0)
  })
    
  //add document
  it('Added document has date', async () => {
    let dochash = await contract.hashData('blablabla')
    await contract.addDocument(dochash)
    const date = await contract.getDate(dochash)
    expect(date).to.not.equal(0)
  })

})