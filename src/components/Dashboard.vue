<template>
  <div class="dashboard">
    <h1>Website Scraper Dashboard</h1>
    <div class="input-container">
      <input v-model="url" type="text" placeholder="Enter URL" />
      <button @click="addUrl">Add URL</button>
    </div>
    <button @click="fetchScrapedData">Fetch Scraped Data</button>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th scope="col" @click="sort('url')">URL</th>
            <th scope="col" @click="sort('title')">Title</th>
            <th scope="col" @click="sort('description')">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.url }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "ScraperDashboard",
  data() {
    return {
      url: "",
      scrapedData: [],
      page: 1,
      perPage: 5,
      sortKey: "",
      sortOrder: "asc",
    };
  },
  computed: {
    sortedData() {
      return [...this.scrapedData].sort((a, b) => {
        if (this.sortOrder === "asc") {
          return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        } else {
          return a[this.sortKey] < b[this.sortKey] ? 1 : -1;
        }
      });
    },
    paginatedData() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.scrapedData.length / this.perPage);
    },
  },
  methods: {
    addUrl() {
      if (this.url) {
        axios
          .post("/api/scrape", { url: this.url })
          .then((response) => {
            const extractedData = {
              id: response.data.id,
              url: response.data.url,
              title: response.data.title,
              description: response.data.description,
            };
            this.scrapedData.push(extractedData);
            this.url = "";
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    fetchScrapedData() {
      axios
        .get("/api/scrapedData")
        .then((response) => {
          this.scrapedData = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },
  },
  mounted() {
    this.fetchScrapedData();
  },
};
</script>

<style scoped>
/* Scoped styles for the Dashboard component */
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  margin-right: 15px;
  font-size: 1em;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.table-container {
  margin-top: 20px; /* Add space between the button and the table */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px; /* Space between table and other elements */
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
}

th:hover {
  background-color: #e9ecef;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  margin-top: 20px; /* Add space above pagination controls */
}

.pagination button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
}

.pagination button:disabled {
  background-color: #ddd;
}

.pagination span {
  margin: 0 15px;
  color: #333;
}
</style>