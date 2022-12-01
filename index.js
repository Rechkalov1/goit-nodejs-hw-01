const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);

      break;

    case "get":
      const oneContacts = await contacts.getContactById(id);
      console.log(oneContacts);

      break;

    case "add":
      const newContacts = await contacts.addContact(name, email, phone);
      console.log(newContacts);

      break;

    case "remove":
      const deleteContacts = await contacts.removeContact(id);
      console.log(deleteContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
