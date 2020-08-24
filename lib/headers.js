'use strict'

const C = require('./constants')
const struct = require('bufferpack');
const hdf = require('./header-definitions')


const parseHeaders = (headers, headerFormat) => {

    let headerValues = Object.values(headers).map( field => field.value )
    const header = struct.pack(headerFormat, headerValues).toString(C.HEADER_ENCODING);
    return Buffer.from(header, C.HEADER_ENCODING)

}

/**
 * 
 * @param {Number} snaplen 
 * @param {Number} linktype 
 */
const globalHeader = (snaplen,  linktype) => {
    
    if(snaplen) hdf.globalHeaders.snaplen.value = snaplen
    if(linktype) hdf.globalHeaders.linktype.value = linktype
    return parseHeaders(hdf.globalHeaders, hdf.globalHeaderFormat)

}

const packetHeader = (timeStamp, packetSize) => {

    timeStamp = timeStamp || new Date().getTime() * 1000
    hdf.packetHeaders.tv_sec.value = parseInt(parseInt(timeStamp, C.INT_BASE) / C.M_SEC, C.INT_BASE)
    hdf.packetHeaders.tv_usec.value = parseInt(((timeStamp / C.M_SEC) - parseInt(timeStamp/C.M_SEC, C.INT_BASE)) * C.M_SEC_F, C.INT_BASE)
    hdf.packetHeaders.caplen.value = packetSize
    hdf.packetHeaders.len.value = packetSize
    return parseHeaders(hdf.packetHeaders, hdf.packetHeaderFormat) 

}

module.exports = {globalHeader, packetHeader}