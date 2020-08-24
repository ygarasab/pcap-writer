'use strict';

var fs = require('fs');
const headers = require('./headers');

/**
 * 
 * @param {String} file 
 * @param {Number} snaplen 
 * @param {Number} linktype 
 */
const createPcapWriter = (file, snaplen, linktype) => {

    const startingPoint = new Date().getTime()
    const fileWriter = fs.createWriteStream(file)
    const globalHeader = headers.globalHeader(snaplen, linktype)

    fileWriter.write(globalHeader)

    return {

        /**
         * @param {Buffer} packet
         * @param {Number} timestamp
         */
        writePacket : (packet, timestamp) => {

            const packetHeader = headers.packetHeader(timestamp, packet.length)
            fileWriter.write(packetHeader);
            fileWriter.write(packet);

        },

        /**
         * @param { (file : String, eslapsedTime : Number) => {} } callbackFunction
         */
        close : callbackFunction => {

            callbackFunction = callbackFunction || function(){}
            fileWriter.end()
            fileWriter.on('finish', () => callbackFunction(file, new Date().getTime() - startingPoint ))

        }

    }

}


module.exports = {createPcapWriter};
