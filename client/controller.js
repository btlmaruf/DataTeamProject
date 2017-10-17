app.controller('orderController', function ($scope, $rootScope, $mdDialog, apiService) {

    $scope.getOrderList = function () {
        apiService.GetData('order', function (data) {

            $scope.orderList = data;

            //format data for chart
            var chartData = {xAxis: [], values: []};
            _.forEach(_.orderBy(data, 'orderDate', 'asc'), function(x) {
                chartData.xAxis.push(x.orderDate);
                chartData.values.push(x.orderedItem);
            });
            $scope.createChart(chartData);
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
                        //$scope.orderList.push(createdOrder);
                        $scope.getOrderList();
                    })
                }

            }, function () { //mdDialog cancel callback

            });
    }

    $scope.createChart = function (chartData) {
        Highcharts.chart('container', {
            title: {
                text: 'Orders'
            },
            xAxis: {
                categories: chartData.xAxis,
                type:'datetime',
                labels: {
                    format: ''
                }
            },
            yAxis: {
                title: {
                    text: 'Ordered Item Count'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'Ordered Item',
                data: chartData.values
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

    //mdmodal controller
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
    
});

