local key = KEYS[1]
local limit = tonumber(ARGV[1])
local interval = tonumber(ARGV[2])
local count = tonumber(redis.call("get", key) or "0")

if count < limit then
    redis.call("incr", key) -- 自增
    redis.call("expire", key, interval) -- 设置过期时间
end

return count