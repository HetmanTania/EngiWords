import { Client, Databases, Account } from "appwrite";
import {APPWRITE_BASE_URL, APPWRITE_PROJECT_NAME} from "~/utils/constants.js";
import { ID } from "appwrite";


const client = new Client();
client
    .setEndpoint(APPWRITE_BASE_URL)
    .setProject(APPWRITE_PROJECT_NAME);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };