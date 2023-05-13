import { db } from "../utils/db.server";
import { Service } from "@prisma/client";

type Appointment = {
    id: string
    firstName: string
    lastName: string
    visitDate: string
    email: string
    service: string
    notes: string
    userId: string
}

// Lista wszysktich wizyt
export const listAppointments = async (): Promise<Appointment[]> => {
    return db.appointment.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            visitDate: true,
            email: true,
            service: true,
            notes: true,
            userId: true
        }
    })

}

export const getAppointmentByID = async (id: string): Promise<Appointment | null> => {
    return db.appointment.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            visitDate: true,
            email: true,
            service: true,
            notes: true,
            userId: true
        }

    })
}

// Wizyta po ID użytkownika
export const getAppointmentByUserID = async (userId: string): Promise<Appointment[] | null> => {
    return db.appointment.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            visitDate: true,
            email: true,
            service: true,
            notes: true,
            userId: true
        }

    })
}

// Dodaj wizytę

export const createAppointment = async (user: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const { firstName, lastName, visitDate, email, service, notes, userId } = user
    return db.appointment.create({
        data: {
            firstName,
            lastName,
            email,
            visitDate,
            service: Service[service as keyof typeof Service],
            notes,
            userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            visitDate: true,
            email: true,
            service: true,
            notes: true,
            userId: true
        }
    })
}

// Aktualizuj wizytę
export const updateAppointment = async (user: Omit<Appointment, 'id'>, id: string): Promise<Appointment> => {
    const { firstName, lastName, visitDate, email, service, notes, userId } = user
    return db.appointment.update({
        where: {
            id,
        },
        data: {
            firstName,
            lastName,
            email,
            visitDate,
            service: Service[service as keyof typeof Service],
            notes,
            userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            visitDate: true,
            email: true,
            service: true,
            notes: true,
            userId: true
        }
    })
}

export const deleteAppointment = async (id: string): Promise<void> => {
    await db.appointment.delete({
        where: {
            id,
        }
    })

}