var app = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngAnimate','ngTouch','vAccordion'])
	.config(function($mdThemingProvider) {
	  })
    .controller('SwitchDemoCtrl', function($scope, $timeout, $mdDialog,$http,$mdSidenav,$interval) {
        $scope.data = {
            cb1: true,
            cb4: true,
            cb5: false
        };
		
  $scope.roles = ['Dealer Admin' ,'Receptionist' ,'Porter' ,'New Car Sales' ,'New Car Sales Manager', 'Used Car Sales','Used Car Sales Manager','F&I Manager','Kiosk'];
      $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      /* $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      }); */
        /* show popup starts*/
		
        $scope.showPopup = function(ev,htmlName) {


            $mdDialog.show({
                    controller: 'SwitchDemoCtrl',
                    templateUrl: htmlName+'.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
		                })



                .then(function(answer) {

                    $scope.status = 'You said the information was "' + answer + '".';

                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
				
        };
		/* show popup ends*/
		/* hide popup starts*/
        $scope.hidePopup =   function(ev)  {
            $mdDialog.cancel();

        };
		/* hide popup starts*/

       $scope.user = null;
        $scope.users = null;
		 $scope.loadUsers = function() {

            // Use timeout to simulate a 650ms request.
            return $timeout(function() {

                $scope.users = $scope.users || [{
                        id: 1,
                        name: 'FORD'
                    },
                    {
                        id: 2,
                        name: 'KEYWORD'
                    },
                    {
                        id: 3,
                        name: 'QR CODE'
                    },
					{
                        id: 4,
                        name: 'STOCK ID'
                    }

                ];
            }, 650);
			
        };
		var msgPopup = angular.element(".msgPopWrapper");

		/* hide msg popup starts*/
		$scope.hideMsgPopup = function(ev){
			msgPopup.css("display","none")
			angular.element(".addCutomRoleWrapper").css("display","none")
		}
		$scope.showMsgPopup = function(ev){
			msgPopup.css("display","block");
			var contLIst  = angular.element(".contLIst");
			var tabH = angular.element(".msgPopWrapper .nav-tabs").height();
			var msgH = angular.element(".msgPopWrapper .msgHeader").height();
			var newmsgH = windHeight - (tabH+msgH)-50;
			contLIst.css({"height":newmsgH+"px","overflow-y":"scroll"})
			//console.log(newmsgH+"hieeeeeee")
		}
		/* hide msg popup ends*/
	
        /* leftnav contriols stars*/
		var linkContainer = angular.element(".enterPriseLeftMenu .linkContainer ul li");
		var nav = angular.element("#nav");
		angular.element("#nav"+(linkContainer.length)).addClass("borderRight")
		angular.element(".linkContainer ul li").addClass("defaultBorder");
		$scope.showContent = function(ev,id){

			for(var i=0;i<linkContainer.length;i++){
				angular.element("#rightData"+(i+1)).css("display","none");
				angular.element("#nav"+(i+1)).removeClass("borderRight");
				angular.element("#nav"+(i+1)).addClass("defaultBorder");
			}
			console.log("id=="+id)
			angular.element("#rightData"+id).css("display","block");
			angular.element("#nav"+id).addClass("borderRight");
			angular.element("#nav"+id).removeClass("defaultBorder");

		}
		/* leftnav contriols ends*/	
		
		/*enterprise menu leftnav contriols stars*/
		var delaerLink = angular.element(".delaerLeftMenu .linkContainer ul li");
		var nav = angular.element("#navDelaer");
		angular.element("#navDelaer"+(delaerLink.length)).addClass("borderRight")
		angular.element(".delaerLeftMenu .linkContainer ul li").addClass("defaultBorder");
		/* for(var i=0;i<delaerLink.length;i++){
			angular.element("#rightDealerData"+(i+1)).css("display","none");
		} */
		$scope.showDealerContent = function(ev,id){

			for(var i=0;i<delaerLink.length;i++){
				angular.element("#rightDealerData"+(i+1)).css("display","none");
				angular.element("#navDelaer"+(i+1)).removeClass("borderRight");
				angular.element("#navDelaer"+(i+1)).addClass("defaultBorder");
			}
			console.log("id=="+id)
			angular.element("#rightDealerData"+id).css("display","block");
			angular.element("#navDelaer"+id).addClass("borderRight");
			angular.element("#navDelaer"+id).removeClass("defaultBorder");

		}
		/* enterprise menu leftnav contriols ends*/	
			
		/* subscrip contriols stars*/
		var subscrList = angular.element(".subscrList ul li");
		angular.element("#listR1").addClass("selectListBg");
		angular.element("#listR1 p").css("color","#22a3e6");
		for(var i=0;i<subscrList.length;i++){
				angular.element("#list"+(i+2)).css("display","none");
		}
		$scope.showsubContent = function(ev,id){
			
			for(var i=0;i<subscrList.length;i++){
				angular.element("#list"+(i+1)).css("display","none");
				angular.element("#listR"+(i+1)).removeClass("selectListBg");
				angular.element("#listR"+(i+1)+" p").css("color","#333");
			}
			angular.element("#list"+id).css("display","block");
			angular.element("#listR"+id).addClass("selectListBg");
			angular.element("#listR"+id+" p").css("color","#22a3e6");

		}
		/* subscrip contriols ends*/
		angular.element(".editBoxList").css("display","none");
		angular.element(".btnWrapper").css("display","none");
		
		$scope.showEditBox = function(ev){
			angular.element(".editBoxList").css("display","block");
			angular.element(".defaultName").css("display","none");
			angular.element(".addSubs").css("display","none");
			angular.element(".editBtn").css("display","none");
			angular.element(".btnWrapper").css("display","block");

		}
		//console.log(angular.element(".txt-center"))
		
		/*accordion stars*/
		/* var dropFlag = false;
		var dropMenu = angular.element(".msgPopWrapper .todayEvt span img")
		$scope.toggleMenu = function(ev){
			if(dropFlag == false){
				angular.element(".todayContainer").css("display","none");
				angular.element(".msgPopWrapper .todayEvt span img").css("transform","rotate(-45deg)")
				dropFlag = true;
			}else{
				angular.element(".todayContainer").css("display","block");
				angular.element(".msgPopWrapper .todayEvt span img").css("transform","rotate(0deg)");
				dropFlag = false;
			}
			
			
		} */

		/*accordion ends*/
		
	
			angular.element(".addnewPopWrapper").css("display","none")
			$scope.showEditpopup = function(ev){
				angular.element(".addnewPopWrapper").css("display","block")
			}
		
			/* toggle portal starts*/
			/* hideDelaerPortal();
			var togglePortal = false
			$scope.togglePortal = function(ev){
				if(togglePortal == false){
					showDelaerPortal();
					hideEnterPrise();
					togglePortal=true;
				}else{
					showEnterPrise();
					hideDelaerPortal();
					togglePortal=false;
				}
			}
			function showDelaerPortal(){
				angular.element(".delaerLeftMenu").css("display","block");
				angular.element(".delaerName").css("display","block")
			}
			function hideDelaerPortal(){
				angular.element(".delaerLeftMenu").css("display","none");
				angular.element(".delaerName").css("display","none")
			}
			function showEnterPrise(){
				angular.element(".enterPriseLeftMenu").css("display","block");
				angular.element(".delaerName").css("display","none")
			}
			function hideEnterPrise(){
				angular.element(".enterPriseLeftMenu").css("display","none");
			} */
			/* toggle portal ends*/
			var windHeight = window.innerHeight;
			
			$scope.showEditbasicPorter = function(ev){
				angular.element("#addBasicRoleWrapper").css("display","block");
				var subContent = angular.element("#addBasicRoleWrapper  .addRoleCnt");
				var subTitle = angular.element("#addBasicRoleWrapper .title").height();
				var input  = angular.element("#addBasicRoleWrapper .inputCtl").height();
				var addRoleHeader  = angular.element("#addBasicRoleWrapper .addRoleHeader").height();
				var btmWrapper = angular.element("#addBasicRoleWrapper .btmWrapper").height();
				var tempH = windHeight - ( subTitle + input  + addRoleHeader + btmWrapper)-60;
				subContent.css({ "height":tempH+"px","overflow-y":"scroll" })
				
			}
			
			/* add new subscription popup stars*/
			angular.element("#addNewSubscr").css("display","none");
			$scope.showAddSubscri = function(ev){
				angular.element("#addNewSubscr").css("display","block");
				var subContent = angular.element("#addNewSubscr  .settingConatiner .contentWrapper");
				var subTitle = angular.element("#addNewSubscr .title").height();
				var input  = angular.element("#addNewSubscr .input").height();
				var btmWrapper = angular.element("#addNewSubscr .btmWrapper").height();
				var tempH = windHeight - ( subTitle + input  + btmWrapper)-140;
				subContent.css({ "height":tempH+"px","overflow-y":"scroll" })
			}
			/* add new subscription popup ends*/
			
			/* user admin  starts */
			$scope.showUsrDetail = function(ev){
				angular.element("#delaerListH").css("display","none");
				angular.element("#usrListData").css("display","none");
				angular.element(".userViewWrpr").css("display","none");
			    angular.element("#userDeatail").css("display","block");
				angular.element(".roleDropCr").css("display","none");
			  }
			  $scope.backViewDeatail = function(ev){
				angular.element("#delaerListH").css("display","block");
				angular.element("#usrListData").css("display","block");
				angular.element("#userDeatail").css("display","none");
				angular.element(".userViewWrpr").css("display","block");
			  }
			  $scope.hideRoleDrop = function(ev){
				angular.element(".roleDropCr").css("display","none");
			  }
					
			$scope.showRoleDropdown = function(ev){
				 angular.element(".roleDropCr").css("display","block");
				 
			}	
			
			$scope.showEditProfile = function(ev){
				angular.element("#editProfile").css("display","block");
				var subContent = angular.element("#editProfile .addRoleHeader");
				var subTitle = angular.element("#editProfile .title").height();
				var input  = angular.element("#editProfile .profileWrper").height();
				var btmWrapper = angular.element("#editProfile .btmWrapper").height();
				var tempH = windHeight - ( subTitle + input  + btmWrapper)-100;
				subContent.css({ "height":tempH+"px","overflow-y":"scroll" })
				
				
			}
			  /* user admin  ends */
			  /* dealer admin starts */
			  $scope.showEditDealer = function(ev){
				  angular.element("#editDealerWrapper").css("display","block");
				  
			  }
			  $scope.showAddNewDealer = function(ev){
				   angular.element("#addNewDealerWrapper").css("display","block");
			  }
			  
			  /* dealer admin ends */
			  /* delaer bio starts */
			  $scope.showBioDetail = function(ev){
				   angular.element("#dealerBioDeatail").css("display","block");
				   angular.element(".dealerBio #delaerListH").css("display","none");
				   angular.element(".dealerBio #usrListData").css("display","none");
			  }
			$scope.backBioDeatail = function(ev){
				angular.element("#dealerBioDeatail").css("display","none");
			   angular.element(".dealerBio #delaerListH").css("display","block");
			   angular.element(".dealerBio #usrListData").css("display","block");
			}
			  /* delaer bio ends */
			  /*role admin starts*/
			  $scope.showAddRoleType = function(ev){
				    angular.element("#addRoleTypeWrapper").css("display","block");
					var subContent = angular.element("#addRoleTypeWrapper .addRoleCnt");
					var subTitle = angular.element("#addRoleTypeWrapper .title").height();
					var input  = angular.element("#addRoleTypeWrapper .inputCtl").height();
					var btmWrapper = angular.element("#addRoleTypeWrapper .btmWrapper").height();
					var tempH = windHeight - ( subTitle + input  + btmWrapper)-100;
					subContent.css({ "height":tempH+"px","overflow-y":"scroll" })
					
			  }
			 
			 /*add custom role popup starts*/
		
			angular.element(".rightCtnTogle").css("display","none");
			$scope.showAddRole = function(ev){
				angular.element("#addCutomRoleWrapper").css("display","block");
				
				/* dynamic height for add role popup starts */
				var addRoleCnt = angular.element("#addCutomRoleWrapper .addRoleCnt");
				var titleRole = angular.element("#addCutomRoleWrapper .title").height();
				var inputCtl = angular.element("#addCutomRoleWrapper .inputCtl").height();
				var addRoleHeader = angular.element("#addCutomRoleWrapper .addRoleHeader").height();
				var btmWrapper = angular.element("#addCutomRoleWrapper .btmWrapper").height();
				console.log(angular.element(".inputCtl").height()+"==title")
				var tempH = windHeight - ( titleRole + inputCtl + addRoleHeader + btmWrapper)-60;
				
				
				addRoleCnt.css({ "height":tempH+"px","overflow-y":"scroll" })
	 
				/* dynamic height for add role popup ends */
			}
			/*add custom popup ends*/
			  /*role admin ends*/
			  
			 /* Edit bio starts */
			 $scope.showEditBio = function(ev){
				 angular.element(".beforeEditBio").css("display","none");
				 angular.element("#editBioBtn").css("display","none");
				 angular.element(".afterEditBio").css("display","block");
				 angular.element(".btnWrapper").css("display","block");
				 var addRoleCnt = angular.element(".afterEditBio");
				var titleRole = angular.element("#addCutomRoleWrapper .title").height();
				var inputCtl = angular.element(".rightcontent .header").height();
				var addRoleHeader = angular.element(".msgContanier").height();
				var tempH = windHeight - ( titleRole + inputCtl + addRoleHeader)-60;
				addRoleCnt.css({ "height":tempH+"px","overflow-y":"scroll" })
			 }
			 /* Edit bio ends */
			
			/* role drop down list starts */
			roledropList = false;
			$scope.showRoleDrop = function(ev){
				ev.stopPropagation()
				if(roledropList == false){
					angular.element("#roleDropList ul").css("display","block");
					angular.element(".roleDrop .roleInput p").css("color","#444");
					roledropList=true;
				}else{
					angular.element("#roleDropList ul").css("display","none");
					angular.element(".roleDrop .roleInput p").css("color","#ddd");
					roledropList=false;
				}
			}
			/* role drop down list ends */
			/* show inventory starts */
			$scope.showInvetoryDetail = function(ev){
				angular.element("#extendedInventory").css("display","block");
				angular.element(".inventoryLanding").css("display","none");
			}
			$scope.backInventory = function(ev){
				angular.element("#extendedInventory").css("display","none");
				angular.element(".inventoryLanding").css("display","block");
			}
			/* show inventory ends */
			
			/* enterprise dashborad starts */
			printDrop = false
			$scope.showPrintDrop = function(ev){
				if(printDrop == false){
					angular.element("#printList").css("display","block");
					printDrop = true;
				}else{
					angular.element("#printList").css("display","none");
					printDrop = false;
				}
			}
			
			/* custom tab  starts*/
			var tabCount = 4;
			var id;
			var clikCount = 1;
			$scope.showCurrentTab = function(ev,id){
				for(var i = 1;i<=tabCount;i++){
					angular.element("#tab"+(i)).css("display","none");
					angular.element(".topNavTab ul li:nth-child("+(i)+")").css("border-bottom-color","#e5e5e5");
				}
				angular.element("#tab"+(id)).css("display","block");
				angular.element(".topNavTab ul li:nth-child("+(id)+")").css("border-bottom-color","#22a3e6");
				
				clikCount = id ;
				if(clikCount ==tabCount){
					$scope.nextDisable();
				}else if(clikCount == 1){
					$scope.prevDisable();
				}else{
					$scope.btnEnable();
				}
			}
			
			$scope.loadNextTab = function(ev){
				if(clikCount == tabCount){
					$scope.nextDisable();
				}else{
					$scope.btnEnable();
					clikCount++;
					if(clikCount == tabCount){
						$scope.nextDisable();
						//console.log("nextend");
					}
				}
				//console.log(clikCount+"==next")
				angular.element("#tab"+(clikCount)).css("display","block");
				angular.element("#tab"+(clikCount-1)).css("display","none");
				angular.element(".topNavTab ul li:nth-child("+(clikCount-1)+")").css("border-bottom-color","#e5e5e5");
				angular.element(".topNavTab ul li:nth-child("+clikCount+")").css("border-bottom-color","#22a3e6");
				ev.preventDefault(); 
				//currentId();
			}
			$scope.loadPrevTab = function(ev){
				if(clikCount == 1){
					$scope.prevDisable();
				}else{
					
					$scope.btnEnable();
					clikCount--;
					if(clikCount == 1){
						$scope.prevDisable();
					}
				}
				angular.element("#tab"+clikCount).css("display","block");
				angular.element("#tab"+(clikCount+1)).css("display","none");
				angular.element(".topNavTab ul li:nth-child("+(clikCount+1)+")").css("border-bottom-color","#e5e5e5");
				angular.element(".topNavTab ul li:nth-child("+(clikCount)+")").css("border-bottom-color","#22a3e6");
				ev.preventDefault();
				//console.log(clikCount+"==prev")				

			}
			
			$scope.nextDisable = function(){
				angular.element("#nextBtn").css({"opacity":"0.5","cursor":"auto"});
				angular.element("#prevBtn").css("opacity","1");
			}
			$scope.prevDisable = function(){
				angular.element("#prevBtn").css({"opacity":"0.5","cursor":"auto"});
				angular.element("#nextBtn").css("opacity","1");
			}
			$scope.btnEnable = function(){
				angular.element("#prevBtn").css("opacity","1");
				angular.element("#nextBtn").css("opacity","1");
			}
				/* custom tab  starts*/
			
			/* enterprise dashborad ends */
			
			
    });



var classNames = [];
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) classNames.push('device-ios');
if (navigator.userAgent.match(/android/i)) classNames.push('device-android');

var html = document.getElementsByTagName('html')[0];

if (classNames.length) classNames.push('on-device');
if (html.classList) html.classList.add.apply(html.classList, classNames);

 app.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.label}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
   app.directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { label: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })

  
    app.controller('AccordianController', function ($scope) {

      $scope.permissions = {};
      $scope.panesA = [
         {
          id: 'pane-1a',
          header: 'Dealer Admin',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		
		{
          id: 'pane-2a',
          header: 'Receptionist',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-3a',
          header: 'Porter',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-4a',
          header: 'New Car Sales',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-5a',
          header: 'New Car Sales Manager',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-6a',
          header: 'Used Car Sales',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-7a',
          header: 'Used Car Sales Manager',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		
		{
          id: 'pane-8a',
          header: 'F&L Manager',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        },
		{
          id: 'pane-9a',
          header: 'Kiosk',
          //content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["one", "two"]}, {"header": "table3Heading","value": ["2", "3"]}]
		  content: [{"header": "Role Type ","value": ["Basic", "Advanced"],"clickValue": [ 
			// Basic Data json 																		  
		[{label : 'Enterprise Manager', value : 1}, {label : 'Message Center', value : 1}, {label : 'Inventory Settings', value : 1},{label : 'User Administration', value : 1},{label : 'Role Administration', value : 1},{label : 'Inventory Search', value : 1}, {label : 'Exended inventory Search', value : 1},{label : 'Chat', value : 1}, {label : 'Help', value : 1}] ,
		// End  Basic Data Json
		//Advanced Data Json Starts
		[{label : 'Enterprise Manager 2 ', value : 1}, {label : 'Message Center 2 ', value : 1}, {label : 'Inventory Settings 2 ', value : 1}, {label : 'User Administration 2', value : 1}, {label : 'Role Administration 2', value : 1}, {label : 'Inventory Search 2', value : 1}, {label : 'Exended inventory Search 2', value : 1}, {label : 'Chat 2', value : 1}, {label : 'Help 2', value : 1}]
		
		
		 // End Advanced Data Json
		]}, {"header2": "PeopleAssigined","value2": ["04", "03"]}]
		  
		 
        }
        /*{
          id: 'pane-2a',
          header: 'Receptionist',
          content: [{"header": "table3Heading","value": ["value3", "value33"],"clickValue": ["three", "four"]}, {"header": "table3Heading","value": ["2", "3","3"]}]
        }
		{
          id: 'pane-3a',
          header: 'Porter',
          content: [{"header": "table1Heading","value": ["value1", "value2"],"clickValue": [5, 6]}, {"header": "table2Heading","value": ["value11", "value12"]}]
        },
		{
          id: 'pane-4a',
          header: 'New Car Sales',
          content: [{"header": "table1Heading","value": ["value1", "value2"],"clickValue": [6, 7]}, {"header": "table2Heading","value": ["value11", "value12"]}]
        }*/
		/*{
          id: 'pane-5a',
          header: 'New Car Sales Manager',
          content: [{"header": "table1Heading","value": ["value1", "value2"]}, {"header": "table2Heading","value": ["value11", "value12"]}]
        },
		{
          id: 'pane-6a',
          header: 'Used Car Sales',
          content: [{"header": "table1Heading","value": ["value1", "value2"]}, {"header": "table2Heading","value": ["value11", "value12"]}]
        },
		{
          id: 'pane-7a',
          header: 'Used Car Sales Manager',
          content:[{"header": "table1Heading","value": ["value1", "value2"]}, {"header": "table2Heading","value": ["value11", "value12"]}]
        }*/
      ];
	  
	 /* Hide Content */
	 $scope.hideMe = function(){
         $scope.show=true;
		 angular.element(".rightCtnTogle").css("display","block");
		 angular.element("h3.pleft-20").css("color","#333");
		 angular.element(".heading h3").css("color","#333");
       }
/*Show Right Pane Click Function*/
  $scope.showValue={};
 	$scope.currentPane=1;
	$scope.showRightPane=function(value){
		//alert(value)
//		console.log($scope.currentPane)
//		//$scope.currentPane=false;
//		$scope.showValue[value]=true;
//		$scope.showValue[$scope.currentPane]=false;
//		$scope.currentPane=value;
		$scope.permissions=value;
	}
      $scope.expandCallback = function (index, id) {
        console.log('expand:', index, id);
      };

      $scope.collapseCallback = function (index, id) {
        console.log('collapse:', index, id);
      };

      $scope.expandSubCallback = function (index, pane) {
        console.log(pane.$parent.subpane.moreContent.permission);
        $scope.permissions = pane.$parent.subpane.moreContent.permission;
        $scope.status = pane.$parent.subpane.moreContent.status;
      };

      $scope.collapseSubCallback = function (index, id) {
        console.log('collapse111111:', index, id);
      };

      $scope.$on('accordionA:onReady', function () {
        console.log('accordionA is ready!');
      });
	  


    });

	
	/* User Administration Tabel */
app.controller('userAdminCtrl', function($scope) {
 /*  $scope.dealersList = true;										 
  $scope.sortType = 'city'; // set the default sort type
  $scope.sortReverse = false; // set the default sort order
  $scope.searchform = ''; // set the default search/filter term

  // create the list of userTbl rolls 
  $scope.userTbl = [{
    subscription: 'Full North America',
    dealerName: 'Bob Maxey',
    city: 'Austin',
    emailId: 'bob.m@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532',
	 logo : 'http://localhost/Ford_New/April05/html_admin_04/html/images/fordLogo.png' 
   }, {
    subscription: 'Light North America ',
    dealerName: 'Fairllane Ford ',
    city: 'California',
    emailId: 'fairlane.f@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Full Russia',
    dealerName: 'Pat Milliken Foard',
    city: 'California',
    emailId: 'pat.m@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Light Russia',
    dealerName: 'Jorgensen Ford',
    city: 'Florida',
    emailId: 'jorgensen@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Full China',
    dealerName: 'Wolverine Ford',
    city: 'Florida',
    emailId: 'wolverine@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Light china',
    dealerName: 'Xavier Ford',
    city: 'Florida',
    emailId: 'xavier@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Light North America ',
    dealerName: 'Fairllane Ford ',
    city: 'California',
    emailId: 'fairlane.f@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Full Russia',
    dealerName: 'Pat Milliken Foard',
    city: 'California',
    emailId: 'pat.m@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Light Russia',
    dealerName: 'Jorgensen Ford',
    city: 'Florida',
    emailId: 'jorgensen@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Full China',
    dealerName: 'Wolverine Ford',
    city: 'Florida',
    emailId: 'wolverine@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }, {
    subscription: 'Light china',
    dealerName: 'Xavier Ford',
    city: 'Florida',
    emailId: 'xavier@ford.com',
    contactNumber: '(123)456-7890',
    dealerId: 'D-176532'
   }


  ];
  
  $scope.showDetail = function (data) {
	  $scope.dealersList = false;
	  $scope.dealerDetail = true;
	  $scope.dealer = data;
	  angular.element("#delaerListH").css("display","none");
	   angular.element("#delaerListData").css("display","none");
	    angular.element(".roleDropCr").css("display","none");
		  angular.element("#dealerDeatail").css("display","block");
		
  }	
  
  $scope.back = function (data) {
	  $scope.dealersList = true;
	  $scope.dealerDetail = false;
	  
  }	
  $scope.showUsrDetail = function(ev){
	   angular.element("#dealerDeatail").css("display","block");
	  angular.element(".roleDropCr").css("display","none");
  }
  $scope.backViewDeatail = function(ev){
	   angular.element("#delaerListH").css("display","block");
	   angular.element("#delaerListData").css("display","block");
	     angular.element("#dealerDeatail").css("display","none");
  }
  $scope.hideRoleDrop = function(ev){
	  angular.element(".roleDropCr").css("display","none");
  }
	 	
	$scope.showRoleDropdown = function(ev){
		 angular.element(".roleDropCr").css("display","block");
	}	
	
	$scope.showEditProfile = function(ev){
		angular.element("#editProfile").css("display","block");
	}
	 */
});


 /* End User Adminstration Tabel*/	
/* image picker starts */
$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});
/* image picker ends */
(document).onclick = function(ev) {
		ev.stopPropagation()
		if(roledropList == true){
			angular.element("#roleDropList ul").css("display","none");
			roledropList=false;
		}
}