# node-ircbot
Plugin and config loader for node-irc

Installation
============
- Clone, run npm install. Ignore any errors from node-irc because reasons (it seems to work anyways).
- Edit config/index.js
- Run index.js
- Say hello!

Plugin Config
============
Just plop a file with a .js extension in
    ./plugins

The file should export an object with the following properties:
>  regexp

>  action

regexp
------
A string containing the expression that the bot will respond to. This will be used as the
expression parameter to create a RegExp object. Do not include the forward slashes. All
expressions are evaluated globally and case-insensitive.

action
------
THis is the function that will be called if the expression matches. It receives the following
parameters: client (node-irc object), nick (string), to (string), text (string), message (string)
To say something, call

>   client.say('channel/nick', 'message')

Check the node-irc docs for more info on the client object.
