module.exports = function(e) {
	var stack = e.stack;
	var index = stack.indexOf('at innerThrows (assert.js:');
	if (index < 0)
		index = stack.indexOf('at _throws (assert.js:');
	
	while(stack[index] != '\n'){
		index --;
	}
	
	return stack.substring(0, index);
}