-- 全局变量
-- name = 'liuyaol'
-- print(name)
local a
-- 局部变量
-- local name2 = 'lyl2'
-- print(name2)
-- do
--     local name3 = 'l3'
--     print(name3)
-- end
-- print(name3) -- nil
local b
-- 条件语句
-- local nameIf = 'testIf'
-- if nameIf == 'testIf' then
--     print("testIf")
-- elseif nameIf == 'test' then
--     print("test")
-- else
--     print("nothing")
-- end
local c
-- 函数
-- local testFunc = 'testFunc'
-- function func(name)
--     if name == 'test' then
--         return 'test'
--     elseif name == 'testFunc' then
--         return 'testFunc'
--     else
--         return 'nothing'
--     end
-- end
-- local testFuncResult = func(testFunc)
-- print(testFuncResult)
local d
-- 字符串拼接
-- local stringA = 'aa'
-- local stringB = 'bb'
-- print(stringA .. stringB)
local e
-- 数组与对象（数组索引从1开始）
-- arr = {3, 2, 1}
-- print(arr[1])
-- table = {
--     name = 'name',
--     age = 18
-- }
-- print(table.name)
-- print(table.age)
local f
-- 循环
-- for i = 1, 10, 3 do
--     print(i)
-- end
-- arr = {3, 2, 1}
-- table = {
--     name = 'name',
--     age = 18
-- }
-- for k, v in pairs(table) do
--     print(k, v)
-- end
-- for i, v in ipairs(arr) do
--     print(i, v)
-- end
local g
-- 模块化
local mathFunc = require('test_module')
local result = mathFunc.add(1, 2)
print(result)
