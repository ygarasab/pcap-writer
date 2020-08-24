const C = require('./constants')
const os = require('os')

const globalHeaders = {
    magic : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : C.TCPDUMP_MAGIC
    },
    v_major : {
        structType : C.STRUCT_TYPES.UNSIGNED_SHORT, 
        value : C.PCAP_VERSION_MAJOR
    },
    v_minor : {
        structType : C.STRUCT_TYPES.UNSIGNED_SHORT, 
        value : C.PCAP_VERSION_MINOR
    },
    thiszone : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : C.ZERO
    },
    sigfigs : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : C.ZERO
    },
    snaplen : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : C.DEFAULT_SNAPLEN
    },
    linktype : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : C.DEFAULT_LINKTYPE
    }
}

const packetHeaders = {

    tv_sec : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : 0
    },
    tv_usec : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : 0
    },
    caplen : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : 0
    },
    len : {
        structType : C.STRUCT_TYPES.UNSIGNED_LONG, 
        value : 0
    }

}

const headerFormat = C.BYTE_ORDER[os.endianness()];

const getHeaderFormat = headers => headerFormat + Object.values(headers).map( field => field.structType ).join('')

const globalHeaderFormat = getHeaderFormat(globalHeaders)
const packetHeaderFormat = getHeaderFormat(packetHeaders)

module.exports = {
    globalHeaders, globalHeaderFormat,
    packetHeaders, packetHeaderFormat
}