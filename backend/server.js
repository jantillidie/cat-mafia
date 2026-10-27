import express from 'express'
import cors from 'cors'

const PORT = 8989
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/members', (req, res) => {
    res.sendStatus(200)
})

app.post('/api/members', (req, res) => {
    const cat = req.body
    cat.id = Date.now()
    cat.avatarUrl=`https://robohash.org/${cat.name}.png?set=set4`
    console.log(cat)
    res.sendStatus(201)
})


// https://robohash.org/christ.png?set=set4

// {
//     "id": 2,
//     "name": "Miaufioso",
//     "rank": "Capo",
//     "specialty": "Informationsbeschaffung",
//     "avataUrl": "https://api.dicebear.com/10.x/sprouts/svg?seed=Miaufioso",
//     "status": "active"
// }

app.listen(PORT, () => console.log(`Die Meowfia schnurrt auf Port: ${PORT}`))