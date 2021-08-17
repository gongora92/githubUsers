<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th></th>
        <th>Login</th>
        <th>User Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="is-flex is-justify-content-center">
          <figure class="image is-64x64">
            <img :src="user.avatar_url" alt="Placeholder image" />
          </figure>
        </td>
        <td>{{ user.login }}</td>
        <td>{{ user.type }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'Table',
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>
