<template>
  <div class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">Lana Code Challenge</p>
        <div class="container">
          <div class="field has-addons">
            <div class="control is-expanded has-icons-left">
              <input
                v-model="userName"
                class="input is-rounded"
                type="text"
                placeholder="Find a Github user"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <div class="control">
              <a @click="searchUsers(true)" class="button is-info is-rounded">
                Search
              </a>
            </div>
          </div>
          <div class="columns mt-1 mb-1">
            <div class="column">
              <label>Results per page</label>
              <div class="control">
                <label
                  v-for="option in paginationOptions"
                  :key="option"
                  class="radio"
                >
                  <input
                    type="radio"
                    :id="option"
                    :value="option"
                    v-model="perPage"
                  />
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="column">
              <div class="select is-rounded">
                <select v-model="sort">
                  <option disabled>Sort options</option>
                  <option
                    v-for="(option, i) in sortOptions"
                    :key="i"
                    :value="i"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <label>How do you want to visualize the data?</label>
          <div class="control">
            <label v-for="view in views" :key="view" class="radio">
              <input
                type="radio"
                :id="view"
                :value="view"
                v-model="selectedView"
              />
              {{ view }}
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="container mt-5">
    <progress v-if="loading" class="progress is-small is-primary" max="100">
      15%
    </progress>
    <div v-if="error !== ''" class="notification is-danger">
      {{ error }}
    </div>
    <template v-else-if="users.length > 0">
      <h1 class="has-text-left">Total results: {{ totalCount }}</h1>
      <!-- I made a mistake here, I did not see that the data had to be displayed in columns and I displayed it in cards. I decided to leave it like this -->
      <template v-if="selectedView === views[0]">
        <user-card v-for="user in users" :key="user.id" :user="user" />
      </template>
      <Table v-else :users="users" />
    </template>
    <pagination
      v-if="totalPages > 1"
      :actual-page="page"
      :total-pages="totalPages"
      @handle-pages="handlePages"
    />
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import UserCard from './UserCard.vue'
import Table from './Table.vue'

export default {
  name: 'Lana',
  data() {
    return {
      userName: '',
      page: 1,
      totalCount: 0,
      perPage: 9,
      loading: false,
      error: '',
      users: [],
      sort: 0,
      selectedView: 'Cards'
    }
  },
  components: {
    Pagination,
    Table,
    UserCard
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage)
    }
  },
  created() {
    // No-reactive data
    this.paginationOptions = [9, 18, 27]
    this.sortOptions = [
      {
        name: 'Best match',
        q: ''
      },
      {
        name: 'Most followers',
        q: '&sort=followers'
      },
      {
        name: 'Fewest followers',
        q: '&sort=followers&sort=asc'
      },
      {
        name: 'Most recently joined',
        q: '&sort=joined'
      },
      {
        name: 'Least recently joined',
        q: '&sort=joined&sort=asc'
      },
      {
        name: 'Most repositories',
        q: '&sort=repositories'
      },
      {
        name: 'Fewest repositories',
        q: '&sort=repositories&sort=asc'
      }
    ]
    this.views = ['Cards', 'Table']
  },
  watch: {
    perPage() {
      if (this.userName !== '') {
        this.searchUsers(true)
      }
    },
    sort() {
      if (this.userName !== '') {
        this.searchUsers(true)
      }
    }
  },
  methods: {
    async searchUsers(restart = false) {
      if (this.userName === '') return
      this.loading = true
      if (restart) this.page = 1
      try {
        this.error = ''
        const { data: { total_count } = 0, data: { items } = [] } =
          await this.$axios.get(
            this.$API.searchUsers(
              this.userName,
              this.page,
              this.perPage,
              this.sortOptions[this.sort].q
            )
          )
        this.users = items
        this.totalCount = total_count
      } catch (e) {
        this.error = e.response?.data?.message || 'Something went wrong'
        this.totalCount = 0
      } finally {
        this.loading = false
        window.scrollTo(0, 0)
      }
    },
    handlePages(action) {
      switch (action) {
        case 'PREVIOUS':
          this.page--
          break
        case 'NEXT':
          this.page++
          break
        default:
          this.page = action
      }
      this.searchUsers()
    }
  }
}
</script>
