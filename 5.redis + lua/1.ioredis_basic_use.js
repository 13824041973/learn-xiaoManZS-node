import Ioredis from 'ioredis'

const ioredis = new Ioredis({
    host: '127.0.0.1',
    port: 6379,
})

// 字符串
ioredis.setex('key', 10000, 222)
ioredis.set('key2', 1222)
ioredis.get("key").then(res => console.log(res))

// 集合 Set
ioredis.sadd("myset", '1', '1', '2', 1, 2)
ioredis.srem("myset", 2)
ioredis.smembers('myset').then(res => console.log(res))

// 哈希
ioredis.hset("myhash", "key1", 1)
ioredis.hset("myhash", "key2", 2)
ioredis.hset("myhash", "key3", 3)
ioredis.hget("myhash", "key1").then(res => console.log(res))
ioredis.hdel("myhash", "key2")
ioredis.hgetall("myhash").then(res => console.log(res))

// 队列
ioredis.lpush("myqueue", 'val1')
ioredis.lpush("myqueue", "val2")
ioredis.lrange("myqueue", 0, -1).then(res => console.log(res))

// 发布订阅
const redis2 = new Ioredis()
ioredis.subscribe('channel')
ioredis.on("message", (channel, msg) => {
    console.log("ioredis received msg from channel " + channel + " : " + msg)
})
redis2.publish('channel', 'hello world')