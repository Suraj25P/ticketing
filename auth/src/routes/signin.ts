/*
Router that handles signIN of users
takes email and password
--uses express-validator middleware to validate password and email
*/

import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {Password} from '../services/password'
import { User } from '../models/user'
//helper function(middleware) to validate requests and throw errors
import { validateRequest ,BadRequestError} from '@srptickets/common'
import jwt from 'jsonwebtoken'
const router = express.Router();


router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be vaild'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('password is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        //check if email exists
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        //check if passwords match ...compare helper function from services/Password
        const passwordsMatch = await Password.compare(existingUser.password, password)
        if (!passwordsMatch)
            throw new BadRequestError('Invalid credentials');
        //send cookie for a successful login
        // generate json token 
        const userJwt = jwt.sign({
            id: existingUser.id,
            email:existingUser.email
        }, process.env.JWT_KEY!)
        
        //store jwt on session object
        req.session = {
            jwt:userJwt
        }

        res.status(200).send(existingUser)
    }
)

export  {router as signinRouter } 