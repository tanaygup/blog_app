import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAcc = await this.account.create(ID.unique(), email, password);

      if (userAcc) {
        // call another method => lage haath signin bhi krva do
        return this.login({ email, password });
      } else return userAcc;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    // eslint-disable-next-line no-unreachable
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();

export default authService;
