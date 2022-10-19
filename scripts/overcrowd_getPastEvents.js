(async () => {
    try { 
        console.log('get past events ...')
        
        //const contractAddress = '0xFb0E501320f654c32Cc7c9813b8DEdf9FDD45822' //Ropsten
        const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138' //JVM
        const contractName = 'OvercrowdReportManager' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/nausichain/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var contract = new web3.eth.Contract(metadata.abi, contractAddress) // creates a contract instance
        const accounts = await web3.eth.getAccounts() // retrieves accounts from the personal wallet
        contract.defaultAccount = accounts[0] // sets the default "from" account
        console.log('EOA "from" address: ', contract.defaultAccount)

        contract.getPastEvents('newReportInserted', {   
                filter: {
                    from: contractAddress,
                    deptHash: '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8'}, 
                fromBlock: 'earliest'
            },  function(error, events){ 
                    events.forEach(element => {
                        console.log('Report hash: ' + element.returnValues['reportHash'])
                        //console.log('Block Number: ' + element.blockNumber)
                        //console.log('Contract Address: ' + element.address)
                        console.log('Report timestamp: ' + element.returnValues['timestamp'])
                    })
            }
        )
    }
    catch (e) {
        console.log(e)
    }
})()