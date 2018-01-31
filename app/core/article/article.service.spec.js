'use strict';

describe("Article", function() {
  var $httpBackend;
  var Article;
  var articleData = [
    { snippet: "Snippet 0" },
    { snippet: "Snippet 1" },
    { snippet: "Snippet 2" }
    ];


  //Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Article` service before each test
  beforeEach(module('core.article'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Article_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3b2984fef8a143f0a522a88a34c2dd3e&q=singapore&page=1').respond(articleData);
    Article = _Article_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the data from nyt api', function() {
    var articles = Article.query({ page:1 });

    expect(articles).toEqual([]);

    $httpBackend.flush();
    expect(articles).toEqual(articleData);
  });

});
