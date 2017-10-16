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

    $scope.createOrder = function (event) {
        $mdDialog.show({
            controller: addUpdateOrderController,
            templateUrl: 'createOrder.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
               // $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
               // $scope.status = 'You cancelled the dialog.';
            });
    }
});

app.controller('addUpdateOrderController', function ($scope, $rootScope, $mdDialog, apiService) {
    
})
