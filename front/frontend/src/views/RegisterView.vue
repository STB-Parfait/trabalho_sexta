<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-form">
        <router-link to="/" class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <span>UniDev</span>
        </router-link>
        <h2>Crie sua conta</h2>
        <p>Comece sua jornada de aprendizado conosco.</p>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nome completo</label>
            <input type="text" id="name" v-model="name" placeholder="Seu nome" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com" required>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" placeholder="Pelo menos 6 caracteres" required>
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="success" class="success-message">{{ success }}</div>

          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </form>

        <div class="switch-link">
          Já tem uma conta? <router-link to="/login">Faça o login</router-link>
        </div>
      </div>
      <div class="auth-artwork" style="background-image: url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);
const success = ref(null);
const loading = ref(false);

const router = useRouter();

const handleRegister = async () => {
  error.value = null;
  success.value = null;
  loading.value = true;
  try {
    await axios.post('http://localhost:3000/users', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: 'student' // Garante que o usuário seja sempre um estudante
    });
    success.value = "Conta criada com sucesso! Redirecionando para o login...";
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    error.value = err.response?.data?.error || 'Não foi possível criar a conta.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import '../assets/auth-styles.css';
</style>
