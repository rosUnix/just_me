'use strict';

angular.module('justMeApp').controller('MainCtrl', function ($scope, $timeout) {

	$scope.socialNetworks = {
		'twitter': {
			'label': 'Twitter',
			'url_site': 'http://twitter.com/',
			'url_api': 'http://api.twitter.com/1.1/statuses/user_timeline.json'
		},
		'flickr': {
			'label': 'Flickr',
			'url_site': 'http://flickr.com/photos/',
			'url_api': 'http://api.flickr.com/services/rest/'
		},
		'github': {
			'label': 'Github',
			'url_site': 'http://github.com/',
			'url_api': 'http://api.github.com/'
		}
	};


	$scope.accounts = [];
	$scope.alerts = [];

	$scope.addEntry = function () {
		if ($scope._validate()) { $scope._addNewAccount(); }

		$scope.userName = '';
		$scope.socialNetwork = '';
	};

	$scope.removeEntry = function (index) {
		$scope.accounts.splice(index, 1);

		$scope._showMessage('alert-success', 'Success!', 'An entry has been removed');
	};

	$scope._validate = function () {
		var username = $scope.userName, result = false,
			network = $scope.socialNetworks[$scope.socialNetwork];

		if (!username) {
			$scope._showMessage('alert-error', 'Error!', 'Username must not be empty.');
		}
		if (!network) {
			$scope._showMessage('alert-error', 'Error!', 'Network must not be empty.');
		}

		if (username && network) {
			result = true;
			$scope.accounts.forEach( function (account) {
				if (network.label === account.network) {
					$scope._showMessage('', 'Warning!', 'There is already an ' + network.label + ' account defined');
					result = false;
				}
			});
		}

		return result;
	};

	$scope._showMessage = function (type, typeLabel, msg) {
		$scope.alerts.push({
			'type': type,
			'type_label': typeLabel,
			'label': msg
		});

		$timeout( function () {
			$scope.alerts.shift();
		}, 5000);
	};

	$scope._addNewAccount = function () {
		$scope.accounts.push({
			name: $scope.userName,
			network: $scope.socialNetworks[$scope.socialNetwork].label,
			url: $scope.socialNetworks[$scope.socialNetwork].url
		});

		$scope._showMessage('alert-success', 'Success!', 'A new entry has been created.');
	};
});