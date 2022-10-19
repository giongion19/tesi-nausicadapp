// valueChecker events script
(async () => {
    try {  
        console.log('pull past event ...')
        
        //const contractAddress = '0x9b9a05949ef0839a7368ac021630473c4e4689b5' //Ropsten
        const contractAddress = '0x4c01ae90e234fd8dbe42928d574dd18ba480dcd3' //Ropsten
        //const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8' //JVM
        const contractName = 'PresenceHistoryManager' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/nausichain/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var contract = new web3.eth.Contract(metadata.abi, contractAddress) // creates a contract instance
        const accounts = await web3.eth.getAccounts() // retrieves accounts from the personal wallet
        contract.defaultAccount = accounts[0] // sets the default "from" account
        console.log('EOA "from" address: ', contract.defaultAccount)
        
        //const pseudonymHash = '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8';
        const events = await contract.getPastEvents('newHistoryInserted', {   
                filter: {from: contractAddress,
                    pseudonymHash: '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8'
                }, 
                fromBlock: 0,
                toBlock:'latest'
            }) /*
            .then(function(events){
                /*events.forEach(element => {
                        //console.log(element)
                        console.log('Presence_History hash: ' + element.returnValues['presenceHistoryHash'])
                        console.log('Presence_History timestamp: ' + element.returnValues['timestamp']) 
                })
            }) */
            /*,  function(error, events){ 
                    events.forEach(element => {
                        //console.log(element)
                        console.log('Presence_History hash: ' + element.returnValues['presenceHistoryHash'])
                        console.log('Presence_History timestamp: ' + element.returnValues['timestamp']) 
                    })
            }
        ) */
        events.forEach(element => {
                        //console.log(element)
                        console.log('Presence_History hash: ' + element.returnValues['presenceHistoryHash'])
                        console.log('Presence_History timestamp: ' + element.returnValues['timestamp']) 
                })
    }
    catch (e) {
        console.log(e)
    }
})()