if (
  process.argv.indexOf('--pre-render') !== -1 ||
  process.argv.indexOf('--prerender') !== -1
) {
  require('pre-render')('./build', ['/', '/about']);
}
