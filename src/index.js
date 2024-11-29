import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use('/admin/*', basicAuth({ username: 'admin', password: 'secret' }))
app.get('/admin/jobs', (c) => {
    return c.text('You are authorized!')
})

app.get('/', (c) => {
    return new Response('Good morning!')
})

app.get('/api/hello', (c) => {
    return c.json({
        ok: true,
        message: 'Hello Hono!',
    })
})

app.get('/posts/:id', (c) => {
    const page = c.req.query('page')
    const id = c.req.param('id')
    c.header('X-Message', 'Hi!')
    return c.text(`You want see ${page} of ${id}`)
})

app.post('/posts', (c) => c.text('Created!', 201))

app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port,
})
