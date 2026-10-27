import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import { error } from 'console'

const FILE = './members.json'
const PORT = 8989
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/members', async (req, res) => {
    try {
        const text = await fs.readFile(FILE, 'utf-8')
        const members = JSON.parse(text)
        res.json(members)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Mitglieder können nicht geladen werden." })
    }
})

app.post('/api/members', (req, res) => {
    const cat = req.body
    cat.id = Date.now()
    cat.avatarUrl = `https://robohash.org/${cat.name}.png?set=set4`
    console.log(cat)
    res.sendStatus(201)
})


// https://robohash.org/christ.png?set=set4

// {
//     "id": 2,
//     "name": "Miaufioso",
//     "rank": "Capo",
//     "specialty": "Informationsbeschaffung",
//     "avataUrl": "https://robohash.org/peter.png?set=set4",
//     "status": "active"
// }

app.listen(PORT, () => console.log(`Die Meowfia schnurrt auf Port: ${PORT}`))