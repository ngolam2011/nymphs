'use strict';

angular.
  module('core.article').
    factory('Article', ['$resource',
      function($resource) {
        var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        var api_key = '3b2984fef8a143f0a522a88a34c2dd3e';

        return $resource(url, {
            'api-key': api_key,
            q: 'singapore',
            page: ':page'
        });

  }]);

