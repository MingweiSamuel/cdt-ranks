#!/usr/bin/env node
// the only real dev language

var settings = require('./settings'), // include settings.json
  graph = require('fbgraph'); // https://github.com/criso/fbgraph

// set access token from settings
//
// for a private group, only needs 'user_managed_groups'
// which only allows reads from the group (not posts or
// changing admins or anything fancy).
// 
// Use https://developers.facebook.com/tools/debug/
// to inspect tokens
graph.setAccessToken(settings.token);

// obj that scores people's names (id: name)
var people = {};
// obj that stores scores (id: score)
var scores = {};
// increases a user's score
function increaseScore(user, count) {
  if (scores[user.id] === undefined) {
    scores[user.id] = count; // first points
    people[user.id] = user.name;
  }
  else
    scores[user.id] += count;
}

process.on('exit', function() {
  // when everything is done processing
  console.log('done');
  var arr = [];
  for (var uid in scores)
    arr.push([uid, scores[uid]]);
  arr.sort(function(a, b) { return b[1] - a[1] });

  for (var i = 0; i < arr.length; i++)
    console.log(people[arr[i][0]] + ": " + arr[i][1]);
});

// get posts in last week with likes and comments summary
// and poster information ('from')
// ignore errors because you can't stump the trump.
graph.get(settings.groupid + '/feed?since=' + settings.timeframe + '&' +
    'fields=comments.filter(stream).summary(true){from,likes.limit(1).summary(true)},' +
    'likes.limit(1).summary(true),from', processPostList);

// process list of posts
function processPostList(err, res) {
  for (var i = 0; i < res.data.length; i++)
    processPost(res.data[i]);
  if (res.paging && res.paging.next)
    graph.get(res.paging.next, processPostList); // recurse
}

// process a singular post
function processPost(post) {
  scorePost(post.from, post.likes.summary.total_count, post.comments.summary.total_count);

  processCommentList(false, post.comments);
}

// process list of comments
function processCommentList(err, res) {
  for (var i = 0; i < res.data.length; i++)
    processComment(res.data[i]);
  if (res.paging && res.paging.next)
    graph.get(res.paging.next, processCommentList);
}

// process singular comment
function processComment(comment) {
  scoreComment(comment.from, comment.likes.summary.total_count);
}


// scoring functions
function scorePost(from, likes, comments) {
  // post = 1 point
  // like = 10 points
  // comment on your post = 1 point
  increaseScore(from, 1 + 10 * likes + comments);
}
function scoreComment(from, likes) {
  if (likes)
    increaseScore(from, 5 * likes);
}
