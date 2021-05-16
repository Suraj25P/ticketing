/*
Router that checks if a user is currently logged in
takes a cookie
-- sends a header to browser and tells it to dump all the cookies
*/

import express from 'express'
const router = express.Router();


router.post('/api/users/signout', (req, res) => {
    req.session = null
    res.send({})
})

export  {router as signoutRouter } 