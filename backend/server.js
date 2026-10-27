import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'

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

app.post('/api/members', async (req, res) => {
    const { name, rank, specialty } = req.body

    if (!name || !rank) {
        return res.status(400).json({ error: "Mind. Name und Rang eintragen." })
    }
    try {
        const text = await fs.readFile(FILE, 'utf-8')
        const members = JSON.parse(text)

        const cat = {
            id: Date.now(),
            name,
            rank,
            specialty: specialty || '',
            avatarUrl: `https://robohash.org/${encodeURIComponent(name)}.png?set=set4`,
            status: 'active'
        }

        members.push(cat)
        await fs.writeFile(FILE, JSON.stringify(members, null, 2))

        res.status(201).json(cat)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Mitglied konnte nicht gespeichert werden." })
    }

})

app.listen(PORT, () => console.log(`Die Meowfia schnurrt auf Port: ${PORT}`))