/**
 * Created by Александр on 27.11.2016.
 */
;(function () {
    var app = angular.module("calculator", []);

    app.controller("CalculatorController", ["$scope", function ($scope) {
        $scope.calculator = {
            inputValue: "0",
            lastValue: null,
            lastOperation: null,
            operationFlag: false,
            resultFlag: false
        };

        var calc = $scope.calculator;

        $scope.addDigit = function (value) {
            if (calc.inputValue === "0") {
                calc.inputValue = value;
            } else if (calc.operationFlag === true || calc.resultFlag === true) {
                calc.operationFlag = false;
                calc.resultFlag = false;
                calc.inputValue = value;
            } else {
                calc.inputValue += value;
            }
        };

        $scope.addOperation = function (operation) {
            if (calc.operationFlag === true) {
                calc.lastOperation = operation;
            } else if (calc.lastOperation === null) {
                calc.lastValue = calc.inputValue;
                calc.lastOperation = operation;
                calc.operationFlag = true;
            } else {
                calc.inputValue = getResult();
                calc.lastValue = calc.inputValue;
                calc.lastOperation = operation;
                calc.operationFlag = true;
            }
        };

        $scope.calculate = function () {
            if (calc.lastValue !== null && calc.lastOperation !== null) {
                calc.inputValue = getResult();
                calc.resultFlag = true;
                calc.lastValue = null;
                calc.lastOperation = null;
            }
        };

        $scope.addDot = function () {
            if (calc.inputValue.indexOf(".") === -1) {
                calc.inputValue += ".";
            }
        }

        $scope.clearAll = function () {
            calc.inputValue = "0";
            calc.lastValue = null;
            calc.lastOperation = null;
            calc.operationFlag = false;
            calc.resultFlag = false;
        };

        $scope.checkBoxValue = false;

        function getResult() {
            try {
                var result = eval(+calc.lastValue + calc.lastOperation + +calc.inputValue);

                if (!isNumeric(result)) {
                    throw new Error("Error");
                }
            } catch (e) {
                result = e.message;
            }
            return result;
        }

        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }

    }]);
}());