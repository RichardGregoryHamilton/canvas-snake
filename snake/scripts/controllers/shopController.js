/* This JavaScript file is devoted to the logic behind the shop */

angular.module('my-app')
    .controller('shopController', ['$scope', function($scope) {
        $scope.purchases = JSON.parse(localStorage['shapePurchases']);
        $scope.showMessage = false;
        $scope.rejected = false;
        $scope.purchased = function(item) {
            return $scope.purchases.indexOf(item) == -1;
        }
        
        $scope.cart = [];
        $scope.patterns = [
                            { 'name': 'Pattern 1', 'price': 10 },
                            { 'name': 'Pattern 2', 'price': 10 },
                            { 'name': 'Pattern 3', 'price': 15 },
                            { 'name': 'Pattern 4', 'price': 15 },
                            { 'name': 'Pattern 5', 'price': 20 },
                            { 'name': 'Pattern 6', 'price': 20 },
                            { 'name': 'Pattern 7', 'price': 20 }
                          ];
               
        $scope.approvePurchase = function() {
            $scope.rejected = false;
            $scope.showMessage = true;
            setTimeout(function() {
                $scope.showMessage = false;
            }, 5000);
        }
        
        $scope.rejectPurchase = function() {
            $scope.rejected = true;
            $scope.showMessage = true;
           
            setTimeout(function() {
                $scope.showMessage = false;
            }, 5000);
        }
        
        $scope.purchaseItem = function(event) {
            var coins = Number(localStorage['shapesCoins']);
            var price = Number(angular.element(event.target).text());
            var item = angular.element(event.target).parent().parent().find('.item').html();

            if (coins > price) {
                angular.element(event.target).parent().html('Purchased');
                localStorage['shapesCoins'] = coins - price;
                $('#my-header .coins-badge').html(coins - price);
                $scope.approvePurchase();
                if ($scope.purchases.length) {
                    $scope.cart.push(item);
                    localStorage['shapePurchases'] = JSON.stringify($scope.purchases.concat($scope.cart));
                }
                else {
                    if ($scope.cart.indexOf(item) == -1) {
                        $scope.cart.push(item);
                        localStorage['shapePurchases'] = JSON.stringify($scope.cart);
                    }
                }
            }
            else {
                $scope.rejectPurchase();
            }
        }
    }]);
