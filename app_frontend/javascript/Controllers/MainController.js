appControllers.controller('MainController', function($scope, NewsService, $rootScope) {

    $scope.url = '';
    $scope.feeds = [];
    $scope.showLoader = $rootScope.showLoader;

    $scope.$on('show-loader', function () {
        $scope.showLoader = true;
    });
    $scope.$on('hide-loader', function () {
        $scope.showLoader = false;
    });

    $scope.getFeed = function() {
        $scope.feeds = [];
        NewsService.getFeed($scope.url).success(function(response) {
            $scope.feeds = response;
        }).error(function(response) {
            alert('Error: ' + response.error);
        });
    };

    $scope.reset = function() {
        $scope.url = '';
        $scope.getFeed();
    }

    $scope.getFeed();

});