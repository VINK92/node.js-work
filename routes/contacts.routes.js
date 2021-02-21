const { Router } = require("express")
const router = Router()
const contactsController = require("../controllers/contacts.controller.js")
const usersController = require("../controllers/users.controller")

router.get("/", usersController.authorize, contactsController.getContacts)
router.get("/:contactId", usersController.authorize, contactsController.validateId, contactsController.getContactById)
router.post("/", usersController.authorize, contactsController.validateCreateContact, contactsController.addContact)
router.patch(
  "/:contactId",
  usersController.authorize,
  contactsController.validateId,
  contactsController.validateUpdateContact,
  contactsController.updateContact
)
router.delete("/:contactId", usersController.authorize, contactsController.validateId, contactsController.removeContact)

module.exports = router
