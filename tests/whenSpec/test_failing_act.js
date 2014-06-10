var assert = require('assert');
var test = require('../test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;

var inconclusive_it = function(title) {};
var summary = function() {};
var c = {};
function act() {}


(function() {

	console.log('when called with act path');

	var suite_title = 'suite_title';
	var act_path = 'act_path';

	var reporter = requireMock('./reporter');
	reporter.summary = summary;
	var errorToThrow = 'error';
	reporter.inconclusive_suite = mock();
	reporter.inconclusive_suite.expect(suite_title, errorToThrow);


	
	var it_module = requireMock('./it');
	var inconclusive_it_module = requireMock('./inconclusive_it');
	inconclusive_it_module.it = inconclusive_it;

	reporter.suite = mock();
	reporter.suite.expect(suite_title);

	var suite_name_builder = requireMock('./suite_name_builder');
	var calling_module = {};
	suite_name_builder.expect(calling_module).return(suite_title);

	var load_act = requireMock('./load_act');
	load_act.expect(calling_module,act_path).return(act);

	var execute_act = requireMock('./execute_act');
	execute_act.expectAnything().expectAnything().whenCalled(function() { throw errorToThrow;});

	var when = require('../../when');	
	when.calling_module = calling_module;
	var returned = when(act_path, c);

	test('it returns an inconclusive "it"', function() {
		assert(returned.it === inconclusive_it);
	});

	test('it reports inconclusive suite and an error', function(){
		assert.doesNotThrow(reporter.inconclusive_suite.verify);
	});

	test('it reports suite title', function() {
		assert.doesNotThrow(reporter.suite.verify);
	});


})();
