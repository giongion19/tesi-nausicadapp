(async () => {
    try { 
        console.log('get instant event ...')
        
        const contractAddress = '0x820813999ad2b1c28415a4daead0d998268b1a48' //Ropsten
        //const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8' //JVM
        const contractName = 'PresenceHistoryManager' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/nausichain/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var contract = new web3.eth.Contract(metadata.abi, contractAddress) // creates a contract instance
        const accounts = await web3.eth.getAccounts() // retrieves accounts from the personal wallet
        contract.defaultAccount = accounts[0] // sets the default "from" account
        console.log('EOA "from" address: ', contract.defaultAccount)
        
        const pseudo = '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8';
        const presence = '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8';
        const receipt = await contract.methods.newInfection(pseudo, presence).send({ 
            from: contract.defaultAccount})
            
        console.log('Event data init ...')
        console.log('pseudonymHash: ', receipt.events.newHistoryInserted.returnValues['pseudonymHash']);
        console.log('presenceHistoryHash: ', receipt.events.newHistoryInserted.returnValues['presenceHistoryHash']);
        console.log('blockNumber: ', receipt.blockNumber);
        console.log('timestamp: ', receipt.events.newHistoryInserted.returnValues['timestamp']);
        console.log('... event data end')
    }
    catch (e) {
        console.log(e)
    }
})()