# cdt-ranks
for ranking users in a Facebook group

## How to use

### 1: clone repo
    git clone https://github.com/MingweiSamuel/cdt-ranks.git

### 2: update npm
    npm update

### 3: set settings
    cp settings.example.json settings.json
do the setting-setting by setting the settings:

    {
      "token": "<graph api token here>",
      "groupid": "2204685680",
      "timeframe": "-1 week"
    }
`token` is the graph api token
`groupid` is the id of the facebook group
`timeframe` is a unix timestamp or [`strtotime`](http://www.w3schools.com/php/func_date_strtotime.asp) string.

### 4: (optional) change the math in rank.js

at the bottom of `rank.js` are two functions called `scorePost` and `scoreComment`. Change them to be cooler, if you want.

### 5: run the thing

    node rank.js

### 6: pls give apka whatsapp number kya hai jai hind

    #thank

## How to get the tokens
Go to: https://developers.facebook.com/tools/explorer/?method=GET&path=me%3Ffields%3Dgroups&version=v2.9

This should fill in the necessary fields if you're already logged into Facebook.

First generate a token by pressing `Get Token`. A prompt will appear to ask you which permissions you'd like to associate with this token. Select `user_managed_groups` at minimum, you may need to select additional permissions if you receive an error after executing `rank.js`.

Once you've gotten a token, press the `Submit` button to get the IDs for the groups you administer.

Use these IDs as described in step 3.
