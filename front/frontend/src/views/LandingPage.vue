<template>
  <div class="landing-page">
    <!-- Cabeçalho e Navegação -->
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <span>UniDev</span>
        </div>
        <nav class="main-nav">
          <a href="#">Cursos</a>
          <a href="#">Sobre Nós</a>
          <a href="#">Contato</a>
        </nav>
        <div class="auth-buttons">
          <router-link to="/login" class="btn-login">Login</router-link>
          <router-link to="/register" class="btn-signup">Cadastre-se</router-link>
        </div>
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </header>

    <!-- Navegação Mobile -->
    <div class="mobile-nav" :class="{ 'is-open': mobileMenuOpen }">
      <a href="#">Cursos</a>
      <a href="#">Sobre Nós</a>
      <a href="#">Contato</a>
      <div class="mobile-auth-buttons">
        <router-link to="/login" class="btn-login">Login</router-link>
        <router-link to="/register" class="btn-signup">Cadastre-se</router-link>
      </div>
    </div>

    <!-- Seção Principal (Hero) -->
    <main class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1>Transforme seu futuro com a educação.</h1>
        <p>Cursos de tecnologia e inovação pensados para o mercado de trabalho.</p>
        <button class="btn-cta">Explore Nossos Cursos</button>
      </div>
    </main>

    <!-- Seção de Cursos -->
    <section class="courses-section">
      <div class="container">
        <h2>Conheça nossos cursos</h2>

        <div v-if="loading" class="loading-message">Carregando cursos...</div>
        <div v-else-if="courses.length === 0" class="no-courses-message">
          Nenhum curso disponível no momento.
        </div>

        <div v-else class="courses-carousel-wrapper">
          <button v-if="isScrollable" @click="scrollLeft" class="carousel-btn prev-btn" aria-label="Curso anterior">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <div class="courses-carousel" ref="carouselContainer">
            <div class="course-card" v-for="course in courses" :key="course.id">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              </div>
              <h3>{{ course.name }}</h3>
              <p>{{ course.description }}</p>
              <button class="btn-card">Saiba Mais</button>
            </div>
          </div>

          <button v-if="isScrollable" @click="scrollRight" class="carousel-btn next-btn" aria-label="Próximo curso">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Rodapé -->
    <footer class="main-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} UniDev. Todos os direitos reservados.</p>
        <div class="footer-links">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import axios from 'axios';

const courses = ref([]);
const mobileMenuOpen = ref(false);
const loading = ref(true);

const carouselContainer = ref(null);
const isScrollable = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const checkScrollable = () => {
  if (carouselContainer.value) {
    isScrollable.value = carouselContainer.value.scrollWidth > carouselContainer.value.clientWidth;
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/courses');
    courses.value = response.data;
    await nextTick();
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
  } catch (error) {
    console.error('Erro ao buscar os cursos:', error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollable);
});

const scrollLeft = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({ left: -344, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (carouselContainer.value) {
    carouselContainer.value.scrollBy({ left: 344, behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Estilos Gerais */
.landing-page {
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.main-header {
  background-color: #fff;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0056b3;
}

.main-nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  transition: color 0.3s ease;
}

.main-nav a:hover {
  color: #0056b3;
}

.auth-buttons .btn-login, .auth-buttons .btn-signup {
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background-color: transparent;
  color: #0056b3;
}

.btn-signup {
  background-color: #0056b3;
  color: #fff;
  margin-left: 0.5rem;
}

.btn-signup:hover {
  background-color: #004494;
}

/* Estilo para router-link se comportar como botão */
.btn-login, .btn-signup {
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 42, 85, 0.7);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  max-width: 800px;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 2rem;
  font-weight: 300;
}

.btn-cta {
  background-color: #fff;
  color: #0056b3;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

/* Courses Section */
.courses-section {
  padding: 5rem 0;
  background-color: #fff;
}

.courses-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #212529;
}

.loading-message, .no-courses-message {
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
  padding: 3rem 0;
}

.courses-carousel-wrapper {
  position: relative;
}

.courses-carousel-wrapper::before,
.courses-carousel-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}
.courses-carousel-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #fff, rgba(255,255,255,0));
}
.courses-carousel-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #fff, rgba(255,255,255,0));
}

.courses-carousel {
  display: flex;
  gap: 1.5rem; /* 24px */
  padding: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.courses-carousel::-webkit-scrollbar {
  display: none;
}

.course-card {
  flex: 0 0 320px;
  scroll-snap-align: start;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border-color: #dee2e6;
}

.card-icon {
  background-color: #e7f1ff;
  color: #0056b3;
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  display: inline-flex;
}

.course-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #212529;
}

.course-card p {
  font-size: 0.95rem;
  color: #6c757d;
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.btn-card {
  background-color: #0056b3;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-card:hover {
  background-color: #004494;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.carousel-btn:hover {
  background-color: #f8f9fa;
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 0.5rem;
}

.next-btn {
  right: 0.5rem;
}

/* Footer */
.main-footer {
  background-color: #212529;
  color: #adb5bd;
  padding: 2rem 0;
}

.main-footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a {
  color: #adb5bd;
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #fff;
}

/* Responsividade */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}
.mobile-nav {
  display: none;
}

@media (max-width: 992px) {
  .main-nav, .auth-buttons {
    display: none;
  }
  .mobile-menu-toggle {
    display: block;
  }
  .mobile-nav {
    display: none;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
  }
  .mobile-nav.is-open {
    display: flex;
  }
  .mobile-nav a {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #f8f9fa;
    color: #495057;
    text-decoration: none;
  }
  .mobile-auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
  .mobile-auth-buttons .btn-login, .mobile-auth-buttons .btn-signup {
    width: 100%;
    margin: 0;
    padding: 0.8rem 1.2rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }
  .hero-content p {
    font-size: 1.1rem;
  }
  .main-footer .container {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
}
</style>
