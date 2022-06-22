



        //send "init" game event to BTLA

        dsBridge.call("byjus.sendExploreUIEvent", {

            tag: "init",

            data: ""

        });


        //Receive for init event from BTLA 

        dsBridge.register('init', function (str) {

            console.log("init received");


            //send "ready" game event to BTLA

            dsBridge.call("byjus.sendExploreUIEvent", {

                tag: "ready"

            });

            return 1;

        });



        //Receive for "appEvent" from BTLA

        dsBridge.register('appEvent', function (str) {

            console.log("appEvent received, ", str);


            //Receive start event. And start the game

            if (str == "start") {

            
                console.log("Game is started");

            }

        });



