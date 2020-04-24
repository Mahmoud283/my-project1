
 $(document).ready(function(){
// start counter
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
// end counter
// nav icon
let h=$(".navbar").innerHeight();
$('body','html').css('paddingTop',h)
$(" nav a").click(function(){

	let aherf=$(this).attr("href")
	$(" nav a").removeClass("active")
	$(this).addClass("active")
	$("body ,html").animate({scrollTop:$(aherf).offset().top-h},2000)
})
// background change and fade the up and down button
$(window).scroll(function(){
	let fristbackground=$(".intro-cont h1").offset().top
	$("section").each(function(){
if($(window).scrollTop()>$(this).offset().top-h-1)
  {
	  let section_id=$(this).attr("id");
	  $(" nav a").removeClass("active")

	  $('.navbar-nav li a[href="#'+section_id+'"]').addClass("active")
	  
  }
	})
if($(window).scrollTop()>fristbackground)
{
	$("nav").removeClass(" bg-transparent")
		$("nav").addClass("bg-dark")
		$("#up").fadeIn(2000);
		$("#down").fadeIn(2000);


}
else
{

	$("nav").addClass(" bg-transparent")
		$("nav").removeClass("bg-dark")
		$("#up").fadeOut(2000);
		$("#down").fadeOut(2000);
}

})
// up and down
$("#up").click(function(){
	$("body,html").animate({scrollTop:'0px'},3000)
})

$("#down").click(function(){
	$("body,html").animate({scrollTop:$("#contact").offset().top
},3000)
})

$("#loading").fadeOut(4000,function(){
	$("body").css("overflow","auto")
})
 });

