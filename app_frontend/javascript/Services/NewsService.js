'use strict';

appServices.service('NewsService', function($http) {
   this.getFeed = function(url) {
       return $http.get('/load?url='+url);
   }
});