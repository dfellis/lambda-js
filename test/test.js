var l = require('../lib/lambda');

function speedTest(adder) {
	var start = Date.now();
	for(var i = 0; i < 1000000; i++) {
		adder(i, i);
	}
	return Date.now() - start;
}

exports.speed = function(test) {
	test.expect(3);
	var adderNormal = function(a, b) { return a + b; };
	var adderPreConstructed = new Function("a,b", "return a+b");
	var adderLambda = l("a,b", "a+b");
	
	var normalTime = speedTest(adderNormal);
	var preConstructedTime = speedTest(adderPreConstructed);
	var lambdaTime = speedTest(adderLambda);

	var naiveStart = Date.now();
	for(var i = 0; i < 1000000; i++) {
		(new Function("a,b", "return a+b"))(i, i);
	}
	var naiveTime = Date.now() - naiveStart;

	console.log("Naive Inline Function Construction Time: " + naiveTime + "ms");
	console.log("Pre-Constructed Function Time:           " + preConstructedTime + "ms");
	console.log("'Standard' Function Time:                " + normalTime + "ms");
	console.log("Lambda Function Time:                    " + lambdaTime + "ms");

	test.ok(lambdaTime < naiveTime, "'inline' construction of a lambda doesn't have normal inline penalty cost");
	test.ok(lambdaTime / preConstructedTime < 10, "lambda construction/retrieval overhead not significant");
	test.ok(lambdaTime / normalTime < 10, "lambda overhead not significant versus 'standard' functions");
	test.done();
};
