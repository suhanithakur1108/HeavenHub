const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')

const listingController = require('../controllers/listing.js');
const multer  = require('multer');
const {storage}=require('../cloudConfig.js');

const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        upload.single("listing[image][url]"),
        wrapAsync(listingController.createListing)
    );
// New route

router.get('/new', isLoggedIn,
     wrapAsync(listingController.renderNewForm));

router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image][url]"),
        validateListing
        , wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing));

// EDIT ROUTE

router.get('/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;
