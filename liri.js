var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var inputString = process.argv[2];
var fs = require('fs');

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});


switch (inputString){

	//=========================================

	case "my-tweets":
	getTweets();
	break;

	//=========================================

	case "spotify-this-song":
	var songName = "";
	getSong();
	break;

	//=========================================

	case "movie-this":
	var title = "";
   defineMovie();
	break;

	//=========================================
	
	case "do-what-it-says":
	getDoIt();
	break;
}//end of switch case function

//=========================================
//fuctions defined
//=========================================

function getTweets(){
	var params = {screen_name: 'potus',
	count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log('%j \n', tweets[i].text);
	  		}
		}
	});
}//end of get Tweets

//=========================================

function getSong(){
 	if (process.argv.length < 4) {
		songName = "Ace of Base - The Sign";
        accessSong();
 	} else {
        songName = process.argv[3];
        accessSong();
    }
} //end of getSong

function accessSong() {

    spotify.search({ type: 'track', query: songName }, function(err, data) {

        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

    });
} //end of accessSong

//=========================================

function defineMovie(){
	if (process.argv.length < 4) {
        title = "Mr. Nobody";
        getMovie();
    } else {
        title = process.argv[3];
        getMovie();
    }
}//end of defineMovie
function getMovie() {
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("---------------------")
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("---------------------")
            console.log("It was released in: " + JSON.parse(body).Year);
            console.log("---------------------")
            console.log("The movie's IMBD rating is: " + JSON.parse(body).imdbRating);
            console.log("---------------------")
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("---------------------")
            console.log("The movie's main language is: " + JSON.parse(body).Language);
            console.log("---------------------")
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("---------------------")
            console.log("The movie's actors incude: " + JSON.parse(body).Actors);
            console.log("---------------------")
            console.log("The movie's Rotten Tomatos rating is: " + JSON.parse(body).Ratings[1].Value);
        }
    }); //end of request
} //end of getMovie

//=========================================

function getDoIt(){
	fs.readFile("random.txt", "utf8", function(error, data){
		var myArr = data.split(",")
		songName = myArr[1] 
		accessSong();
	})//end of readFile 
}//end of getDoit