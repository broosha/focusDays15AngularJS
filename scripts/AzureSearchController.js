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
    
    $scope.facets = [
    { id:1,name:'AccessService'},
    { id:2,name:'Applikation'}, 
    { id:3,name:'BulkInterface'},
    { id:4,name:'Fachbegriff'},
    { id:5,name:'PresentationService'},
    { id:6,name:'Projekt'},
    { id:7,name:'SoaService'},
    { id:8,name:'undefined'}
    ]
    
    
    vm.submit = function (item, event) {
    	  
    	  var filterstring = '';
				if (vm.AccessService == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'AccessService'";
					}else{
						filterstring = filterstring + " or Typ eq 'AccessService'";
					}
				}
				if (vm.Applikation == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'Applikation'";
					}else{
						filterstring = filterstring + " or Typ eq 'Applikation'";
					}
				}
				if (vm.BulkInterface == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'BulkInterface'";
					}else{
						filterstring = filterstring + " or Typ eq 'BulkInterface'";
					}
				}
				if (vm.Fachbegriff == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'Fachbegriff'";
					}else{
						filterstring = filterstring + " or Typ eq 'Fachbegriff'";
					}
				}
				if (vm.PresentationService == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'PresentationService'";
					}else{
						filterstring = filterstring + " or Typ eq 'PresentationService'";
					}
				}
				if (vm.Projekt == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'Projekt'";
					}else{
						filterstring = filterstring + " or Typ eq 'Projekt'";
					}
				}
				if (vm.SoaService == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'SoaService'";
					}else{
						filterstring = filterstring + " or Typ eq 'SoaService'";
					}
				}
				if (vm.undefined == true) {
					if (filterstring == '') {
						filterstring = "&$filter=Typ eq 'undefined'";
					}else{
						filterstring = filterstring + " or Typ eq 'undefined'";
					}
				}
			
    	  
    	 var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion + filterstring;
    	               
        //if (vm.Application == true){
        //	var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion + "&$filter=Typ eq 'Applikation'";
        //}
        //else{
        //	if (vm.ITService == true){
        //    var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion + "&$filter=Typ eq 'SoaService'";
        //	}
        //	else{
        //		var URLstring = vm.URL + "?search=" + vm.keywords + "&api-version=" + vm.APIVersion;
        //	}
				//}
				console.log(URLstring);
				
				
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
