<template>
  <ContactList />
  <ExportContacts :contacts="contacts" />
</template>

<script>
import ContactList from './components/ContactList.vue';
import ExportContacts from './components/ExportContacts.vue';

export default {
  components: {
    ContactList,
    ExportContacts,
  },
  data() {
    return {
      contacts: [],
      error: null,
    };
  },
  methods: {
    async fetchContacts() {
      try {
        const response = await fetch('http://localhost:3000/contacts');
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        this.contacts = await response.json();
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
  },
  mounted() {
    this.fetchContacts();
  },
};
</script>
