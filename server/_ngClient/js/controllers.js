myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {
 
    $scope.isActive = function(route) {
      return route === $location.path();
    }
 
    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);
 
myApp.controller("HomeCtrl", ['$scope',
  function($scope) {
    $scope.name = "Home Controller";
  }
]);

myApp.controller("ContactsCtrl", ['$scope', 'dataFactoryContacts',
  function($scope, dataFactoryContacts) {
    $scope.name = "Contacts Controller";
		
	    $scope.contacts = [];
 
    // Access the factory and get the latest contacts list
    dataFactoryContacts.getContacts().then(function(response) {
      $scope.contacts = response.data;
    });	
		
		
  }
]);

myApp.controller("UserAccountCtrl", ['$scope', 'dataFactoryUsers', 'AuthenticationFactory', 'Idle',
  function($scope, dataFactoryUsers,AuthenticationFactory, Idle	) {
    $scope.user = {};
      var userId = AuthenticationFactory.userId;
      dataFactoryUsers.getUsersAccountDetails(userId).then(function(response) {
      $scope.user = response.data;
						 // change Idle values, could read these from the users settings.
 
			 Idle.unwatch();
			 Idle.setIdle(600) ;
			 Idle.setTimeout(30);
			 Idle.watch();  
			
			 },
			 
			 function(error) { // error handler
			 $scope.error = error.data;
			 });
 

  }	
	]);


myApp.controller("Page1Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page1 Controller";
  }
]);

myApp.controller("Page2Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page2 Controller";
    // below data will be used by checkmark filter to show a ✓ or ✘ next to it
    $scope.list = ['yes', 'no', true, false, 1, 0];
  }
]);

myApp.controller("ProductsCtrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.products = [];
 
    // Access the factory and get the latest products list
    dataFactory.getProducts().then(function(data) {
      $scope.products = data.data;
    });
  }
]);
	
myApp.controller("UsersCtrl", ['$scope', 'dataFactoryUsers',
  function($scope, dataFactoryUsers) {
		// http://docs.sequelizejs.com/en/latest/docs/scopes/
	$scope.items = [
    'Alpha',
    'Beta',
    'Gamma'
  ];	
	
	$scope.enableAll = function()  // mysql update
	{
	    alert("implement me");
	}
	
	$scope.disableAll = function()  // mysql update
	{
	    alert("implement me");
	}
	
		$scope.deleteUser = function(userId)  // mysql update
	{
	    
			
					   dataFactoryUsers.deleteUser(userId).then(function(response) {
			        // not sql errors come back through the then
 
								if (response.data.affectedRows == 1)
								{
									    $scope.userResponse = response.data;
											getAllUsers();
											// do whatever
								}
								else
								{
									$scope.userResponse =  response.data
									// handle error state
								}
    });	
			
			
			
	}
	
 
	
	$scope.addUser = function()
	{
		 
		
					var testdata = {
							"name": "rlacey5",
							"username": "rlacey5@example.com",
							"password" : "pass5",  // hash and salt
							"salt" : "sfsdfsjfhggketcwetc",
							"token" : "",
							"role" : "user",
							"id": "5",
							"revokeToken" : true,
							"enabled": true,
							"timeout" : -1,
					}
			
		
		
	   dataFactoryUsers.saveUser(testdata).then(function(response) {
			 // not sql errors come back through the then
								
								
								if (response.data.affectedRows == 1)
								{
									    $scope.userResponse = response.data;
											getAllUsers();
											// do whatever
								}
								else
								{
									$scope.userResponse =  response.data
									// handle error state
								}
    });	
		
		
	}
	
	 $scope.status = {
    isopen: false
  };

  

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
		
		
    $scope.users = [];
 
    function getAllUsers()
		{
			// Access the factory and get the latest users list
			dataFactoryUsers.getUsersList().then(function(response) {
				if (response.data.errno) // we have an error
				{
				    $scope.errorMsg = response.data;
						// handle
				}
				else
				{
					 $scope.users = response.data;
				}
		})
		};
		
		getAllUsers(); // populate the view
  }	
	
]);