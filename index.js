const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
const sumOfPersons = persons.length

morgan.token('nimi', function tt (req) {
  return JSON.stringify(req.body)
})

// app.use(test)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :nimi'))

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(persons))
//   })

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${sumOfPersons} people</div><div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const randomId = () => {
  const randId = Math.floor(Math.random() * Math.floor(1000000))
  return randId
}

app.post('/api/persons', (req, res) => {
  app.get('/api/persons', (req, res) => {
    persons = res.json(persons)
  })
  const names = persons.map(person => person.name)

  console.log(persons)
  const person = req.body
  if (!person.name) {
    return res.status(400).json({ 
      error: 'Name missing' 
    })
  }
  if (!person.number) {
    return res.status(400).json({ 
      error: 'Number missing' 
    })
  }
  if(names.includes(person.name)) {
    return res.status(400).json({ 
      error: `${person.name} already found in phonebook` 
    })
  }

  const personToAdd = {
    name: person.name,
    number: person.number,
    id: randomId()
  }

  persons = persons.concat(personToAdd)
  res.json(personToAdd)
})

const test = (req, res, next) => {
  // req.name = "Testi"
  next()
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})