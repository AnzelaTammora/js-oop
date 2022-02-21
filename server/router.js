//commonJS module import
import express from 'express'; //pieprasam expresu
const router = express.Router(); //un definējam router

let data = require('./data') //require-pieprasam datus no data.js

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points

//Piemēram: www.homepage.com/ierakstanumurs
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {  //find atrod pirmo elementu, kas atbilst kritērijiem
        return item.id === parseInt(req.params.id);  //šīs kritērijs ir parsēts cipars, šī ieasta id
    });
    // if object found return an object else return 404 not-found
    if (found) {  //ja found ir patiess, t.i. mums izdevās atrast ierakstu, tad atgriež 200 statusu, kas ir OK. UN atgriežam Json ar šo te atrasto tabulas elementu
        res.status(200).json(found);
    } else {
        res.sendStatus(404); //ja mums kaut kas nesanāk, tad atgriežam 404
    }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {  //post request sūtam uz '/'
    // get itemIds from data array
    let itemIds = data.map(item => item.id); //un izveidojam jaunu item id

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;  //paņemam visus item id un pievienojam viņiem vienu, piemēram: mums ir 200 ieraksti, tad nākamais būs 201.


    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender
    };  //šīs viss tiks ievadīts tajā jaunajā 201.numurā

    // push new item object to data array of items
    data.push(newItem);  //push pievieno jaunu elementu masīva beigās

    // return with status 201
    // 201 means Created. The request has been fulfilled and
    // has resulted in one or more new resources being created.
    res.status(201).json(newItem);
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    console.log(req);
    // get item object match by `id`
    // let found = data.find(function (item) {
    //     return item.id === parseInt(req.params.id);
    // });

    // check if item found
    // if (found) {
        let updated = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender
        };

        // find index of found object from array of data
        // let targetIndex = data.indexOf(5);

        // replace object from data list with `updated` object
        data.splice(5, 1, updated);  //splice aizvieto objektu

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    // } else {
    //     res.sendStatus(404);
    // }
});

// DELETE
// this api end-point delete an existing item object from
// array of data, match by `id` find item and then delete
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module.
module.exports = router;