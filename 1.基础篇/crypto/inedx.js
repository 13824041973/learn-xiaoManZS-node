const crypto = require('node:crypto')

/**
 * 1.对称加密
 * 
// 生成一个随机的 32 字节的密钥
const key = crypto.randomBytes(32)
// 生成一个随机的 16 字节的初始化向量 (IV)
const iv = Buffer.from(crypto.randomBytes(16))
// 创建加密实例，使用 AES-256-CBC 算法，提供密钥和初始化向量
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

// 对输入数据进行加密，并输出加密结果的十六进制表示
cipher.update("LuyolG", "utf-8", "hex")
const result = cipher.final('hex')
console.log(result); //b20141c53a5c33376c7c28461468d535   每次重新运行该文件都会变的

// 解密
const de = crypto.createDecipheriv("aes-256-cbc", key, iv)
de.update(result, 'hex')
const decrypted = de.final("utf-8")

console.log(decrypted); // LuyolG
 */












/**
 * 2.非对称加密
 * 
// 生成 RSA 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048
})

// 要加密的数据
const text = "LuyolG"

// 使用公钥进行加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf-8'))
console.log(encrypted);

// 使用私钥进行解密
const decrypted = crypto.privateDecrypt(privateKey, encrypted)
console.log(decrypted.toString());
 */







/**
 * 3.哈希函数
 * 不可逆性：哈希函数是单向的

// 要计算哈希的数据
let text = '123456';

// 创建哈希对象，并使用 MD5 算法
const hash = crypto.createHash('md5');

// 更新哈希对象的数据
hash.update(text);

// 计算哈希值，并以十六进制字符串形式输出
const hashValue = hash.digest('hex');

console.log('Text:', text);
console.log('Hash:', hashValue);
 */
