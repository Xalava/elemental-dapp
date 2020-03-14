var app = new Vue({
  el: '#app',
  data: {
    userAddress: 'Unkown',
    userBalance: "",
    userTransactionCount: 0,
    provider: {},
    adresses: [],
    network:"",
    connected: false,
    contractData:{},
    contrat:{},
    recentDocuments:[],
    checkedDocDate:0,
    lastDocument:{},
    signer:{}
  },
  beforeCreate: function () {
      fetch("/data.json")
        .then(r => r.json())
        .then(json => {
          this.contractData=json;
        });
  },
  methods:{
    connectMetamask: async function() {
      this.addresses = await ethereum.enable()
      this.provider = await new ethers.providers.Web3Provider(ethereum)
      this.userAddress = this.addresses[0]
      this.signer = this.provider.getSigner(this.addresses[0]);
      this.connected = true
      this.retrieveInformation()
    },
    connectLocally: async function(){
      this.provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      this.signer = await this.provider.getSigner(0);
      console.log("signer:",this.signer)
      this.userAddress = await this.signer.getAddress() 
      this.connected = true
      this.retrieveInformation()
    },
    retrieveInformation: async function() {
      this.getNetwork()
      this.getContract()
      this.getUserData()
    },
    getNetwork: async function() {
      this.network = await this.provider.getNetwork()  
      console.log("Network: ", this.network) 
    },
    getContract: async function() {
      console.log("Contract data",this.contractData)
      let Contrat=new ethers.Contract(this.contractData.address, this.contractData.interface.abi, this.provider)
      this.contrat=await Contrat.connect(this.signer)      

    },
    getUserData: async function() {
      this.provider.getBalance(this.userAddress)
      .then((balance) => {
        let etherString = ethers.utils.formatEther(balance)
        this.userBalance = etherString
      })
      this.provider.getTransactionCount(this.userAddress)
      .then((transactionCount) => {
        this.userTransactionCount = transactionCount
      })
    },
    loadDocument: async function(){
      let doc = document.getElementById("fichier").files[0]
      const reader = new FileReader()
      reader.readAsBinaryString(doc)
      console.log(reader)
      reader.onloadend = function() {
        app.lastDocument = reader.result
      }
    },
    addDocument:async function(){
      try {
        if(this.lastDocument){
          let dochash = await this.contrat.hashData(this.lastDocument.toString())
          await this.contrat.addDocument(dochash)
          this.recentDocuments.push(dochash)
          console.log(this.recentDocuments)
        } 
      } catch (error) {
        console.log(error)
      }
    },
    checkDocument:async function(){
      try {
        let dochash = await this.contrat.hashData(this.lastDocument.toString())
        let docDate = await this.contrat.getDate(dochash)
        console.log("Doc date retrieved", docDate.toNumber())
        if(docDate.toNumber()==0){
          this.checkedDocDate = "Document not Found"
        }else {
          this.checkedDocDate = "Document added on " + new Date(docDate.toNumber()*1000).toLocaleDateString('en-GB', {  
            month : 'short',
            day : 'numeric',
            year : 'numeric'
          })        
        }
      } catch (error) {
        this.checkedDocDate = "Not Found"
        console.log(error)
      }
    }
  }
})