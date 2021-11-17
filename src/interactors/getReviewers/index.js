const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');
const core = require('@actions/core');
const reviewers = core.getInput('reviewers').split(',')

console.log(typeof reviewers)
console.log(reviewers)

module.exports = (pulls) => groupReviews(pulls).map(({ author, reviews }) => {
  const stats = calculateReviewsStats(reviews);
  console.log(author)
  return { author, reviews, stats };
}).filter(info => reviewers.length === 0 || reviewers.includes(info.author.login));
