var assert = require('assert');
var test = require('../test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;

var it = function(title) {};
var summary = function() {};
var c = {};
function act() {}


(function() {

	console.log('when called with act path');

	var reporter = requireMock('./reporter');
	reporter.summary = summary;
	
	var it_module = requireMock('./it');
	it_module.it = it;


	var suite_title = 'suite_title';
	var act_path = 'act_path';

	reporter.suite = mock();
	reporter.suite.expect(suite_title).return();

	var suite_name_builder = requireMock('./suite_name_builder');
	var calling_module = {};
	suite_name_builder.expect(calling_module).return(suite_title);

	var load_act = requireMock('./load_act');
	load_act.expect(calling_module,act_path).return(act);

	var execute_act = requireMock('./execute_act');
	execute_act.expect(act, c).return();

	var when = require('../../when');	
	when.calling_module = calling_module;
	var returned = when(act_path, c);

	test('it should execute loaded act with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert(reporter.suite.verify());
	});


})();
