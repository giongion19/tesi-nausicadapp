(async () => {
    try { 
        console.log('get instant event ...')
        
        const contractAddress = '0xfb0e501320f654c32cc7c9813b8dedf9fdd45822' //Ropsten
        //const contractAddress = '0x540d7E428D5207B30EE03F2551Cbb5751D3c7569' //JVM
        const contractName = 'OvercrowdReportManager' // Change this for other contract
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `localhost/nausichain/artifacts/${contractName}.json` // Change this for different path
        // The script needs the ABI which is generated from the compilation artifact
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        
        var contract = new web3.eth.Contract(metadata.abi, contractAddress) // creates a contract instance
        const accounts = await web3.eth.getAccounts() // retrieves accounts from the personal wallet
        contract.defaultAccount = accounts[0] // sets the default "from" account
        console.log('EOA "from" address: ', contract.defaultAccount)
        
        const dept = '0xbb27bef7fede14d52825920b5c55650dc753047c9a9f900f9b83a12686b870f8';
        const report = '0xd7fbc8b6b0b40750006bcc870088df9c40988fec7a8798545073991a3a2d891d';
        const receipt = await contract.methods.newReport(dept, report).send({ 
            from: contract.defaultAccount})
        //console.log(receipt)
        console.log('Event data init ...')
        console.log('Depertment Hash: ', receipt.events.newReportInserted.returnValues['deptHash']);
        console.log('Report Hash: ', receipt.events.newReportInserted.returnValues['reportHash']);
        console.log('Block Number: ', receipt.blockNumber);
        console.log('Contract Address: ', receipt.events.newReportInserted.address);
        console.log('Timestamp: ', receipt.events.newReportInserted.returnValues['timestamp']);
        console.log('... event data end')
    }
    catch (e) {
        console.log(e)
    }
})()