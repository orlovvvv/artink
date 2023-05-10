import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AppointmentService from "./appointment.service"
import { getAppointmentByID } from './appointment.service';

export const appointmentRouter = express.Router();

// Lista wszystkich wizyt

appointmentRouter.get('/', async (request: Request, response: Response) => {
    try {
        const appoinments = await AppointmentService.listAppointments();
        return response.status(200).json(appoinments)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// Wizyta po ID
appointmentRouter.get('/:id', async (request: Request, response: Response) => {
    const id: string = request.body.id
    try {
        const appoinment = await AppointmentService.getAppointmentByID(id)
        if (appoinment) {
            return response.status(200).json(appoinment)
        }
        return response.status(404).json("User not found")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// Wizyty po ID uzytkownika
appointmentRouter.get('/user/:id', async (request: Request, response: Response) => {
    const id: string = request.body.id
    try {
        const appoinment = await AppointmentService.getAppointmentByUserID(id)
        if (appoinment) {
            return response.status(200).json(appoinment)
        }
        return response.status(404).json("User not found")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// Utwórz wizytę
appointmentRouter.post('/', body('firstName').isString(), body('lastName').isString(), body('email').isString(),
    body('visitDate').isDate(), body('notes').isString(), body('userId').isString(),
    async (request: Request, response: Response) => {
        request.body.visitDate = new Date(request.body.visitDate).toISOString().split('T')[0]
        const errors = validationResult(request)
        if (!errors.isEmpty) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const appoinment = request.body
            const newAppoinment = await AppointmentService.createAppointment(appoinment)
            return response.status(201).json(newAppoinment)
        } catch (error: any) {
            return response.status(500).json(error.message)
        }

    })

// Aktualizacja wizyty
appointmentRouter.put("/:id", body('firstName').isString(), body('lastName').isString(), body('email').isString(),
    body('visitDate').isDate(), body('notes').isString(), body('userId').isString(), async (request: Request, response: Response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty) {
            return response.status(400).json({ errors: errors.array() });
        }
        const id: string = request.headers.id as string
        try {
            const appoinment = request.body
            const updatedAppoinment = await AppointmentService.updateAppointment(appoinment, id);
            return response.status(200).json(updatedAppoinment)
        } catch (error: any) {
            return response.status(500).json(error.message)
        }

    })

// Usuń wizytę
appointmentRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: string = request.params.id
    try {
        await AppointmentService.deleteAppointment(id)
        return response.status(204).json("Appointment has been successfully deleted")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
}
)