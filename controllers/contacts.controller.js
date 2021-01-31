const fs = require("fs").promises
const path = require("path")
const Joi = require("joi")

const contactsPath = path.join(__dirname, "../db/contacts.json");

class ContactsController {

  async getContacts(req, res) {
    const contacts = await fs.readFile(contactsPath, 'utf8', (err) => err ? console.log(err) : '');
    const contactsParsed = JSON.parse(contacts);
    res.status(200);
    res.json(contactsParsed);
    res.end();
  }

  async getContactById(req, res) {
    const contacts = await fs.readFile(contactsPath, 'utf8', (err) => err ? console.log(err) : '');
    const contactsParsed = JSON.parse(contacts);
    const { params: {contactId}} = req;
    const newContactId = +contactId;
    const foundContact = contactsParsed.find(({id}) => id === newContactId);
    res.status(200);
    res.json(foundContact);
    res.end();

  }

  async addContact(req, res) {
    const contacts = await fs.readFile(contactsPath, 'utf8', (err) => err ? console.log(err) : '');
    const contactsParsed = JSON.parse(contacts);
    const { body } = req;
    const newContact = {
      id: Date.now(),
      ...body,
    }
    contactsParsed.push(newContact)
    const newParsedContacts = JSON.stringify(contactsParsed);
    fs.writeFile(contactsPath, newParsedContacts, 'utf8')
    res.status(201)
    res.json(newContact)
    res.end()
  }

  async updateContact(req, res) {
    const contacts = await fs.readFile(contactsPath, 'utf8', (err) => err ? console.log(err) : '');
    const contactsParsed = JSON.parse(contacts);
    const { params: {contactId} } = req;
    const parsedId = +contactId;
    const contactIndex = contactsParsed.findIndex(({id}) => id === parsedId);
    const updatedContact = {
      ...contactsParsed[contactIndex],
      ...req.body,
    };
    contactsParsed[contactIndex] = updatedContact;
    const strContacts = JSON.stringify(contactsParsed);
    fs.writeFile(contactsPath, strContacts, 'utf8');

    res.status(200);
    res.json(updatedContact);
    res.end();
  }

  async removeContact(req, res) {
    const contacts = await fs.readFile(contactsPath, 'utf8', (err) => err ? console.log(err) : '');
    const contactsParsed = JSON.parse(contacts);
    const { params: { contactId } } = req;
    const parsedId = +contactId;
    const updatedContacts = contactsParsed.filter(({id}) => id !== parsedId);
    fs.writeFile(contactsPath, updatedContacts, 'utf8');
    res.status(200);
    res.json({message: "contact deleted"});
    res.end();
  }

  async validateId(req, res, next) {
    const { params: {contactId} } = req;
    const newContactId = +contactId;
    const gotUsers = await fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        console.log("Here is a proplem: ", err)
      }
    });
    const parsedUsers = JSON.parse(gotUsers);
    const userIndex = parsedUsers.findIndex(({ id }) => id === newContactId);

    if(userIndex === -1) {
      return res.status(404).send({message: "Not found"});
    }
    next();
  }

  async validateCreateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    })

    const resValidation = validationRules.validate(req.body)

    if(resValidation.error) {
      return res.status(400).send(resValidation.error)
    }

    next();
  }

  async validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    }).min(1)

    const resValidation = validationRules.validate(req.body)

    if(resValidation.error) {
      return res.status(400).send(resValidation.error)
    } 

    next();
  }

}

module.exports = new ContactsController();