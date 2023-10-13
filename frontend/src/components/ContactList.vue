<template>
  <div>
    <h1>Lista de Contactos</h1>
    <ul v-if="contacts.length > 0">
      <li v-for="contact in contacts" key="contact.id">
        {{ contact.name }} - {{ contact.phone }}
      </li>
    </ul>
    <p v-else>No hay contactos disponibles.</p>
    <p v-if="error">{{ error }}</p>
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
  h1 {
    color: #333;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  p {
    color: red;
  }
</style>