<template>
  <nav
    class="pagination is-rounded is-centered mt-5 mb-4"
    role="navigation"
    aria-label="pagination"
  >
    <a
      v-if="actualPage !== 1"
      class="pagination-previous"
      @click="$emit('handlePages', 'PREVIOUS')"
      >Previous</a
    >
    <a
      v-if="actualPage !== totalPages"
      class="pagination-next"
      @click="$emit('handlePages', 'NEXT')"
      >Next page</a
    >
    <ul class="pagination-list">
      <template v-if="!pages.includes(1)">
        <a class="pagination-link" @click="$emit('handlePages', 1)">1</a>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
      </template>
      <li :key="i" v-for="(page, i) in pages">
        <a
          @click="$emit('handlePages', page)"
          :class="{ 'is-current': page === actualPage }"
          class="pagination-link"
          >{{ page }}</a
        >
      </li>
      <template v-if="!pages.includes(totalPages)">
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <a @click="$emit('handlePages', totalPages)" class="pagination-link">{{
          totalPages
        }}</a>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    actualPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pages: []
    }
  },
  created() {
    // No-reactive data
    this.maxPages = 18
    this.paginate()
  },
  beforeUpdate() {
    this.paginate()
  },
  methods: {
    paginate() {
      let startPage, endPage
      if (this.totalPages <= this.maxPages) {
        startPage = 1
        endPage = this.totalPages
      } else {
        let maxPagesBeforeActualPage = Math.floor(this.maxPages / 2)
        let maxPagesAfterActualPage = Math.ceil(this.maxPages / 2) - 1
        if (this.actualPage <= maxPagesBeforeActualPage) {
          startPage = 1
          endPage = this.maxPages
        } else if (
          this.actualPage + maxPagesAfterActualPage >=
          this.totalPages
        ) {
          startPage = this.totalPages - this.maxPages + 1
          endPage = this.totalPages
        } else {
          startPage = this.actualPage - maxPagesBeforeActualPage
          endPage = this.actualPage + maxPagesAfterActualPage
        }
      }
      this.pages = Object.freeze(
        Array.from({ length: endPage + 1 - startPage }, (v, i) => startPage + i)
      )
    }
  }
}
</script>
