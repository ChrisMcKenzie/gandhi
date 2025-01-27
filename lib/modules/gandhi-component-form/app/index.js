'use strict';


angular.module('gandhi-component-form', ['gandhi-component', 'schemaForm'])

.config(function(GandhiComponentProvider) {
	GandhiComponentProvider.components['form'] = {
		directive: 'gandhi-component-form'
	};
})

.directive('gandhiComponentForm', function() {
	return {
		scope: false,
		templateUrl: 'assets/bower/gandhi-component-form/app/index.html',
		controller: function($scope, $element, $attrs, $rootScope, Restangular, $state) {

			$scope.$watch('context', function(context) {

				if(!context.cycle || !context.project)
					return;

				$scope.stage = context.cycle.flow[context.stage];
				$scope.options = context.cycle.flow[context.stage].component.options;

				$scope.permissions = {
					read: context.role === null || ($scope.options.permissions.read ? $scope.options.permissions.read.indexOf(context.role) !== -1 : false),
					write: context.role === null || ($scope.options.permissions.write ? $scope.options.permissions.write.indexOf(context.role) !== -1 : false)
				}

				$scope.data = context.project.flow[context.stage].data;
				$scope.lock = context.project.flow[context.stage].lock;

				$scope.save = function(){
					var project = {flow:{}};
					project.flow[context.stage] = {
						id: context.stage,
						data: $scope.data,
						// status: 'draft'
					}

					context.project.patch(project).then(function(res){

						// update the project
						$rootScope.$broadcast('projects');

						alert('Changes successfully saved!');
					}, function(err){
						alert('Sorry, but there was an error saving your changes. Pleast contact us.');
					});
				}

				$scope.submit = function(form, model){

					console.log(form, model)

					// validate
					$scope.$broadcast('schemaFormValidate');
					if (!form.$valid)
					  return alert('Sorry, but there are errors the form. Please correct them before submitting.');

					var project = {flow:{}};
					project.flow[context.stage] = {
						id: context.stage,
						data: $scope.data,
						status: 'complete'
					}

					context.project.patch(project).then(function(res){

						// update the project lists
						$rootScope.$broadcast('projects');

						// update the project itself
						angular.extend(context.project, res);

						// redirect to the next stage
						$state.go('portal.projects.show.stage', {project: res.data.id, stage: $scope.options.next});


						alert('Successfully saved!');
					}, function(err){
						alert('Sorry, but there was an error submitting this application. Pleast contact us.');
					});
				}

			});
		}
	}
});

