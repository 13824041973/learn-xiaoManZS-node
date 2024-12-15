import fastify from 'fastify'

const server = fastify();

//post接口
server.post("/", async (request, reply) => {
    const { name, version } = request.body;
    //返回json  支持直接return
    return {
        name,
        version
    }
});
//get接口
server.get("/", async (request, reply) => {
    reply.send(`${request.query.name}`);
});


server.route({
    method: 'GET',
    url: "/routeTest",
    schema: {
        querystring: {
            type: "object",
            properties: {
                page: { type: "number" },
                pageNo: { type: "number" }
            },
            required: ["page", "pageNo"]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    data: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                version: { type: "string" }
                            }
                        }
                    }
                },
            }
        }
    },
    handler: (req, reply) => {
        console.log(req.query)
        return {
            data: [{ name: 'luyolg', version: "1.0" }]
        }
    }
})

server.register(function (fastify, opts, done) {
    server.decorate(opts.name, (a, b) => a + b)

    const res = server[opts.name](1, 2)

    console.log(res)

    done()
}, {
    name: 'add'
})

server.register(import('@fastify/mysql'), {
    connectionString: 'mysql://root:123456@localhost:3306/luyolg' //账号,密码,IP,端口,库名
})

server.post('/add', (req, res) => {
    server.mysql.query("insert into user(name,email) values(?,?)", [req.body.name, req.body.email], (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        res.send({ result })
    })
})

server.get('/list', (req, res) => {
    server.mysql.query("select * from user", (err, result) => {
        res.send({ result })
    })
})

server.listen({ port: 3000 }).then(() => console.log("server is running"))