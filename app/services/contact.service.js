const {ObjectId} = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contact");
    }
    //Define db query functions by mogdb API
    extractConnectData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        //Remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractConnectData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite === true}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
}
module.exports = ContactService;