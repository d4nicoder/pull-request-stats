const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');
const core = require('@actions/core');
const reviewers = core.getInput('reviewers').split(',').filter(reviewer => reviewer.trim() !== '').map(reviewer => reviewer.trim())

core.info(reviewers)

module.exports = (pulls) => groupReviews(pulls).map(({ author, reviews }) => {
  const stats = calculateReviewsStats(reviews);
  core.info(author)
  return { author, reviews, stats };
}).filter(info => {
  if (!reviewers.length) {
    core.info(`Not filtering by reviewers`)
    return true
  } else if (reviewers.includes(info.author.login)) {
    core.info(`Author ${info.author.login} is present`)
    return true
  }
  return false
});
