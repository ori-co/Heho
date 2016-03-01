var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$timeout) {
    $scope.sample = [{id:0,identicon:'01', url:'samples/sample1.wav', etat:'icon_active'},
                     {id:1,identicon:'02', url:'samples/sample2.mp3', etat:'icon_disabled'},
                     {id:2,identicon:'03', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:3,identicon:'04', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:4,identicon:'05', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:5,identicon:'06', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:6,identicon:'07', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:7,identicon:'08', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:8,identicon:'09', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:9,identicon:'10', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:10,identicon:'11', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:11,identicon:'12', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:12,identicon:'13', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:13,identicon:'14', url:'samples/sample1.wav', etat:'icon_disabled'}];
                    
    $scope.param = [{nom:'Naturel', description:'sons organiques', valMin:'non Naturel', valMax:'très Naturel', notes: []}, 
                    {nom:'Végétal', description:'bruits de feuilles, vent, ruisseau, pas humains', valMin:'non Végétal', valMax:'très Végétal', notes: []}, 
                    {nom:'Bucolique', description:'propice à la balade et à la rêverie', valMin:'non Bucolique', valMax:'très Bucolique', notes: []}];
                    
    $scope.current = $scope.sample[0];
    
    $scope.player = document.getElementById("audioplayer");
    
    $scope.button=document.getElementById("buttonNext");   
    
    $scope.init = function (){
        $scope.selection(0);
        $scope.delay();
    }
    
    $scope.delay=function () {
        $timeout( function(){ 
            $scope.button.className="button"   
        }, 30000);
    }

    $scope.selection = function (id) {
        if (id == $scope.sample.length-1){
            $scope.button.innerHTML='Valider';
        } else {
            $scope.button.innerHTML='Suivant';
        }
        $scope.current.etat = '';
        $scope.current = $scope.sample[id];
        $scope.current.etat = 'icon_active'; 
        $scope.player.pause();
        $scope.player.src=$scope.sample[id].url;
        $scope.player.load();
        $scope.player.play();
        $scope.player.volume=0.5;
    }
    
    $scope.next = function() {
        var idCurr = $scope.current.id;
        $scope.sample[idCurr] = $scope.current;
        
        if (idCurr < $scope.sample.length-1){ 
            $scope.selection(idCurr + 1);        
            $scope.button.className="button_disabled";
            $scope.delay();
        } else {
            // validation et deuxième expé
        }
    }
    
    $scope.note = function($index, $event){
        var idCurr = $scope.current.id;
        $scope.param[$index].notes[idCurr] = $event.offsetX;
        // A diviser par la taille du slider
        
        //alert("note de "+idCurr+" sur le critère "+$scope.param[$index].nom+" est de : "+$scope.param[$index].notes[idCurr]);
    }

    $scope.testfunc = function(scope, a) {
        alert(a);
    }
});

