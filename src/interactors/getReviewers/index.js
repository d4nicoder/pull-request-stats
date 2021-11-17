const calculateReviewsStats = require('./calculateReviewsStats');
const groupReviews = require('./groupReviews');
const core = require('@actions/core');
const reviewers = core.getInput('reviewers')

console.log(`Reviewers: ...${reviewers.split(',')}...`)

module.exports = (pulls) => groupReviews(pulls).map(({ author, reviews }) => {
  const stats = calculateReviewsStats(reviews);
  console.log(author)
  return { author, reviews, stats };
}).filter(info => !reviewers.length || reviewers.includes(info.author.login));
