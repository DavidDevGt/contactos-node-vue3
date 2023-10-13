<template>
  <div>
    <h1>Lista de Contactos</h1>
    <ul>
      <li v-for="contact in contacts" key="contact.id">
        {{ contact.name }} - {{ contact.phone }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: []
    };
  },
  async mounted() {
    const response = await fetch("http://localhost:3000/contacts");
    this.contacts = await response.json();
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