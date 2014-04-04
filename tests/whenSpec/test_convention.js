var assert = require('assert');
var test = require('../test');

var requireMock = require('a_mock').requireMock;
var mock = require('a_mock').mock;

var it = function(title) {};
var summary = function() {};
var c = {};
function act() {}


(function() {

	console.log('when called with without path');

	var reporter = requireMock('./reporter');
	reporter.summary = summary;
	
	var it_module = requireMock('./it');
	it_module.it = it;
	var inconclusive_it_module = requireMock('./inconclusive_it');

	var suite_title = 'suite_title';
	

	reporter.suite = mock();
	reporter.suite.expect(suite_title).return();

	var suite_name_builder = requireMock('./suite_name_builder');
	var calling_module = {};
	suite_name_builder.expect(calling_module).return(suite_title);
	
	var act_path = 'act_path';
	var act_path_by_convention = requireMock('./act_path_by_convention');
	act_path_by_convention.expect(calling_module).return(act_path);
	
	var load_act = requireMock('./load_act');
	load_act.expect(calling_module,act_path).return(act);

	var execute_act = requireMock('./execute_act');
	execute_act.expect(act, c).return();

	var when = require('../../when');
	
	when.calling_module = calling_module;

	var returned = when(c);

	test('it should execute loaded act loaded using a convention with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert(reporter.suite.verify());
	});

})();
