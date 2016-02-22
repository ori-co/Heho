var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.sample= [{id:0,identicon:'01',url:'samples/sample1.wav'},
					{id:1,identicon:'02',url:'samples/sample1.wav'},
					{id:2,identicon:'03',url:'samples/sample1.wav'},
					{id:3,identicon:'04',url:'samples/sample1.wav'},
					{id:4,identicon:'05',url:'samples/sample1.wav'},
					{id:5,identicon:'06',url:'samples/sample1.wav'},
					{id:6,identicon:'07',url:'samples/sample1.wav'},
					{id:7,identicon:'08',url:'samples/sample1.wav'},
					{id:8,identicon:'09',url:'samples/sample1.wav'},
					{id:9,identicon:'10',url:'samples/sample1.wav'}];
	$scope.param=[{nom:'caractéristique 1',description:'description correspndant à la caractéristique 1',valMin:'non mot clé 1', valMax:'très mot clé 1'}, 
					{nom:'caractéristique 2',description:'description correspndant à la caractéristique 2',valMin:'non mot clé 1', valMax:'très mot clé 1'}, 
					{nom:'Naturel',description:'exemple',valMin:'pas naturel', valMax:'très naturel'}];
	$scope.current=$scope.sample[0];

	$scope.selection=function (id) {
		$scope.current=$scope.sample[id];
}
});