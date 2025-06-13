import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AppLayout from '../views/AppLayout.vue'; // Importa o novo layout
import CoursesView from '../views/CoursesView.vue'; // Importa a página de cursos
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rotas públicas
    { path: '/', name: 'home', component: LandingPage },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },

    // Rotas protegidas (dentro do layout do app)
    {
      path: '/app',
      component: AppLayout,
      meta: { requiresAuth: true }, // Protege o layout e todos os seus filhos
      children: [
        {
          path: '/courses', // A URL será apenas /courses
          name: 'courses',
          component: CoursesView,
        },
        // Adicione outras rotas protegidas aqui, como '/meus-cursos'
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
