<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Lista de Contactos</h1>
    
    <div v-if="contacts.length > 0" class="row">
      <div v-for="contact in contacts" :key="contact.id" class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ contact.name }}</h5>
            <p class="card-text">
              <i class="bi bi-telephone-fill"></i>
              {{ contact.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-muted">No hay contactos disponibles.</p>	
    <p v-if="error" class="text-center text-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/contacts");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de contactos.");
      }
      this.contacts = await response.json();
    } catch (error) {
      this.error = error.message;
    }
  },
};
</script>

<style>
</style>