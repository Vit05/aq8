const purgecss = require('@fullhuman/postcss-purgecss');


module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    }),
    purgecss({
      content: ['./**/*.html'],
      whitelist: ['icm, .active'],
      whitelistPatterns: [
        /ss\-/,
        /icon__/,
        /arrow-/,
        /col_/,
        /star_/,

      ],
      keyframes: false
    })
  ]
}