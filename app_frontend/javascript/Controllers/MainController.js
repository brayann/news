appControllers.controller('MainController', function($scope, NewsService, $rootScope) {

    $scope.url = '';
    $scope.showLoader = $rootScope.showLoader;

    $scope.$on('show-loader', function () {
        $scope.showLoader = true;
    });
    $scope.$on('hide-loader', function () {
        $scope.showLoader = false;
    });

    $scope.getFeed = function() {
        NewsService.getFeed($scope.url).success(function(response) {
            $scope.feeds = response;
        }).error(function(response) {
            alert('Error: ' + response.error);
        });
    };

    $scope.getFeed();

});