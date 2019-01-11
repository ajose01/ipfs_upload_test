require('normalize.css/normalize.css');
require('./styles/index.scss');
let ipfsClient = require('ipfs-http-client');
let buffer = require('buffer');
console.log(ipfsClient);
let ipfs = ipfsClient('ipfs.infura.io', '5001', {protocol: 'https'});

document.addEventListener("DOMContentLoaded", () => {
  window.ipfs = ipfs;
});

function upload() {
  const reader = new FileReader();
  reader.onloadend = function() {
    const buf = buffer.Buffer(reader.result) // Convert data into buffer
    ipfs.add(buf, (err, result) => { // Upload buffer to IPFS
      if(err) {
        console.error(err)
        return
      } else {
        console.log(result)
      }
      let url = `https://ipfs.io/ipfs/${result[0].hash}`
      console.log(`Url --> ${url}`)
      document.getElementById("url").innerHTML= url
      document.getElementById("url").href= url
      document.getElementById("output").src = url
    })
  }
  const photo = document.getElementById("photo");
  reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
}

window.upload = upload;
