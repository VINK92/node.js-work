const { Router } = require("express")
const router = Router()
const contactsController = require("../controllers/contacts.controller.js")

router.get("/", contactsController.getContacts)
router.get("/:contactId", contactsController.validateId, contactsController.getContactById)
router.post("/", contactsController.validateCreateContact, contactsController.addContact)
// router.post('/',contactsController.validateCreateContact, contactsController.addContact)
router.patch("/:contactId", contactsController.validateId, contactsController.validateUpdateContact, contactsController.updateContact)
// router.put('/:contactId', contactsController.validateId, contactsController.updateContact)
router.delete("/:contactId", contactsController.validateId, contactsController.removeContact)

module.exports = router
