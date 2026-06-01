import { User } from "../models/user";
import { store } from "../store/store";
import { setUser } from "../store/userSlice";

class SecurityService extends EventTarget {
  keySession: string;
  API_URL: string;
  user: User;

  constructor() {
    super();
    this.keySession = 'session';
    this.API_URL = import.meta.env.VITE_API_URL || "";
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.user = {}
    }
  }

  async login(user: User) {
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Credenciales incorrectas');
      }

      const json = await response.json();
      const userData = {
        ...json.data.user,
        token: json.data.access_token,
      }

      localStorage.setItem("user", JSON.stringify(userData));
      store.dispatch(setUser(userData));
      return userData;
    } catch (error) {
      console.error('Error durante login:', error);
      throw error;
    }
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = {};
    localStorage.removeItem("user");
    this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
  }

  isAuthenticated() {
    return localStorage.getItem("user") !== null;
  }

  getToken() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).token : null;
  }
}

export default new SecurityService();