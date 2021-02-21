const Joi = require("joi")
const Contact = require("../Model/Contacts")

class ContactsController {
  async getContacts(req, res) {
    try {
      const {
        query: { sub, page, limit = 20 },
      } = req
      const { docs: contacts } = await Contact.paginate(
        sub ? { subscription: sub } : {},
        page
          ? {
              page: page,
              limit: limit,
            }
          : {}
      )
      res.status(200).json(contacts)
    } catch (error) {
      console.log("Error: ", error)
      process.exit(1)
    }
  }

  async getContactById(req, res) {
    const {
      params: { contactId },
    } = req
    try {
      const contact = await Contact.findById(contactId)
      res.status(200)
      res.json(contact)
      res.end()
    } catch (error) {
      console.log("Error: ", error)
      process.exit(1)
    }
  }

  async addContact(req, res) {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subscription: req.body.subscription,
      password: req.body.password,
      token: req.body.token,
    })
    try {
      await newContact.save()
      console.log("Contact added to DB! ", newContact)
      res.status(201)
      res.json(newContact)
      res.end()
    } catch (e) {
      console.log("Error", e)
      return process.exit(1)
    }
  }

  async updateContact(req, res) {
    const {
      params: { contactId },
    } = req

    try {
      const updatedContact = await Contact.findOneAndUpdate(contactId, req.body, { new: true })
      // const updatedContact = await Contact.findById(contactId)
      console.log("Contact is updatede: ", updatedContact)
      res.status(200)
      res.json(updatedContact)
      res.end()
    } catch (error) {
      console.log("Error: ", error)
      process.exit(1)
    }
  }

  async removeContact(req, res) {
    try {
      const {
        params: { contactId },
      } = req
      await Contact.findByIdAndRemove({ _id: contactId })
      res.status(200)
      res.json({ message: "contact deleted" })
      res.end()
    } catch (error) {
      console.log("Error: ", error)
      process.exit(1)
    }
  }

  async validateId(req, res, next) {
    const {
      params: { contactId },
    } = req
    try {
      const contact = await Contact.findById(contactId)
      if (!contact) {
        return res.status(404).send({ message: "Not found" })
      }
      next()
    } catch (error) {
      console.log("Error: ", error)
      process.exit(1)
    }
  }

  async validateCreateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      subscription: Joi.string().required(),
      password: Joi.string().required(),
      token: Joi.string().required(),
    })

    const resValidation = validationRules.validate(req.body)

    if (resValidation.error) {
      return res.status(400).send(resValidation.error)
    }

    next()
  }

  async validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      subscription: Joi.string(),
      password: Joi.string(),
      token: Joi.string(),
    }).min(1)

    const resValidation = validationRules.validate(req.body)

    if (resValidation.error) {
      return res.status(400).send(resValidation.error)
    }

    next()
  }
}

module.exports = new ContactsController()
