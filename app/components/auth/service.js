/**
 * Created by aeon on 09/06/16.
 */

angular.module("Authentication")
    .factory("AuthService", ["$http", "$cookieStore", "$rootScope", "$timeout", function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (email, password, callback) {
            var sendData = {
                "email": email,
                "password": password
            };
            $http.post("/api/users/auth", sendData)
                .success(function (data) {
                    service.SetCredentials(data.user, data.token);
                    if (callback) {
                        callback(data.user, data.token);
                    }
                });
        };

        service.SetCredentials = function (userInfo, token) {
            $rootScope.globals = {user: userInfo, token: token};
            $cookieStore.put("globals", $rootScope.globals);
            $http.defaults.headers.common["Auth-Token"] = token;
        };

        service.cleanCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove("user");
            $cookieStore.remove("token");
            $http.defaults.headers.common["Auth-Token"] = null;
        };

        return service;
    }]);