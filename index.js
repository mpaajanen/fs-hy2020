require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// let persons = [
//   {
//     'name': 'Arto Hellas',
//     'number': '040-123456',
//     'id': 1
//   },
//   {
//     'name': 'Ada Lovelace',
//     'number': '39-44-5323523',
//     'id': 2
//   },
//   {
//     'name': 'Dan Abramov',
//     'number': '12-43-234345',
//     'id': 3
//   },
//   {
//     'name': 'Mary Poppendieck',
//     'number': '39-23-6423122',
//     'id': 4
//   }
// ]
// const sumOfPersons = persons.length

morgan.token('nimi', function tt (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :nimi'))

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(person => {
      res.json(person)
    })
})

app.get('/info', (req, res) => {
  Person.countDocuments({}, function (err, count) {
    console.log(count)
    res.send(`<div>Phonebook has info for ${count} people</div><div>${Date()}</div>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
    // const id = Number(req.params.id)
    // persons = persons.filter(person => person.id !== id)

})

// const randomId = () => {
//   const randId = Math.floor(Math.random() * Math.floor(1000000))
//   return randId
// }

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  // app.get('/api/persons', (req, res) => {
  //   persons = res.json(persons)
  // })

  // const names = persons.map(person => person.name)

  const person = req.body
  // if (!person.name) {
  //   return res.status(400).json({
  //     error: 'Name missing'
  //   })
  //   .catch(error => next(error))
  // }
  // if (!person.number) {
  //   return res.status(400).json({
  //     error: 'Number missing'
  //   })
  //   .catch(error => next(error))
  // }
  // if(names.includes(person.name)) {
  //   return res.status(400).json({
  //     error: `${person.name} already found in phonebook`
  //   })
  //   .catch(error => next(error))
  // }

  const personToAdd = new Person({
    name: person.name,
    number: person.number,
    // id: randomId()
  })

  // persons = persons.concat(personToAdd)
  personToAdd
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  console.error(error.name)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})