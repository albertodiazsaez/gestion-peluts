import { Client, Account, Role, Databases } from "appwrite";

const appwClient = new Client();
appwClient.setEndpoint("http://172.20.20.3:10001/v1").setProject("peluts-dev");

const appwAccount = new Account(appwClient);
const appwDatabase = new Databases(appwClient);


export { appwClient, appwAccount, appwDatabase };