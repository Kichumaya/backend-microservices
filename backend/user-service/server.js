const express = require('express')
const app = express()
const cors = require('cors')
const data = require('./data.json')
const PORT = 5001

app.use(cors({ origin: '*'}))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

const orders = data.orders || []

app.get('/', (req, res) => {
    try {
        return res.status(200).json({ message: 'User route working successfully.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.get('/orders', (req, res) => {
    try {
        return res.status(200).json({orders, message: 'Order fetched successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.get('/orders/:id', (req, res) => {
    try {
        let id = req?.params?.id
        if(id){
            let order = orders.find(or => or.id == id)
            return res.status(200).json({data: order, message: 'Order fetched successfully'})
        }else{
            return res.status(400).json({data: null, message: 'Order not available'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.post('/orders', (req, res) => {
    try {
        const { userId, items } = req.body
        if(!userId || !items || items.length === 0){
            return res.status(400).json({error: 'Missing information'})
        }

        const newOrder = {
            id: `ord-${Date.now()}`,
            userId,
            items,
            status: 'placed',
            createdAt: new Date()
        }

        orders.push(newOrder)

        return res.status(200).json({order: newOrder, message: 'Order placed successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})


app.delete('/orders/:id', (req, res) => {
    try {
        const orderId = req?.params?.id
        if(!orderId){
            return res.status(400).json({error: 'Missing orderId'})
        }else{
            let index = orders.findIndex(x => x.id == orderId)
            orders.splice(index, 1)
            return res.status(200).json({orderId, message: 'Order deleted successfully'})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.delete('/orders/', (req, res) => {
    try {
        let length = orders.length
        orders.splice(0, length)
        return res.status(200).json({message: 'All order data deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.put('/orders/:id', (req, res) => {
    try {
        const orderId = req?.params?.id
        const data = req.body
        if(!orderId){
            return res.status(400).json({error: 'Missing orderId'})
        }else{
            let index = orders.findIndex(x => x.id == orderId)
            orders[index] = data
            return res.status(200).json({order: orders[index], message: 'Order updated successfully'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})