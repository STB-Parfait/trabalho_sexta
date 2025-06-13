<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-form">
        <router-link to="/" class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <span>UniDev</span>
        </router-link>
        <h2>Acesse sua conta</h2>
        <p>Bem-vindo de volta! Insira seus dados para continuar.</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com" required>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" placeholder="••••••••" required>
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="switch-link">
          Não tem uma conta? <router-link to="/register">Cadastre-se</router-link>
        </div>
      </div>
      <div class="auth-artwork" style="background-image: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  error.value = null;
  loading.value = true;
  try {
    await authStore.login({ email: email.value, password: password.value });
    // A linha chave: redireciona para a página de cursos após o login
    router.push('/courses');
  } catch (err) {
    error.value = err.message || 'Falha no login. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Importa os estilos compartilhados das páginas de autenticação */
@import '../assets/auth-styles.css';
</style>
