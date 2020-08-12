const path = require('path')
const RSS = require('rss')
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

/**
 * https://github.com/youngtailors/vuepress-plugin-rss
 * 기능이 몇 개 빠져 있어서 원래 사용하던 rss 플러그인 참고하여 변경
 */
module.exports = (pluginOptions, ctx) => {
  return {
    name: 'rss',

    generated () {
      const fs = require('fs-extra')
      const { pages, sourceDir } = ctx
      const count = 20
      const siteData = require(path.resolve(sourceDir, '.vuepress/config.js'))

      const feed = new RSS({
        title: siteData.title,
        description: siteData.description,
        feed_url: `https://yoonhona.github.io/rss.xml`,
        site_url: `https://yoonhona.github.io`,
        copyright: `2020 nyh`,
        language: 'ko',
      })

      pages
        .filter(page => String(page.frontmatter.type).toLowerCase() === 'post')
        .map(page => ({...page, date: new Date(page.frontmatter.date || '')}))
        .sort((a, b) => b.date - a.date)
        .map(page => ({
          title      : page.frontmatter.title,
          description: page.frontmatter.description,
          url        : `${feed.site_url}${page.path}`,
          date       : page.date,
          guid       : hash.update(page._content).copy().digest('hex'),
        }))
        .slice(0, count)
        .forEach(page => feed.item(page))

      fs.writeFile(
        path.resolve(ctx.outDir, 'rss.xml'),
        feed.xml()
      );
    }
  }
}
