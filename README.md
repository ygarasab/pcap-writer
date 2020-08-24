# pcap-writer

A simple pcap writer based on the core of [node-pcap-writer](https://www.npmjs.com/package/node-pcap-writer), from Harsh Raval.

## Example

Initialize:
```javascript
const pcapw = require('pcpa-writer');

const pcapWriter = pcapw.createPcapWriter('file.pcap', 1500, 105);
```

This will also write global header. Then for writing data packets:

```javascript

pcapWriter.writePacket(packet, timestamp);

```

Here packet is a [Buffer](https://nodejs.org/api/buffer.html) object of Node JS containig data of packet. 
Timestamp needs to be in usec, if not set the packet will be written with the current relative timestamp.

And then finally close it:

```javascript

pcapWriter.close();

```

This will close the file write stream so the file can be usable. 

If you like, you can also add a callback function, to be called as soon as the writer finishes writing the last packet:

```javascript

pcapWriter.close( (filename, elapsedTime) => {
    
    //your code here

} );

```



License
-------
MIT
