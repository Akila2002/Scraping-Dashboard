<template>
  <div class="dashboard">
    <h1>Website Scraper Dashboard</h1>
    <div class="input-container">
      <input v-model="url" type="text" placeholder="Enter URL" />
      <button @click="addUrl">Add URL</button>
    </div>
    <button @click="fetchScrapedData">Fetch Scraped Data</button>

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
</template>


<script>
import axios from 'axios';

export default {
  name: 'ScraperDashboard',
  data() {
    return {
      url: '',
      scrapedData: [],
      page: 1,
      perPage: 5,
      sortKey: '',
      sortOrder: 'asc'
    };
  },
  computed: {
    sortedData() {
      return [...this.scrapedData].sort((a, b) => {
        if (this.sortOrder === 'asc') {
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
    }
  },
  methods: {
    addUrl() {
      if (this.url) {
        axios.post('/api/scrape', { url: this.url })
          .then(response => {
            const extractedData = {
              id: response.data.id,
              url: response.data.url,
              title: response.data.title,
              description: response.data.description
            };
            this.scrapedData.push(extractedData);
            this.url = '';
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    fetchScrapedData() {
      axios.get('/api/scrapedData')
        .then(response => {
          this.scrapedData = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
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
    }
  },
  mounted() {
    this.fetchScrapedData();
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom:5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  cursor: pointer;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>

