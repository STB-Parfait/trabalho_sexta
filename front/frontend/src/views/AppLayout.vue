<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-container">
        <router-link to="/courses" class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <span>UniDev</span>
        </router-link>

        <nav class="app-nav">
          <router-link to="/courses">Cursos</router-link>
        </nav>

        <div class="user-menu">
          <!-- O 'user' agora virá apenas do login, não de um fetch posterior -->
          <span>Olá, {{ authStore.user?.name || 'Usuário' }}</span>
          <button @click="handleLogout" class="btn-logout">Sair</button>
        </div>
      </div>
    </header>
    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
}
.app-header {
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0056b3;
  text-decoration: none;
}
.app-nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-color 0.3s ease;
}
.app-nav a:hover, .app-nav a.router-link-exact-active {
  color: #0056b3;
  border-bottom-color: #0056b3;
}
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-menu span {
  font-weight: 500;
  color: #343a40;
}
.btn-logout {
  background: #f1f3f5;
  border: 1px solid transparent;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-logout:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}
.app-content {
  flex-grow: 1;
}
</style>
