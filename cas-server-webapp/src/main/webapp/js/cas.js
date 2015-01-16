/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function loadScript(urls, success) {
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0], done=false;

        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done=true;
                success(url);

                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }

}

var scripts = [ "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
    "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js",
    "https://rawgithub.com/cowboy/javascript-debug/master/ba-debug.min.js"];

loadScript(scripts, function(url) {
    $(document).ready(function() {
        if ($(":focus").length === 0){
            $("input:visible:enabled:first").focus();
        }

        //flash error box
        $('#msg.errors').animate({ backgroundColor: 'rgb(187,0,0)' }, 30).animate({ backgroundColor: 'rgb(255,238,221)' }, 500);

        //flash success box
        $('#msg.success').animate({ backgroundColor: 'rgb(51,204,0)' }, 30).animate({ backgroundColor: 'rgb(221,255,170)' }, 500);

        //flash confirm box
        $('#msg.question').animate({ backgroundColor: 'rgb(51,204,0)' }, 30).animate({ backgroundColor: 'rgb(221,255,170)' }, 500);

        $('#capslock-on').hide();
        $('#password').keypress(function(e) {
            var s = String.fromCharCode( e.which );
            if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
                $('#capslock-on').show();
            } else {
                $('#capslock-on').hide();
            }
        });

        if (typeof(jqueryReady) == "function") {
            jqueryReady();
        }
    });

});
