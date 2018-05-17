/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 (function (Mozilla) {
    'use strict';

    // Add class to indicate Windows 8 and later
    if (window.site.platform === 'windows' && window.site.platformVersion >= 6.2) {
        document.documentElement.classList.add('win8up');
    }

    var beginAnimation = function (syncConfig) {
        var redirectDest = 'about:newtab';
        var scene = document.getElementById('scene');
        var skipbutton = document.getElementById('skip-button');

        var hideOrShowSkipButton = function (data) {
            switch(data.data.url) {
            case '':
            case 'signin':
            case 'signup':
            case 'reset_password':
                skipbutton.disabled = false;
                skipbutton.classList.remove('skipbutton-hidden');
                break;
            default:
                skipbutton.classList.add('skipbutton-hidden');
                break;
            }
        };

        var disableSkipButton = function () {
            skipbutton.disabled = true;
        };

        var onVerificationComplete = function () {
            scene.dataset.signIn = 'true';
            // Specially navigate to about:newtab and focus address bar
            if (redirectDest === 'about:newtab') {
                Mozilla.UITour.showNewTab();
            } else {
                window.location.href = redirectDest;
            }
        };

        skipbutton.onclick = onVerificationComplete;

        if (syncConfig) {
            window.setTimeout(function() {
                onVerificationComplete();
            }, 1000);
        } else {
            scene.dataset.content = 'true';
        }
    };

    document.onreadystatechange = function() {
        if (document.readyState === 'complete') {
            var syncConfig;
            Mozilla.UITour.getConfiguration('sync', function(config) {
                syncConfig = config.setup;
                beginAnimation(syncConfig);
            });
        }
    };

    fetch('http://127.0.0.1:3030/metrics-flow').then((resp) => {
        return resp.json();
    }).then((r) => {
        console.log(r);
        /**
        This returns:

        {
            flowBeginTime: 1526576753262,
            flowBeginTime: "9b8b128bbe0fc61b38d0938034db70d89fa27d03a5040bb9e232b479a4cd8a03",
        }
        */

        $('[name="flow_id"]').val(r.flowId);
        $('[name="flow_begin_time"]').val(r.flowBeginTime);
    }).catch((e) => {
        console.log('fxa error', e);
    })

})(window.Mozilla);
