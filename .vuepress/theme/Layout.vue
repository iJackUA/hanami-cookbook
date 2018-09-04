<template>
    <Layout>
      <template slot="page-top">
         <h2>Custom header</h2>
      </template>

      <template slot="page-bottom">

         <h2>Sources: </h2>
          <div class="info-sources" v-for="source in $page.frontmatter.sources">
            <a :href="source">{{ source }}</a>
          </div>

         <h2>Related receipts</h2>

         
      </template>
    </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
export default {
  components: { Layout }
}
</script>
