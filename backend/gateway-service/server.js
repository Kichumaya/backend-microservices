const express = require('express')
const app = express()
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const PORT = 5000

app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use('/user', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
}))

app.use('/admin', createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true
}))

