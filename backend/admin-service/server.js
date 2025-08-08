const express = require('express')
const app = express()
const cors = require('cors')
const data = require('./data.json')
const PORT = 5002

app.use(cors({ origin: '*'}))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

const products = data.products || []

app.get('/', (req, res) => {
    try {
        return res.status(200).json({ message: 'Admin route working successfully.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.get('/products', (req, res) => {
    try {
        return res.status(200).json({products, message: 'Products fetch successfully.'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.get('/products/:id', (req, res) => {
    try {
        let id = req?.params?.id
        if(id){
            let products = data.products.find(pr => pr.id == id)
            if(products){
                return res.status(200).json({data: products, message: 'Product fetched successfully'})
            }else{
                return res.status(400).json({data: null, message: 'Product not available'})
            }
        }else{
            return res.status(400).json({message: 'Product not found'})
        }   
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.post('/products', (req, res) => {
    try {
        const { name } = req.body
        if(!name){
            return res.status(400).json({error: 'Missing name'})
        }

        const newProduct = {
            id: `prod-${Date.now()}`,
            name,
            createdAt: new Date()
        }

        products.push(newProduct)

        return res.status(200).json({product: newProduct, message: 'product placed successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})


app.delete('/products/:id', (req, res) => {
    try {
        const productId = req?.params?.id
        if(!productId){
            return res.status(400).json({error: 'Missing productId'})
        }else{
            let index = products.findIndex(x => x.id == productId)
            products.splice(index, 1)
            return res.status(200).json({productId, message: 'product deleted successfully'})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.delete('/products/', (req, res) => {
    try {
        let length = products.length
        products.splice(0, length)
        return res.status(200).json({message: 'All product data deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})

app.put('/products/:id', (req, res) => {
    try {
        const productId = req?.params?.id
        const data = req.body
        if(!productId){
            return res.status(400).json({error: 'Missing productId'})
        }else{
            let index = products.findIndex(x => x.id == productId)
            products[index] = data
            return res.status(200).json({product: products[index], message: 'Product updated successfully'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', error: error.message})
    }
})