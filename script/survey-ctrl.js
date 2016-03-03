var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$timeout,$http) {    
    $scope.sample = [];
                    
    $scope.param = [];
                    
    $scope.current;
    
    $scope.player = document.getElementById("audioplayer");
    
    $scope.button=document.getElementById("buttonNext");     
    
    $scope.init = function (exp){
        switch (exp){
            case 1 :
            // Initialisation expérience 1
                $scope.sample = [{id:0,identicon:'01', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:1,identicon:'02', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:2,identicon:'03', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:3,identicon:'04', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:4,identicon:'05', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:5,identicon:'06', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:6,identicon:'07', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:7,identicon:'08', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:8,identicon:'09', url:'samples/sample1.wav', etat:'icon_disabled'}];
                     //{id:9,identicon:'10', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:10,identicon:'11', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:11,identicon:'12', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:12,identicon:'13', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:13,identicon:'14', url:'samples/sample1.wav', etat:'icon_disabled'}];
                
                $scope.sample = $scope.sample.sort(function() { return 0.5 - Math.random() });                
                    
                $scope.param = [{nom:'Naturelle', description:'vent, ruisseau ...', notes: []}, 
                                {nom:'Végétale', description:'bruits de feuilles ...', notes: []},
                                {nom:'Organique', description:'pas humains, bruits d animaux ...', notes: []},  
                                {nom:'Bucolique', description:'propice à la balade et à la rêverie', notes: []},
                                {nom:'Agréable', description:'', notes: []}];
                    
                $scope.current =0;
                $scope.selection($scope.current);
                $scope.delay();
                break;
                
            case 2:
            // Initialisation expérience 2
                $scope.sample = [{id:0,identicon:'01', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:1,identicon:'02', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:2,identicon:'03', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:3,identicon:'04', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:4,identicon:'05', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:5,identicon:'06', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:6,identicon:'07', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:7,identicon:'08', url:'samples/sample1.wav', etat:'icon_disabled'},
                     {id:8,identicon:'09', url:'samples/sample1.wav', etat:'icon_disabled'}];
                     //{id:9,identicon:'10', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:10,identicon:'11', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:11,identicon:'12', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:12,identicon:'13', url:'samples/sample1.wav', etat:'icon_disabled'},
                     //{id:13,identicon:'14', url:'samples/sample1.wav', etat:'icon_disabled'}];
                    
                $scope.param = [{nom:'Dynamique', description:'sonorités événementielles et ponctuelles', notes: []}, 
                                {nom:'Entrainant', description:'loops rythmiques, pulsations', notes: []}, 
                                {nom:'Technologique', description:'sons électroniques et séquences mélodiques synthétiques', notes: []},
                                {nom:'Agréable', description:'', notes: []}];
                $scope.current = 0;
                $scope.selection($scope.current);
                $scope.delay();
                break;
                
            default:
            // fin de l'expérience
            $scope.button.className="button_disabled";
            alert("Expérience terminée. Merci !");
        }
    }
    
    $scope.updateButtonStyle = function (){
        if ($scope.current == $scope.sample.length-1){
            $scope.button.innerHTML='Valider';
        } else {
            $scope.button.innerHTML='Suivant';
        }
        
        if ($scope.allRes && $scope.delayOK) {
            $scope.button.className="button"
        } else {
            $scope.button.className="button_disabled";
        }
    }
    
    $scope.delayOK =false;
    
    $scope.delay=function () {
        $timeout( function(){  
             $scope.delayOK = true;
             $scope.updateButtonStyle();
        }, 7000);
        //}, 30000);
    }
    
    $scope.allRes = false;
    
    $scope.testAllRes = function() {
        $scope.allRes=true;
        for (i = 0; i < $scope.param.length; i++) { 
            if (!$scope.param[i].notes[$scope.current]){
                $scope.allRes = false;
            }
        }
        $scope.updateButtonStyle();
    }

    $scope.selection = function (id) {
        $scope.sample[$scope.current].etat = '';
        $scope.current = id;
        $scope.sample[$scope.current].etat = 'icon_active'; 
        
        $scope.testAllRes();
        
        $scope.player.pause();
        $scope.player.src=$scope.sample[id].url;
        $scope.player.load();
        $scope.player.play();
        $scope.player.volume=0.5;
    }
    
    $scope.next = function() {
        if ($scope.current < $scope.sample.length-1){ 
            $scope.selection($scope.current + 1);        ;
            $scope.delayOK = false;
            $scope.delay();
        } else {
            // Sauvegarde et passage à la deuxième expérience
            $scope.saveResults();
            $scope.exp ++;
            $scope.init($scope.exp);
        }
    }
    
    $scope.note = function($index, $event){
        var size = $event.srcElement.offsetWidth;
        $scope.param[$index].notes[$scope.current] = $event.offsetX/size*100;
        $scope.testAllRes();
        //alert("note de "+$scope.current+" sur le critère "+$scope.param[$index].nom+" est de : "+$scope.param[$index].notes[$scope.current]);
    }

    $scope.saveResults=function() {
        var ids =[];
        for (i = 0; i < $scope.sample.length; i++) { 
            ids.push($scope.sample[i].id);
        }
        var temp=[];
        for (i = 0; i < $scope.param.length; i++) { 
            temp.push({param:$scope.param[i].nom, notes:$scope.param[i].notes})
        }
        var res = {
            exp:$scope.exp,
            sampleID:ids,
            notes:temp
            }
        $http.post("save_results.php",res);
    }
    
    $scope.testfunc = function(scope, a) {
        alert(a);
    }
});
