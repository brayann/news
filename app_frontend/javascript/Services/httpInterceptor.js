'use strict';

appServices.factory('httpInterceptor', function($q, $rootScope){

    var httpRequests = 0;

    return {
        request: function (config) {

            httpRequests++;

            // Show loader
            $rootScope.$broadcast('show-loader');
            return config || $q.when(config);

        },
        response: function (response) {

            if ((--httpRequests) === 0) {
                // Hide loader
                $rootScope.$broadcast('hide-loader');
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--httpRequests)) {
                // Hide loader
                $rootScope.$broadcast('hide-loader');
            }

            return $q.reject(response);
        }
    };
});