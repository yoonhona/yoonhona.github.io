<template>
    <div>
        <BookList/>
    </div>
</template>
<script>
import BookList from './book/BookList'

export default {
  name      : 'BookLayout',
  components: {
    BookList,
  },
}
</script>
