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
