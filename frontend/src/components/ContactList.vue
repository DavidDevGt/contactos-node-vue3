<template>
  <div :class="isDarkMode ? 'dark-mode' : ''">
    <button
      id="dark-mode-btn"
      class="btn-toggle-mode rounded"
      :class="isDarkMode ? 'dark-mode-btn' : ''"
      @click="toggleDarkMode"
    >
      Cambiar a Modo {{ isDarkMode ? 'Claro' : 'Oscuro' }}
    </button>


    <div
      v-if="loading"
      class="overlay"
    >
      <div class="loader" />
    </div>

    
    
    <div
      v-else
      class="container py-5"
    >
      <h1 class="text-center mb-4">
        Lista de Contactos
      </h1>
      
      <div
        v-if="contacts.length > 0"
        class="row"
      >
        <div
          v-for="contact in contacts"
          :key="contact.id" 
          class="col-md-3 mb-4 animate__animated animate__fadeIn"
        >
          <div class="card animate__animated animate__hover:animate__pulse">
            <div class="card-body">
              <h5 class="card-title">
                {{ contact.name }}
              </h5>
              <p class="card-text">
                <i class="bi bi-telephone-fill" />
                {{ contact.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p
        v-else 
        class="text-center text-muted"
      >
        No hay contactos disponibles.
      </p>
      <p 
        v-if="error" 
        class="text-center text-danger"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      contacts: [],
      error: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['isDarkMode']),
  },
  watch: {
    isDarkMode(newValue) {
      if (newValue) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    },
  },
  mounted() {
    this.fetchContacts();

    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }
  },
  methods: {
    ...mapActions(['toggleDarkMode']),
    async fetchContacts() {
      try {
        const response = await fetch("http://localhost:3000/contacts");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de contactos.");
        }
        this.contacts = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.dark-mode .card {
  background-color: #444;
  color: #eee;
}
</style>