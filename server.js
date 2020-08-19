const token = "discordtoken"
//===============================
//imports
const discord = require("discord.js");
const randomWords = require("random-words");

const client = new discord.Client();
client.login(token);
client.on("message", message => {
  if (message.content.startsWith("+gmail")) {
    try {
      let email = message.content.split(" ")[1];
      let entries = message.content.split(" ")[2];
      //if a specific number of emails to generate is specefied
      if (entries) {
        var fs = require("fs");
        let randword = randomWords()
        var stream = fs.createWriteStream("emails"+randword+".txt");
        stream.once("open", function(fd) {


          for (let i = 0; i < entries; i++) { 
          //bad var name but basically the "meat"/bulk of the email (the part we need). We put random capitalization cause gmail doesn't care
            let meat = email
              .split("@")[0]
              .split("")
              .map(v =>
                Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
              ) 
              .join("");
             //technically multiple dots works but some providers dont let you use multiple dots so here's a quick check so that we only add a dot once
            let sent = false;
            for (let i = 0; i < meat.length; i++) {
            //flip a coin chance, place a dot (or not)
              if (Math.random() >= 0.5 && !sent) {
                meat =
                  meat.substring(0, i) + "." + meat.substring(i, meat.length);
                sent = true
              }
            }
          stream.write(meat + "+" + randomWords() + "@" + email.split("@")[1]+"\n")
          }
          //send file
          message.reply("Here you go.", { files: ["emails"+randword+".txt"] });


          stream.end();

        });
      } 
      //no specific amount of emails is specified, let's just send one
      else {
        let meat = email 
          .split("@")[0]
          .split("")
          .map(v =>
            Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
          )
          .join("");
        let sent = false
        for (let i = 0; i < meat.length; i++) {
          if (Math.random() >= 0.5 && !sent) {
            meat = meat.substring(0, i) + "." + meat.substring(i, meat.length);
            sent = true;
          }
        }
        message.reply(meat + "+" + randomWords() + "@" + email.split("@")[1]);
      }

      let tag = 1;
    } catch (e) {
      message.reply("error");
      console.log(e);
    }
  }
});
