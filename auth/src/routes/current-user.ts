/*
Router that checks if a user is currently logged in
takes a cookie
*/

import express from 'express'
import {currentUser} from '@srptickets/common'
const router = express.Router();


router.get('/api/users/currentuser',currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null })
})

export  {router as currentUserRouter } 