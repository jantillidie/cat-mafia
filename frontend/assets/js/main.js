const API_URL = 'http://localhost:8989/api/members'

const list = document.querySelector("#members-list")
const count = document.querySelector("#member-count")

function createCard(cat) {
    const card = document.createElement('article')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = cat.avatarUrl
    img.alt = cat.name

    const name = document.createElement('h3')
    name.textContent = cat.name

    const rank = document.createElement('span')
    rank.className = 'rank'
    rank.textContent = cat.rank

    const specialty = document.createElement('p')
    specialty.textContent = cat.specialty || '-'

    const status = document.createElement('p')
    status.textContent = cat.status === 'active' ? 'Aktiv' : 'Inaktiv'

    card.append(img, name, rank, specialty, status)
    return card
}

async function loadMembers() {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Status ' + response.status)

        const members = await response.json()

        list.innerHTML = ''
        members.forEach(cat => list.append(createCard(cat)))
        count.textContent = members.length
    } catch (err) {
        console.error(err)
        list.textContent = 'Mitglieder konnten nicht geladen werden.'
    }
}

loadMembers()