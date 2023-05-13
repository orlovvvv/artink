import { db } from "../utils/db.server";
import { Role } from "@prisma/client";

type User = {
    id: string
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    role?: string
    token?: string
}

// Lista wszysktich użytkowników
export const listUsers = async (): Promise<User[]> => {
    const users = db.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false,
            role: true
        }
    })
    return users;
}
// Użytkownik po ID
export const getUser = async (id: string): Promise<User | null> => {
    const user = db.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false,
            role: true,
            token: false
        }

    })
    return user
}

// Zaloguj użytkownika

export const loginUser = async (email: string, password: string): Promise<User> => {
    return db.user.findFirstOrThrow({
        where: {
            email,
            password
        },
        select: {
            id: true,
            firstName: false,
            lastName: false,
            email: false,
            password: false,
            role: false,
            token: true
        }
    })
}

export const updateToken = async (id: string, email: string, token: string): Promise<User> => {
    return db.user.update({
        where: {
            id,
            email
        },
        data: {
            token: token
        }
    })
}

// Dodaj użytkownika

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const { firstName, lastName, email, password, role, token } = user
    return db.user.create({
        data: {
            firstName: firstName!,
            lastName: lastName!,
            email: email!,
            password: password!,
            role: Role[role as keyof typeof Role],
            token: token as string
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false,
            role: true
        }
    })
}

export const updateUser = async (user: Omit<User, 'id'>, id: string): Promise<User> => {
    const { firstName, lastName, email, password, role } = user
    return db.user.update({
        where: {
            id,
        },
        data: {
            firstName: firstName!,
            lastName: lastName!,
            email: email!,
            password: password!,
            role: Role[role as keyof typeof Role],
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false,
            role: true,
            token: false
        }
    })
}

export const deleteUser = async (id: string): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        }
    })

}