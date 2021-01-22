const fs = require("fs").promises
const path = require("path")

const contactsPath = path.join(__dirname, "./db/contacts.json")

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message))
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((arr) => console.log(arr.find((contact) => contact.id === contactId)))
    .catch((err) => console.log(err.message))
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
  .then((data) => JSON.parse(data))
  .then((data) => {
    const arr = [...data]
    const fiteredArr = arr.filter((contact, i) => contact.id !== contactId)
    const strArr = JSON.stringify(fiteredArr)
    fs.writeFile(contactsPath, strArr, "utf8")
  })
  .catch((err) => console.log(err.message))
  fs.readFile(contactsPath, "utf8")
  .then(data => console.log('Contact removed'))
}

function addContact(name, email, phone) {
  const contact = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
  }
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const arr = [...data, contact]
      const strArr = JSON.stringify(arr)
      fs.writeFile(contactsPath, strArr, "utf8")
    })
    .catch((err) => console.log(err.message))


  fs.readFile(contactsPath, "utf8")
    .then(data => console.log('Contact added'))
    .catch(err => console.log(err.message))

}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
