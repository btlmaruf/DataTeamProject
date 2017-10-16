const apiURL = 'http://localhost:3000/'
app.service('apiService', function ($http, $q, $rootScope) {
    return {
        GetData: function (request, callback) {
            $http({
                url: apiURL + request,
                headers: { "Content-Type": "application/json" },
                method: "GET",
                data: ''
            })
                .then(function (response, status, headers, config) {
                    callback(response.data);
                });
        },

        PostData: function (request, data, callback) {
            $http({
                url: apiURL + request,
                headers: { "Content-Type": "application/json" },
                method: "POST",
                dataType: 'JSON',
                data: data
            })
                .then(function (response, status, headers, config) {
                    callback(response.data);
                });
        },
        DeleteData: function (request, orderId, callback) {
            $http({
                url: apiURL + request + '/' + orderId,
                headers: { "Content-Type": "application/json" },
                method: "DELETE",
                data: {
                    orderId: orderId
                }
            })
                .then(function (response, status, headers, config) {
                    console.log(status);
                    callback();
                });
        }
    }

});