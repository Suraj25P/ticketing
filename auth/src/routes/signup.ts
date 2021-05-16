/*
Router that handles signUP of users
takes email and password
--uses express-validator middleware to validate password and email
*/

import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import {User} from '../models/user'
import { BadRequestError,validateRequest } from '@srptickets/common'
//helper function(middleware) to validate requests and throw errors
const router = express.Router();



router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be vaild'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('password must be between 4-20 chars')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        //check if email exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }
        //create new user using build function (models/user.ts)
        const user = User.build({ email, password })
        await user.save()

        // generate json token 
        const userJwt = jwt.sign({
            id: user.id,
            email:user.email
        }, process.env.JWT_KEY!)
        
        //store jwt on session object
        req.session = {
            jwt:userJwt
        }

        res.status(201).send(user)


})

export  {router as signupRouter } 