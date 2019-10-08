module.exports = {
    title: '🐾밥이',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Test', link: '/test/' },
            { text: 'github', link: 'https://github.com/yoonhona' },
        ]
    },
    markdown: {
        plugins: {
            'markdown-it-codesandbox': {},
        },
    },    
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        '@vuepress/nprogress',
        [
            '@vuepress/google-analytics',
            {
              'ga': 'UA-89927984-1'
            }
        ]
    ]
}