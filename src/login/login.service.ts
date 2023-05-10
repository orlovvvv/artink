import { db } from "../utils/db.server";

type User = {
    email: string
    password: string
    token?: string
}