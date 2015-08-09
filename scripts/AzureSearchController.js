angular.module('app', ['ui.bootstrap']);

angular.module('app').controller("SearchController", function ($scope, $http) {
    var vm = this;
    vm.keywords = "";
    vm.APIVersion = "2015-02-28";
    vm.APIKey = "30B97A51E18E411071E37A63F8395DAC";
    vm.URL = "https://focus-days-2015.search.windows.net/indexes/appsservices/docs";
    vm.preparedURL = "";
    vm.showSearchResults = false;
    vm.title = "Azure Search Example";
    vm.type = "All";
    vm.results = [];
    vm.dataObject = {};
    var config = {
        headers: {
            'api-key': '30B97A51E18E411071E37A63F8395DAC',
            'Accept': 'application/json',
        }
    };
    vm.submit = function (item, event) {
    	                        
        if (vm.type == "Application"){
        	var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion + "&$filter=Typ eq 'Applikation'";
        }
        else{
        	if (vm.type == "ITService"){
            var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion + "&$filter=Typ ne 'Applikation'";
        	}
        	else{
        		var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion;
        	}
				}
        if (!isEmpty(vm.keywords))
        {
            var responsePromise = $http.get(URLstring, config, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
                vm.results = dataFromServer.value;
                vm.showSearchResults = true;
            });
            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });
        }
        else
        {
            vm.showSearchResults = false;
            vm.results = [];
        }
            
    }


});

angular.module('app').filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

function isEmpty(str)
{
    var isEmpty = false;
    if (!str)
        isEmpty = true;
    else
    {
        if (str.length == 0)
            isEmpty = true;
        else if (str.trim().length == 0)
            isEmpty = true;
    }
    return isEmpty;

}
