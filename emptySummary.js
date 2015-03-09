var summary = require('./summary');

var empty = {
    suites: 0,
    passed: 0,
    failed: 0,
    inconclusive: 0,
    failures: []
};


function emptySummary() {
    return summary(empty);
}

module.exports = emptySummary;
