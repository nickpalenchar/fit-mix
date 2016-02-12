app.factory('ModalFactory', function($uibModal, $http){
    return {
        openAddPhase: function (pushTo) {
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'js/mix-board/modals/add-phase-modal.html',
                controller: 'phaseModalController',
                size: 'sm'
            });
            modal.result.then(input => {
                pushTo.push({
                    name: input.name,
                    duration: input.duration,
                    color: "two"
                });
            });
        },
        openUploadMusic: function() {
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'js/mix-board/modals/upload-music-modal.html',
                controller: 'uploadModalController',
                size: 'sm'
            });
            modal.result.then((id) => {
                console.log("Called with id " + id);
            });
        },
        openAddInstruction: function (pushTo) {
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'js/mix-board/modals/create-instruction-modal.html',
                controller: 'phaseModalController',
                size: 'sm'
            });
            modal.result.then(input => {
                //MB: trigger time is set by user later, so all that is necessary is text
                var voices = window.speechSynthesis.getVoices();
                if (voices){
                    var msg = new SpeechSynthesisUtterance();
                    msg.voice = voices[26];
                    msg.voiceURI = voices[26].voiceURI
                    msg.text = input.text
                    msg.linux = false;
                    window.speechSynthesis.speak(msg);
                    pushTo.push(msg);
                } else{
                    var voiceObj = {};
                    voiceObj.text = input.text;
                    voiceObj.linux = true;
                    responsiveVoice.speak( input.text, "US English Female");
                    pushTo.push(voiceObj);
                }

            });
        }
    }
});

function toArray(obj){
    let result = [];
    for (let k in obj){
        let n = parseInt(k)
        if(!Number.isNaN(n)){
            result[n] = obj[k]
        }
    }
    return result;
}
