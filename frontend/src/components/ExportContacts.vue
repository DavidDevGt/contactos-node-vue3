<template>
  <div class="position-fixed bottom-0 end-0 p-3">
    <div
      class="btn-group"
      role="group"
    >
      <button
        class="btn btn-success"
        type="button"
        @click="exportData('csv')"
      >
        <i class="bi bi-file-earmark-text" /> CSV
      </button>
      <button
        class="btn btn-warning"
        type="button"
        @click="exportData('json')"
      >
        <i class="bi bi-file-earmark-binary" /> JSON
      </button>
      <button
        class="btn btn-danger"
        type="button"
        @click="exportData('pdf')"
      >
        <i class="bi bi-file-earmark-pdf" /> PDF
      </button>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default {
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    exportData(type) {
      switch (type) {
        case "csv":
          this.exportCSV();
          break;
        case "json":
          this.exportJSON();
          break;
        case "pdf":
          this.exportPDF();
          break;
      }
    },
    exportCSV() {
      const csv = Papa.unparse(this.contacts);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "contacts.csv");
    },
    exportJSON() {
      const json = JSON.stringify(this.contacts);
      const blob = new Blob([json], { type: "application/json" });
      saveAs(blob, "contacts.json");
    },
    exportPDF() {
      const doc = new jsPDF();
      doc.autoTable({
        head: [["Nombre", "Teléfono"]],
        body: this.contacts.map((contact) => [
          contact.name,
          contact.phone,
        ]),
      });
      doc.save("contacts.pdf");
    },
  },
};
</script>

<style scoped>
    .btn i {
        margin-right: 0.5rem;
    }
</style>