<template>
  <ParentLayout>
      <div class="sources page-nav" slot="page-bottom"
      v-if="$page.frontmatter.sources && $page.frontmatter.sources.length > 0">
        <h3>Sources:</h3>
        <ul>
          <li v-for="source in $page.frontmatter.sources">
            <a :href="source">{{ source }}</a>
          </li>
        </ul>

      <!-- <h2>Related receipts</h2> -->
      </div>
  </ParentLayout>
</template>

<script>
import ParentLayout from "@parent-theme/layouts/Layout.vue"
export default {
  components: {
    ParentLayout
  }
};
</script>
