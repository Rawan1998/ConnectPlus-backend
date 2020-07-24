const mongoose = require('mongoose');
require('./OfferCategoryModel');
const OfferCategory = mongoose.model('OfferCategory');

async function save(offerCategory) {
    try {
        let oc = new OfferCategory(offerCategory);
        await oc.save();
        return oc
    } catch (err) {
        throw (err);
    }
}

async function findByName(name) {
    try {
        let offerCat = await OfferCategory.findOne({ name: name });
        if (!offerCat)
            throw ({ status: 404, message: 'Offer Category not found' })
        return offerCat;
    } catch (err) {
        throw (err);
    }
}

async function findAll() {
    try {
        let offerCats = await OfferCategory.find({}).populate({
            path: 'offers'
        }).exec();
        if (!offerCats)
            throw ({ status: 404, message: 'No Offer Category found' })
        return offerCats;
    } catch (err) {
        throw (err);
    }
}

module.exports = {
    save,
    findByName,
    findAll
}