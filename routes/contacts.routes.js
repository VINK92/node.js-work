const {Router} = require('express');
const router = Router();
const contactsController = require('../controllers/contacts.controller.js');

router.get('/', contactsController.getContacts)
router.get('/:contactId', contactsController.validateId, contactsController.getContactById)
router.post('/',contactsController.validateCreateContact, contactsController.addContact)
router.put('/:contactId', contactsController.validateId, contactsController.updateContact)
router.delete('/:contactId', contactsController.validateId, contactsController.removeContact)

module.exports = router;