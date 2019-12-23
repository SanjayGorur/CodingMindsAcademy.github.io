angular.module('v3App', ['ngMaterial'])
  .config(function($sceProvider) {
    $sceProvider.enabled(false);    
  })
  .controller('FeedbackController', function($scope, $location, $mdToast, $http) {
    
    $scope.compList = [];
    $scope.cn_courseday = function(day) {
      switch(day.split(' ')[0]) {
        case 'Monday': return '每周一' + ' ' + day.split(' ')[1];
        case 'Tuesday': return '每周二' + ' ' + day.split(' ')[1];
        case 'Wednesday': return '每周三' + ' ' + day.split(' ')[1];
        case 'Thursday': return '每周四' + ' ' + day.split(' ')[1];
        case 'Friday': return '每周五' + ' ' + day.split(' ')[1];
        case 'Saturday': return '每周六' + ' ' + day.split(' ')[1];
        case 'Sunday': return '每周日' + ' ' + day.split(' ')[1];
      }
    }
    for(var key in competitionMap) {      
      $scope.compList.push(competitionMap[key]);
    }
    var url = $location.$$absUrl;
    $scope.currentUrl = url;
    $scope.stuid = $scope.currentUrl.slice($scope.currentUrl.indexOf('=')+1, url.length);
    $scope.courseListIrvine = irvinedb;
    $scope.courseListArcadia = arcadiadb;
    $scope.courseListOnline = onlinedb;
    $scope.stuName = id_student[$scope.stuid].firstName;
    $scope.lastName = id_student[$scope.stuid].lastName;
    $scope.email2 = id_student[$scope.stuid].email2;
    $scope.phone2 = id_student[$scope.stuid].phone2;

    var suggestedCourses;
    $scope.suggestedCourses = [];
    $scope.courseLevel;
    if (irvineStuList.includes($scope.stuid)){

        $scope.campus = "Irvine校区"
        $scope.courseList = irvinedb;
        suggestedCourses = id_courses[$scope.stuid];
        // console.log($scope.suggestedCourses);
        irvinedb.forEach(course=>{
            if(suggestedCourses.includes(course.courseCode)){
                $scope.courseLevel = course.gradeLevel;
                $scope.suggestedCourses.push(course);
            }
        });
    }else{

        $scope.campus = "Arcadia校区";
        $scope.courseList = arcadiadb;

        suggestedCourses = id_courses[$scope.stuid];
        // console.log($scope.suggestedCourses);
        arcadiadb.forEach(course=>{
            if(suggestedCourses.includes(course.courseCode)){
                $scope.courseLevel = course.gradeLevel;
                $scope.suggestedCourses.push(course);
            }
        });
    }

    $scope.submit = function (courseId) {
      $(`#${courseId}`).removeClass('modal-active');

      var displayToast = function (type) {
        let msg = '';
        let time = 5000;
        switch (type) {
          case 'success': {
            msg = '注册成功！我们会在开课前与您联系！';
            break;
          }
          case 'error': {
            msg = '<i class="icon icon-sm icon-Coding" style="font-size: 2em;"></i> &nbsp;注册失败 请再次尝试或&nbsp;<a href="contact-us-cn.html" target="_blank">联系我们</a>';
            time = 0;
            break;
          }
        }
        $mdToast.show({
          template: '<md-toast layout="row" class="md-toast ' + type + '">' + msg  + '<a href="#" ng-click="closeToast()" style="color:white;padding-left:2em;text-decoration:none;">X</a></md-toast>',
          hideDelay: time,
          position: 'bottom',
          controller: 'ToastController',
          parent: document.getElementById('toast-container')
        }).then(function () {
          // console.log('Toast dismissed.');
        }).catch(function () {
          // console.log('Toast failed or was forced to close early by another toast.');
        });
      }
      $http({
        method: 'PUT',
        url: `https://prod-sharemyworks-backend.herokuapp.com/api/Course/${courseId}/students/rel/${$scope.stuid}`,
        headers: {
          'Authorization': 'GJHhzSRGoHJsiQPWHp4aRmupLuBWONQ4FnLmZ439nRqdghPheaQo9kj3X2ChqSn9'
        }
      }).then(function successCallback(response) {
        console.log('enrolled to course', response);
        displayToast('success');
      }, function errorCallback(response) {
        displayToast('error');
        console.log(response);
        // console.log("Not yet notified, therefore no logId!");
      });
    }
      // $scope.courseLevel = 'true';
        // console.log($scope.courseLevel);
    // $scope.stuid = stuid;
      $(function () {
    $masonry = $('.masonry1').masonry({
      isAnimated: true,
      itemSelector: 'div.masonry__item',
      horizontalOrder: true,
      originLeft: true,
      originTop: true
      });

    window.onload = function(){ 
      $masonry.masonry('layout');
    }

    $('a.toggle_schedule').click(function() {
      $(this).closest('div.card').find('.course_schedule').toggle();
      $masonry.masonry('layout');
        return false;
    });
  });
  })
  .controller('ToastController', function ($scope, $mdToast) {
    $scope.closeToast = function () {
      $mdToast.hide();
    };
  });

