(async () => {
    try {  
        const IPFS = require("ipfs-mini");
        const ipfs = new IPFS({host: "ipfs.infura.io", port: 5001, protocol: 'https'});
        const randomData = '8803cf48b8805198dbf85b2e0d514320'; // random bytes for testing
        ipfs.add(randomData, (err, hash) => {
         if (err) {
           return console.log(err);
         }
         
         console.log('HASH:', hash);
        });
    }
    catch (e) {
        console.log(e)
    }
})()