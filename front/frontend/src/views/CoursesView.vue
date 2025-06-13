<template>
  <div class="courses-page">
    <div class="page-header">
      <h1>Nossos Cursos</h1>
      <p>Escolha um curso e comece sua jornada de aprendizado hoje mesmo.</p>
    </div>

    <div v-if="loading" class="status-message">Carregando cursos...</div>
    <div v-else-if="error" class="status-message error">{{ error }}</div>

    <div v-else class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card-detailed">
        <div class="card-header">
          <div class="card-icon-detailed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          </div>
          <span class="course-duration">{{ course.duration }}</span>
        </div>
        <div class="card-content">
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
        </div>
        <div class="card-footer">
          <button @click="handleEnrollment(course.id)" :disabled="enrollmentStatus[course.id]" class="btn-enroll">
            <span v-if="enrollmentStatus[course.id] === 'loading'">Matriculando...</span>
            <span v-else-if="enrollmentStatus[course.id] === 'success'">Matriculado ✓</span>
            <span v-else>Matricular-se</span>
          </button>
          <div v-if="enrollmentStatus[course.id] === 'error'" class="enroll-error">
            Erro ao matricular.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const loading = ref(true);
const error = ref(null);
const enrollmentStatus = ref({}); // Objeto para controlar o estado de cada botão

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/courses');
    courses.value = response.data;
  } catch (err) {
    error.value = 'Não foi possível carregar os cursos.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const handleEnrollment = async (courseId) => {
  // Define o estado inicial para este curso específico
  enrollmentStatus.value[courseId] = 'loading';
  try {
    // A store de autenticação já deve ter configurado o token globalmente
    await axios.post(`http://localhost:3000/courses/${courseId}/enroll`);
    enrollmentStatus.value[courseId] = 'success';
  } catch (err) {
    enrollmentStatus.value[courseId] = 'error';
    console.error('Erro na matrícula:', err);
    // Remove o estado de erro após alguns segundos para permitir nova tentativa
    setTimeout(() => {
      enrollmentStatus.value[courseId] = false;
    }, 3000);
  }
};
</script>

<style scoped>
.courses-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  margin-bottom: 2.5rem;
  text-align: center;
}
.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
}
.page-header p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-top: 0.5rem;
}
.status-message {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: #6c757d;
}
.status-message.error {
  color: #dc3545;
}
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
.course-card-detailed {
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.course-card-detailed:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}
.card-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}
.card-icon-detailed {
  color: #0056b3;
}
.course-duration {
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #e7f1ff;
  color: #0056b3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}
.card-content {
  padding: 1.5rem;
  flex-grow: 1;
}
.card-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #212529;
}
.card-content p {
  color: #6c757d;
  line-height: 1.6;
}
.card-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
}
.btn-enroll {
  width: 100%;
  padding: 0.75rem;
  background-color: #0056b3;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
}
.btn-enroll:hover:not(:disabled) {
  background-color: #004494;
}
.btn-enroll:disabled {
  background-color: #28a745;
  cursor: default;
}
.enroll-error {
  color: #dc3545;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
