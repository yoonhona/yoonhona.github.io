<template>
    <div class="main-div posts-list">
        <div class="posts-items">
            <template v-for="book in bookList">
                <BookItem v-bind:book="book" v-bind:contents="contentListByBook[book.name]" />
            </template>
        </div>
    </div>
</template>
<script>
import BookItem from './BookItem'

export default {
  name      : 'BookList',
  components: {
    BookItem,
  },
  computed  : {
    bookPosts () {
      return this.$site && this.$site.pages && this.$site.pages.filter(value => value.path.includes('bookPosts'))
    },
    bookList () {
      return this.bookPosts
        .reduce((previousValue, currentValue) => {
          if (!previousValue.some(pv => pv.frontmatter.name === currentValue.frontmatter.name)) {
            previousValue.push(currentValue)
          }
          return previousValue
        }, [])
        .map(page => {
          return {
            name     : page.frontmatter.name,
            img      : page.frontmatter.img,
            publisher: page.frontmatter.publisher,
            author   : page.frontmatter.author,
          }
        })
    },
    contentListByBook () {
      return this.bookPosts.reduce((previousValue, currentValue) => {
        if (previousValue[currentValue.frontmatter.name]) {
          previousValue[currentValue.frontmatter.name].push(currentValue.key)
          return previousValue
        }
        return {
          ...previousValue,
          [currentValue.frontmatter.name]: [currentValue.key],
        }
      }, {})
    },
  },
  mounted () {
  },
}
</script>
