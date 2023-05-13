import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as FormService from "./form.service"

export const formRouter = express.Router();

// Lista wszystkich formularzy
formRouter.get('/', async (request: Request, response: Response) => {
    try {
        const form = await FormService.listForms();
        return response.status(200).json(form)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// Formularz po ID
formRouter.get('/:id', async (request: Request, response: Response) => {
    const id: string = request.body.id as string
    try {
        const form = await FormService.getForm(id)
        if (form) {
            return response.status(200).json(form)
        }
        return response.status(404).json("User not found")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// Utwórz formularz
formRouter.post('/', body('name').isString(), body('email').isString(), body('string').isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const form = request.body
        const newForm = await FormService.createForm(form)
        return response.status(201).json(newForm)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

})


// Usunięcie formularza
formRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: string = request.body.id as string
    try {
        await FormService.deleteForm(id)
        return response.status(204).json("Form has been successfully deleted")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
}
)