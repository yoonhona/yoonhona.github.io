<template>
    <Timeline>
        <timeline-title v-bind:bg-color="getRandomColor()" >
            <a href="#" v-on:click.prevent="fold = !fold">{{book.name}}</a>
            <a v-bind:href="book.publisher" target="_blank">
                <OutboundLink/>
            </a>
        </timeline-title>
        <template v-for="post in contents">
            <timeline-item v-bind:bg-color="getRandomColor()" v-show="!fold">
                <Content v-bind:page-key="post"/>
            </timeline-item>
        </template>
    </Timeline>
</template>
<script>

import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline';
import IconInfo from 'vuepress-theme-meteorlxy/lib/components/IconInfo';

const Colors = [
  '#FF8A80',
  '#FF5252',
  '#FF1744',
  '#D50000',
  '#FF80AB',
  '#FF4081',
  '#F50057',
  '#C51162',
  '#EA80FC',
  '#E040FB',
  '#D500F9',
  '#AA00FF',
  '#B388FF',
  '#7C4DFF',
  '#651FFF',
  '#6200EA',
  '#8C9EFF',
  '#536DFE',
  '#3D5AFE',
  '#304FFE',
  '#82B1FF',
  '#448AFF',
  '#2979FF',
  '#80D8FF',
  '#40C4FF',
  '#00B0FF',
  '#0091EA',
  '#84FFFF',
  '#18FFFF',
  '#00E5FF',
  '#00B8D4',
  '#A7FFEB',
  '#64FFDA',
  '#1DE9B6',
  '#00BFA5',
  '#B9F6CA',
  '#69F0AE',
  '#00E676',
  '#00C853',
  '#CCFF90',
  '#B2FF59',
  '#76FF03',
  '#64DD17',
  '#F4FF81',
  '#EEFF41',
  '#C6FF00',
  '#AEEA00',
  '#FFFF8D',
  '#FFFF00',
  '#FFEA00',
  '#FFD600',
  '#FFE57F',
  '#FFD740',
  '#FFC400',
  '#FFAB00',
  '#FFD180',
  '#FFAB40',
  '#FF9100',
  '#FF6D00',
  '#FF9E80',
  '#FF6E40',
  '#FF3D00',
  '#DD2C00',
]

export default {
  name      : 'BookItem',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
    IconInfo,
  },
  props     : {
    book    : {
      type   : Object,
      default: {},
    },
    contents: {
      type   : Array,
      default: [],
    },
  },
  data () {
    return {
      fold: true,
    }
  },
  methods: {
    getRandomColor() {
      const position = Math.ceil(Math.random() * Colors.length);
      console.log(position)
      console.log(Colors[position])
      return Colors[position];
    }
  }
}

</script>
