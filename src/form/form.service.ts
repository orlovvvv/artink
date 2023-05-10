import { db } from "../utils/db.server";

type Form = {
    id: string
    email: string
    name: string
    content: string
}

// Lista wszysktich formularzy
export const listForms = async (): Promise<Form[]> => {
    const users = db.form.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            content: true
        }
    })
    return users;
}
// Formularz po ID
export const getForm = async (id: string): Promise<Form | null> => {
    const user = db.form.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            email: true,
            name: true,
            content: true
        }

    })
    return user
}

// Dodaj formularz

export const createForm = async (form: Omit<Form, 'id'>): Promise<Form> => {
    const { email, name, content } = form
    return db.form.create({
        data: {
            email,
            name,
            content
        },
        select: {
            id: true,
            email: true,
            name: true,
            content: true
        }
    })
}


export const deleteForm = async (id: string): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        }
    })

}