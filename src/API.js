const BASE = 'https://api.github.com/'

export default {
  searchUsers: (user, page, perPage, sort) =>
    `${BASE}search/users?q=${user}&page=${page}&per_page=${perPage}${sort}`
}
