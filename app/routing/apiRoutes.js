
var path = require('path');
var friends = require('../data/friends.js');
var app = require('express');

module.exports = function (app, newFriend) {
    // Get to display the array of friends as objects
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var newFriendScores = newFriend.scores;
        var scoreArray = [];
        var friendMatch;
        var diffArray = [];
        var bestMatch = 0;

        var newUserFriend = {
            name: newFriend.name,
            picture: newFriend.picture,
            scores: []
        };

        // Fill the scoreArray with the scores of the newFriend
        for (var i = 0; i < newFriendScores.length; i++) {
            scoreArray.push(parseInt(newFriendScores[i]))
        };
        newUserFriend.scores = scoreArray;

        // Fill the diffArray with difference in scores between the newFriend and all of the other friends
        for (var i = 0; i < friends.length; i++) {
            var totalDiff = 0;
            for (var j = 0; j < newUserFriend.scores.length; j++) {
                // Use math.abs to get the absolute value of the difference
                totalDiff += Math.abs(newUserFriend.scores[j] - friends[i].scores[j]);
            };
            diffArray.push(totalDiff);
        };
        // Finding the bestMatch and setting it to the index it is in the diffArray
        for (var i = 1; i < diffArray.length; i++) {
            if (diffArray[i] <= diffArray[bestMatch]) {
                bestMatch = i;
            };
        };
        
        // Setting the friendMatch variable and pushing it to the friends array
        var friendMatch = friends[bestMatch];
        console.log(friendMatch);
        res.json(friendMatch);
        friends.push(newUserFriend);

    });

};






