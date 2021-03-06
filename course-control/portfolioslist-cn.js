var portfoliodb = {

	'cn': {

		'portfolio001' : {
			'enabled':true,
			'name':'人工智能音乐作曲',
			'imageUrl':'img/my/portfo/AIMusic.png',
			'gradeLevel':'9年级',
			'text':'AI人工智能在人类生活中扮演着越来越多的角色，这首曲子就是由Coding Minds的同学用大量的歌曲训练出的AI算法模型所创作。快一起来感受智能时代的魅力吧',
			'tag':'人工智能系列',
			'detailsTitle':'详情',
			'detailsUrl':'stuportfo001-cn.html'
		},

		'portfolio002' : {
			'enabled':false,
			'name':'测试',
			'imageUrl':'img/my/portfo/AIMusic.png',
			'gradeLevel':'9年级',
			'text':'AI人工智能在人类生活中扮演着越来越多的角色，这首曲子就是由Coding Minds的同学用大量的歌曲训练出的AI算法模型所创作。快一起来感受智能时代的魅力吧',
			'tag':'人工智能系列',
			'detailsTitle':'详情',
			'detailsUrl':'stuportfo002-cn.html'
		},

		'portfolio003' : {
			'enabled':true,
			'name':'Blacklister',
			'imageUrl':'img/my/portfo/Blacklister.png',
			'gradeLevel':'12年级',
			'text':'视频网站在学生学习时很容易干扰注意力。为了防止这一问题，Coding Minds的同学用智能图像识别做出了一款应用，能自动屏蔽掉视频网站的影响。',
			'tag':'人工智能系列',
			'detailsTitle':'详情',
			'detailsUrl':'stuportfo003-cn.html'
		}
	}
}


angular.module('v3App', [])
  .config(function($sceProvider) {
    $sceProvider.enabled(false);    
  })
  .controller('PortfolioListController', function($scope) {
  	
  	$scope.portfolioList = [];
  	for(var key in portfoliodb.cn) {
  		if (portfoliodb.cn[key].enabled) {
	  		$scope.portfolioList.push(portfoliodb.cn[key]);
	  	}
	}

	$scope.getLength = function(obj) {
	    return Object.keys(obj).length;
	}

	$scope.portfoliodb = portfoliodb.cn;		
  });
