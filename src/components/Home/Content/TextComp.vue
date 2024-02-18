<template>
  <div id="textComp" v-html="markdown.render(props.content)" />
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItTasklists from 'markdown-it-task-lists'
import MarkdownItTOC from 'markdown-it-toc-done-right'

const markdown = new MarkdownIt()
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTOC)
  .use(MarkdownItTasklists)



const props = defineProps({
  content: {
    type: String
  },
})

</script>

<style scoped>
#textComp{}
</style>
