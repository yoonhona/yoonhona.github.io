module.exports = {
  // Language of your website
  locales: {
    '/': {
      lang: 'ko-KR',
    },
  },

  // Theme to use
  theme: 'meteorlxy',

  markdown   : {
    lineNumbers: true,
  },
  plugins    : [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-89927984-1',
      },
    ]
  ],
  themeConfig: {
    // Language of this theme. See the [Theme Language] section below.
    lang: 'en-US',

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Post', link: '/posts/' },
      { text: 'Github', link: 'https://github.com/yoonhona' },
    ],

    // Personal infomation (delete the fields if you don't have / don't want to display)
    personalInfo: {

      avatar     : 'https://avatars1.githubusercontent.com/u/10597948?s=460&v=4',
      // Nickname
      nickname   : '생계형 🐾者',
      // Introduction of yourself (HTML supported)
      description: '생계형 개발자의 블로그입니다. <br />생업에서 취득한 내옹을 공유합니다.',

      // Email
      email: 'lucky7_nyh@naver.com',

      // Your location
      location: 'Seoul, Korea',

      sns: {
        // Github account and link
        github: {
          account: 'yoonhona',
          link   : 'https://github.com/yoonhona',
        },

        // Facebook account and link
        facebook: {
          account: 'Na Yoonho',
          link   : 'https://www.facebook.com/profile.php?id=100001763897524',
        },
      },

    },
    comments: {
      platform: 'github', // Optional, default is 'github'. You can also choose 'gitlab', 'bitbucket'. Check Vssue docs for details.
      owner: 'yoonhona',
      repo: 'yoonhona.github.io',
      clientId: 'f2e448856c71b633ac89',
      clientSecret: 'd0ac690efb0800532a3ce2825b59a9497f7d7878',
      autoCreateIssue: process.env.NODE_ENV !== 'development', // Optional, this will not create issue autoly in development mode
    },

    lastUpdated: true,
  },
}
