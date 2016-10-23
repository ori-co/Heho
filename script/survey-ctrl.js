var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$timeout,$http) {    
    $scope.sample = [];
                    
    $scope.param = [];
                    
    $scope.current;
    
    $scope.player = document.getElementById("audioplayer");
    
    $scope.button=document.getElementById("buttonNext");   

    $scope.exp = Math.random() <=0.5;
    
    $scope.startTime;
    
    $scope.init = function (exp){
        $scope.count++;
        switch (exp){
            case true:
            // Initialisation expérience 1
                $scope.sample = [{id:0,identicon:'01', url:'samples/Crea_Compositeur_Brief_1_1.wav', etat:'icon_disabled'},
                     {id:1,identicon:'02', url:'samples/Echantillon_Max_Msp_Brief_Vegetal.wav', etat:'icon_disabled'},
                     {id:2,identicon:'03', url:'samples/brief_vegetal_prop_1_classLvl_2_rep_4.wav', etat:'icon_disabled'},
                     {id:3,identicon:'04', url:'samples/brief_vegetal_prop_2_classLvl_1_rep_5.wav', etat:'icon_disabled'},
                     {id:4,identicon:'05', url:'samples/brief_vegetal_prop_2_classLvl_2_rep_5.wav', etat:'icon_disabled'}];              
                    
                $scope.param = [{nom:'Naturelle', description:'vent, ruisseau,bruits d animaux ...', notes: []}, 
                                {nom:'Végétale', description:'bruits de feuilles ...', notes: []}, 
                                {nom:'Bucolique', description:'propice à la balade et à la rêverie', notes: []},
                                {nom:'Agréable', description:'écoute plaisante', notes: []},
                                {nom:'Etrange', description:'écoute perturbante, déstabilisante', notes: []}];
                    
                break;
                
            case false:
            // Initialisation expérience 2
                $scope.sample = [{id:0,identicon:'01', url:'samples/Crea_Compositeur_Brief_2_2.wav', etat:'icon_disabled'},
                     {id:1,identicon:'02', url:'samples/Echantillon_Max_Msp_Brief_Technologique.wav', etat:'icon_disabled'},
                     {id:2,identicon:'03', url:'samples/brief_technologique_prop_1_classLvl_2_rep_3.wav', etat:'icon_disabled'},
                     {id:3,identicon:'04', url:'samples/brief_technologique_prop_2_classLvl_1_rep_2.wav', etat:'icon_disabled'},
                     {id:4,identicon:'05', url:'samples/brief_technologique_prop_2_classLvl_2_rep_1.wav', etat:'icon_disabled'}];
                              
                $scope.param = [{nom:'Dynamique', description:'sonorités événementielles et ponctuelles', notes: []}, 
                                {nom:'Entrainant', description:'loops rythmiques, pulsations', notes: []}, 
                                {nom:'Technologique', description:'sons électroniques et séquences mélodiques synthétiques', notes: []},
                                {nom:'Agréable', description:'écoute plaisante', notes: []},
                                {nom:'Etrange', description:'écoute perturbante, déstabilisante', notes: []}];
                break;
        }
        $scope.startTime = Date.now();
        $scope.sample = $scope.sample.sort(function() { return 0.5 - Math.random() });
        $scope.current =0;
        $scope.selection($scope.current);
        $scope.delay();
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
        }, 30000);
        // une minute par echantillon
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
            if ($scope.count==1){
                $scope.count++;
                $scope.exp = !$scope.exp;
                $scope.init($scope.exp);
            } else {
                //fin de l'expérience
                $scope.button.className="button_disabled";
                $scope.end=true;                
            }
        }
    }
    
    $scope.note = function($index, $event){
        var target = $event.currentTarget || $event.srcElement;
        var size = target.offsetWidth;
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
        var subject ={
            name:$scope.name,
            firstname:$scope.firstname,
            age:$scope.age,
            gender:$scope.gender
        }
        var res = {
            subjectInfo:subject,
            exp:$scope.exp,
            start:$scope.startTime,
            sampleID:ids,
            notes:temp
            }
        $http.post("save_results.php",res);
    }
});
