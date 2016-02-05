/* This JavaScript file is devoted to the logic behind the shop */

angular.module('my-app')
    .controller('shopController', ['$scope', function($scope) {
        $scope.purchases = JSON.parse(localStorage['purchases']);
        $scope.showMessage = false;
        $scope.rejected = false;
        $scope.purchased = function(item) {
            return $scope.purchases.indexOf(item) < 0;
        }
        
        $scope.orange = 'orange';
        var cart = [];
        $scope.patterns = [
                            { 'name': 'Orange Snake',         'price': 10,  'color': 'orange'  },
                            { 'name': 'Red Snake',            'price': 10,  'color': 'red'     },
                            { 'name': 'Green Snake',          'price': 15,  'color': 'green'   },
                            { 'name': 'Purple Snake',         'price': 15,  'color': 'purple'  },
                            { 'name': 'Crimson Snake',        'price': 20,  'color': 'crimson' },
                            { 'name': 'Indigo Snake',         'price': 20,  'color': 'indigo'  },
                            { 'name': 'Violet Snake',         'price': 30,  'color': 'violet'  },
                            { 'name': 'Black Snake',          'price': 50,  'color': 'black'   },
                            { 'name': 'Red Green Snake',      'price': 50,  'color': 'red'     },
                            { 'name': 'Black Silver Serpent', 'price': 70,  'color': 'silver'  },
                            { 'name': 'Pink Violet Dragon',   'price': 200, 'color': 'pink'    },
                            { 'name': 'Gold Maroon Dragon',   'price': 500, 'color': 'gold'    }
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
            var coins = Number(localStorage['coins']);
            var price = Number(angular.element(event.target).text());
            var item = angular.element(event.target).parent().parent().find('.item').html();

            if (coins > price) {
                angular.element(event.target).parent().html('Purchased');
                localStorage['coins'] = coins - price;
                $('nav .coins-badge').html(coins - price);
                $scope.approvePurchase();
                
                if (item.split(' ').length == 2) {
                    var color = item.split(' ')[0];
                    localStorage['snake'] = JSON.stringify({ 'color': color, 'type': 'regular' });
                }
                else {
                    var color = item.split(' ').slice(0, -1).join(' ');
                    localStorage['snake'] = JSON.stringify({ 'color': color, 'type': 'gradient' });
                }
                
                if ($scope.purchases.length) {
                    cart.push(item);
                    localStorage['purchases'] = JSON.stringify($scope.purchases.concat(cart));
                }
                else {
                    if (cart.indexOf(item) < 0) {
                        cart.push(item);
                        localStorage['purchases'] = JSON.stringify(cart);
                    }
                }
            }
            else {
                $scope.rejectPurchase();
            }
        }
    }]);
