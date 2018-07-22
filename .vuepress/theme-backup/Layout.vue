<template>
    <Layout>
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
import Layout from 'vuepress/lib/default-theme/Layout'
export default {
  components: { Layout }
}
</script>
