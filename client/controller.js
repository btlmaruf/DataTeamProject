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
                    apiService.PatchData('order', result, function(updatedOrder){
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

    function addUpdateOrderController($scope, $mdDialog, dataToPass) {

        $scope.model = dataToPass;
        $scope.createOrder = function () {
            $scope.model.orderDate = new Date();
            $mdDialog.hide($scope.model);
        }

        $scope.cancel = function(){
            $mdDialog.cancel();
        }

    }
});

app.controller('addUpdateOrderController', function ($scope, $rootScope, $mdDialog, apiService) {

})
