import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = (personObject) => {
    const req = axios.post(baseUrl, personObject)
    return req.then(response => response.data)
}

const remove = async (name) => {
    const results = await axios.get(baseUrl)
    const id = results.data.filter(person => person.name === name)[0].id

    return await axios
          .delete(`${baseUrl}/${id}`)
}

const update = async (name, number) => {
    const results = await axios.get(baseUrl)
    const id = results.data.filter(person => person.name === name)[0].id

    const req = axios.put(`${baseUrl}/${id}`, {name: name, number: number})
    return req.then(response => response.data)
}


export default { create, remove, getAll, update }