import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Tenta pegar o token do localStorage ao iniciar
    token: localStorage.getItem('token') || null,
    // Os dados do usuário serão preenchidos após o login
    user: null,
  }),
  getters: {
    // Getter para verificar facilmente se o usuário está autenticado
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', credentials);
        const { token, user } = response.data;

        // Atualiza o estado da store
        this.token = token;
        this.user = user;

        // Salva o token no localStorage para persistir a sessão
        localStorage.setItem('token', token);
        // Configura o cabeçalho de autorização para todas as futuras requisições do axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      } catch (error) {
        // Se o login falhar, garante que o estado local seja limpo
        this.logout();
        // Lança o erro para que o componente de login possa exibi-lo
        throw new Error(error.response?.data?.error || 'Falha no login');
      }
    },
    logout() {
      // Limpa o estado da store
      this.token = null;
      this.user = null;
      // Remove o token do localStorage
      localStorage.removeItem('token');
      // Remove o cabeçalho de autorização do axios
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
