app.controller('orderController', function ($scope, $rootScope, $mdDialog, apiService) {

    $scope.getOrderList = function () {
        apiService.GetData('order', function (data) {
            $scope.orderList = data;
        });
    }
    $scope.getOrderList();

    $scope.deleteOrder = function (orderId) {
        apiService.DeleteData('order', orderId, function () {
            $scope.getOrderList();
        })
    }

    $scope.addEditOrder = function (model, event) {

        $mdDialog.show({
            controller: addUpdateOrderController,
            templateUrl: 'createOrder.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: { dataToPass: model }
        })
            .then(function (result) { //mdDialog hide callback

                if (model.orderId) { //update
                    apiService.PatchData('order', result, function (updatedOrder) {
                        console.log(updatedOrder);
                    })
                } else { // create
                    apiService.PostData('order', result, function (createdOrder) {
                        $scope.orderList.push(createdOrder);
                    })
                }

            }, function () { //mdDialog cancel callback

            });
    }

    $scope.createChart = function (event) {
        $mdDialog.show({
            controller: chartController,
            templateUrl: 'lineChart.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: { dataToPass: $scope.orderList }
        })
    }

    function addUpdateOrderController($scope, $mdDialog, dataToPass) {

        $scope.model = dataToPass;
        $scope.createOrder = function () {
            $scope.model.orderDate = new Date();
            $mdDialog.hide($scope.model);
        }

        $scope.cancel = function () {
            $mdDialog.cancel();
        }

    }

    function chartController($scope, $mdDialog, dataToPass) {
        debugger;
        Highcharts.chart('container', {
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
});

app.controller('addUpdateOrderController', function ($scope, $rootScope, $mdDialog, apiService) {

})
