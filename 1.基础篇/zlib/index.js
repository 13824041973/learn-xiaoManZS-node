const zlib = require('zlib')
const fs = require('node:fs')


// 1.gzip
/**
 * 压缩
const readStream = fs.createReadStream('test.txt')
const writeStream = fs.createWriteStream('test.txt.gz')

readStream.pipe(zlib.createGzip()).pipe(writeStream)
 */



/**
 * 解压
const readStream = fs.createReadStream('test.txt.gz')
const writeStream = fs.createWriteStream('test1.txt')
readStream.pipe(zlib.createGunzip()).pipe(writeStream)
 */




// 2.deflate
/**
 * 
const readStream = fs.createReadStream('test.txt')
const writeStream = fs.createWriteStream('test.txt.deflate')

readStream.pipe(zlib.createDeflate()).pipe(writeStream)
 */


/**
 * 
const readStream = fs.createReadStream('test.txt.deflate')
const writeStream = fs.createWriteStream('test2.txt')
readStream.pipe(zlib.createInflate()).pipe(writeStream)
 */
