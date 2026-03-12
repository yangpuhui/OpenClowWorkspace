<template>
  <div id="app">
    <header class="header">
      <div class="container header-content">
        <h1 class="logo">🚀 AutoDoc</h1>
        <p class="subtitle">API Documentation Generator</p>
      </div>
    </header>

    <main class="container">
      <div class="controls">
        <input
          v-model="searchQuery"
          placeholder="🔍 Search API endpoints..."
          class="search-input"
        />
        <button @click="fetchDocs" class="btn btn-primary refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div v-if="loading" class="loading">
        <p>Loading documentation...</p>
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else>
        <div v-if="filteredEndpoints.length === 0" class="no-results">
          <p>No endpoints found matching "{{ searchQuery }}"</p>
        </div>

        <div v-else class="endpoints-list">
          <div
            v-for="endpoint in filteredEndpoints"
            :key="endpoint.path"
            class="card endpoint-card"
          >
            <div class="endpoint-header" @click="toggleEndpoint(endpoint)">
              <div class="endpoint-info">
                <span :class="['method', `method-${endpoint.method.toLowerCase()}`]">
                  {{ endpoint.method }}
                </span>
                <span class="path">{{ endpoint.path }}</span>
              </div>
              <span class="toggle-icon">
                {{ endpoint.expanded ? '▼' : '▶' }}
              </span>
            </div>

            <div v-if="endpoint.expanded" class="endpoint-details">
              <div class="detail-section">
                <h3>Description</h3>
                <p>{{ endpoint.description || 'No description available' }}</p>
              </div>

              <div class="detail-section" v-if="endpoint.parameters && endpoint.parameters.length">
                <h3>Parameters</h3>
                <table class="params-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="param in endpoint.parameters" :key="param.name">
                      <td><code>{{ param.name }}</code></td>
                      <td>{{ param.type }}</td>
                      <td>{{ param.required ? 'Yes' : 'No' }}</td>
                      <td>{{ param.description || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="detail-section" v-if="endpoint.responses">
                <h3>Responses</h3>
                <div v-for="(response, status) in endpoint.responses" :key="status" class="response-item">
                  <span class="status-badge" :class="getStatusClass(status)">
                    {{ status }}
                  </span>
                  <pre><code>{{ response.description || JSON.stringify(response, null, 2) }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>Built with ❤️ by CodeProdigy</p>
        <p>
          <a href="https://github.com/yangpuhui/AutoDoc" target="_blank">
            ⭐ Star on GitHub
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const docs = ref([])
    const loading = ref(false)
    const error = ref('')
    const searchQuery = ref('')

    const filteredEndpoints = computed(() => {
      if (!searchQuery.value.trim()) {
        return docs.value.map(ep => ({ ...ep, expanded: false }))
      }

      const query = searchQuery.value.toLowerCase()
      return docs.value
        .filter(ep =>
          ep.path.toLowerCase().includes(query) ||
          ep.description?.toLowerCase().includes(query)
        )
        .map(ep => ({ ...ep, expanded: false }))
    })

    const fetchDocs = async () => {
      loading.value = true
      error.value = ''

      try {
        const response = await axios.get('/api/docs')
        docs.value = response.data.endpoints || []
      } catch (err) {
        error.value = 'Failed to fetch documentation. Please make sure the backend server is running.'
        console.error('Error fetching docs:', err)
      } finally {
        loading.value = false
      }
    }

    const toggleEndpoint = (endpoint) => {
      endpoint.expanded = !endpoint.expanded
    }

    const getStatusClass = (status) => {
      const statusNum = parseInt(status)
      if (statusNum >= 200 && statusNum < 300) return 'status-success'
      if (statusNum >= 300 && statusNum < 400) return 'status-redirect'
      if (statusNum >= 400 && statusNum < 500) return 'status-client-error'
      if (statusNum >= 500) return 'status-server-error'
      return ''
    }

    onMounted(() => {
      fetchDocs()
    })

    return {
      docs,
      loading,
      error,
      searchQuery,
      filteredEndpoints,
      fetchDocs,
      toggleEndpoint,
      getStatusClass
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  text-align: center;
}

.logo {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
}

.controls {
  display: flex;
  gap: 12px;
  margin: 30px 0;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 14px 18px;
  font-size: 16px;
}

.refresh-btn {
  padding: 14px 24px;
  font-size: 16px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  font-size: 18px;
}

.endpoints-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.endpoint-card {
  transition: all 0.2s;
}

.endpoint-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.endpoint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
}

.endpoint-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.path {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 15px;
  font-weight: 500;
}

.toggle-icon {
  color: var(--text-secondary);
  font-size: 12px;
}

.endpoint-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h3 {
  font-size: 14px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
}

.params-table th,
.params-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.params-table th {
  background: #f8fafc;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
}

.params-table tr:last-child td {
  border-bottom: none;
}

.response-item {
  margin-bottom: 12px;
}

.response-item:last-child {
  margin-bottom: 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
}

.status-success {
  background: #dcfce7;
  color: #166534;
}

.status-redirect {
  background: #fef9c3;
  color: #854d0e;
}

.status-client-error {
  background: #fee2e2;
  color: #991b1b;
}

.status-server-error {
  background: #fee2e2;
  color: #991b1b;
}

.response-item pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}

.footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 60px;
  color: var(--text-secondary);
}

.footer a {
  color: var(--primary);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
