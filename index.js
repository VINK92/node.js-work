const func = require('./contacts');

const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      func.listContacts();
      break;

    case 'get':
      func.getContactById(id);
      break;

    case 'add':
      func.addContact(name, email, phone);
      break;

    case 'remove':
      func.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);