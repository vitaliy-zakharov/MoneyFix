/*Modernizr.load({
    load:   [
        'core/plugins/reset.css', 
        'core/main.css',
        'core/fonts/Geometria/MyFontsWebfontsKit.css',
        'core/plugins/animate/animate.css',
        'http://code.jquery.com/jquery-1.11.0.min.js',
        'core/plugins/fancybox/jquery.fancybox.pack.js',
        'core/plugins/fancybox/jquery.fancybox.css',
        'core/plugins/customSelect/jquery.customSelect.min.js'
    ],
    complete: function(){*/
        $(document).ready(function(){
            initSelect();
            initMobileNavigation();
            validateForm();
        
            var device = detectDevice();
            
            initMainAnimation(device)
            if($('body').hasClass('index')){
               initIndexAnimation(device);
            }
            if($('body').hasClass('team')){
               initDevTeamAnimations(device);
            }
            if($('body').hasClass('support')){
               initSupportAnimations(device);
            }
            if($('body').hasClass('faq')){
               initFaqAnimation(device);
            }
            if($('body').hasClass('features-page')){
               initFeatureAnimations(device);
            }
            
        });
        $(window).resize(function(){   
            var device = detectDevice();

            initMainAnimation(device)
            if($('body').hasClass('index')){
               initIndexAnimation(device);
            }
            if($('body').hasClass('team')){
               initDevTeamAnimations(device);
            }
            if($('body').hasClass('support')){
               initSupportAnimations(device);
            }
            if($('body').hasClass('faq')){
               initFaqAnimation(device);
            }
            if($('body').hasClass('features-page')){
              if(device == 'desktop' || device == 'tablet'){
                initFeatureAnimations(device);
              }
            } 
        });
        $(window).load(function(){
            $('.wrapper').css('opacity', 1);
        })
/*    }
})*/
function initFeatureAnimations(device){
    
    if(device == 'desktop'){
        var context = $('.js-features-items');
        var thisPage = $('.features-page');
        thisPage.removeClass('mobile').addClass('not-mobile');
         
        var navigation = $('.js-side-navigation', context);
        var hoverBlock = $('.hover', navigation);
        var link = $('a', navigation);
        var contents = $('.js-features-contents', context);
        var content = contents.children('div');
        var slider = $('.js-stat-slider', context);
        var scrollFlag;
        
        navigation.addClass('fadeIn animated delay5');
        contents.addClass('fadeIn animated delay5');
         
        link.on('mouseenter', function(){
            var pos = $(this).position().top;
            hoverBlock.css({opacity:1});
            hoverBlock.stop().animate({top:pos}, 400); 
        });
        navigation.on('mouseleave', function(){
            var pos = link.filter('.current').position().top;
            hoverBlock.stop().animate({top:pos}, 400);
        })
        link.each(function(){
            $(this).on('click', function(event){
                event.preventDefault();
                var element = $(this)
                var hash = element.attr('href');
                var target = $('[data-id="'+hash+'"]');

                link.removeClass('current');
                element.addClass('current');

                window.location.hash = hash;

                content.removeClass('current');
                target.addClass('current');
                
                $('body').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(){
                    scrollFlag = true;
                });
                var pos = link.filter('.current').position().top;
                hoverBlock.stop().animate({top:pos}, 400);
            })
        })
        function checkHash(){
            var hash = window.location.hash;
            if(hash){
                $(window).load(function(){
                    setTimeout(function(){
                        link.filter('[href="'+hash+'"]').trigger('click');
                    }, 1000);
                })

            }else{
                link.eq(0).trigger('click');
            }
        }
        checkHash();
        
        $('body').unbind().bind('mousewheel', function(e){
            if (scrollFlag){
                scrollFlag = false;
                if(e.originalEvent.wheelDelta /120  > 0) {
                    if(link.filter('.current').parent().prev().index() >= 0){
                        link.filter('.current').parent().prev().find('a').trigger('click');
                    }
                }
                else{
                    if(link.filter('.current').parent().next().index() <= link.filter('.current').parent().length){    
                        link.filter('.current').parent().next().find('a').trigger('click');
                    }
                }
            }
            
        });
        slider.each(function(){
            $(this).flexslider({
                animation: 'slide',
                directionNav: false,
                controlNav: true
            });
        });
        
    }
    if(device == 'tablet'){
        console.log('tablet')
        var context = $('.js-features-items');
        var thisPage = $('.features-page');
        thisPage.removeClass('mobile').addClass('not-mobile');
         
        var navigation = $('.js-features-2');
        var link = $('a', navigation);
        var contents = $('.js-features-contents', context);
        var content = contents.children('div');
        var slider = $('.js-stat-slider', context);
         
        navigation.addClass('fadeIn animated delay4');
        contents.addClass('fadeIn animated delay4');
         
        link.each(function(){
            $(this).on('click', function(event){
                event.preventDefault();
                var element = $(this)
                var hash = element.attr('href');
                var target = $('[data-id="'+hash+'"]');

                link.removeClass('current');
                element.addClass('current');

                window.location.hash = hash;

                content.removeClass('current');
                target.addClass('current');
            })
        })
        function checkHash(){
            var hash = window.location.hash;
            if(hash){
                $(window).load(function(){
                    setTimeout(function(){
                        link.filter('[href="'+hash+'"]').trigger('click');
                    }, 100000);
                })

            }else{
                link.eq(0).trigger('click');
            }
        }
        checkHash();
        $('body').unbind();
        slider.each(function(){
            $(this).flexslider({
                animation: 'slide',
                directionNav: false,
                controlNav: true
            });
        });
    }
    if(device == 'mobile'){
        var context = $('.js-features-items');
        var thisPage = $('.features-page');
        thisPage.removeClass('not-mobile').addClass('mobile');
         
        var navigation = $('.js-up-navigation');
        var link = $('a', navigation);
        var contents = $('.js-features-contents-mobile', context);
        var content = contents.children('div');
        var slider = $('.js-stat-slider', context);
        var prevTarget;
        
        navigation.addClass('fadeIn animated delay4');
        contents.addClass('fadeIn animated delay4');
        
        link.each(function(){
            $(this).on('click', function(event){
                event.preventDefault();
                var element = $(this)
                var hash = element.attr('href');
                var target = $('[data-id="'+hash+'"]');
                
                link.removeClass('current');
                element.addClass('current');

                window.location.hash = hash;

                content.removeClass('current');
                target.addClass('current');
                
                console.log(prevTarget);
                if (!prevTarget){
                    target.fadeIn(300);
                }else{  
                    prevTarget.fadeOut(300, function(){
                        target.fadeIn(300);

                    })
                }
                prevTarget = target;  
                
            })
        })
        
        function checkHash(){
            var hash = window.location.hash;
            if(hash){
                $(window).load(function(){
                    setTimeout(function(){
                        link.filter('[href="'+hash+'"]').trigger('click');
                    }, 1000);
                })

            }else{
                link.eq(0).trigger('click');
            }
        }
        checkHash();
        slider.each(function(){
            $(this).flexslider({
                animation: 'slide',
                directionNav: false,
                controlNav: true
            });
        });
    }
}
        
function initIndexAnimation(device){
    if (device == 'desktop' || device == 'tablet'){
        var textBlock = $('.js-index-info');
        var heading = $('h2', textBlock);
        var text = $('p', textBlock);
        var image = $('.js-index-image');
        var features = $('.js-features-desktop');
        var featuresItem = $('li', features);
        var appstoreTablet = $('.js-buy-appstore-tablet');
        
        heading.addClass('fadeInLeft animated delay4');
        text.addClass('fadeInLeft animated delay9');
        image.addClass('bounceIn animated delay9');
        appstoreTablet.addClass('fadeIn animated delay15');
        
        for(i = 0; i <= featuresItem.length; i++){
            featuresItem.eq(0 + i).addClass('fadeInUp animated delay' + (i+8));
        }
    }
    if (device == 'mobile'){
        var mobileInfo = $('.js-info-index-mobile');
        var mobileFeature = $('.js-mobile-features');
        
        mobileInfo.addClass('fadeIn animated delay4');
        mobileFeature.addClass('fadeIn animated delay7');
    }
}

function detectDevice(){
    var width = $(window).width();
    var device;
    
    if (width >= 1024){
        device = 'desktop';
        var thisHeight = $(window).outerHeight()-$('.header').outerHeight()-$('.footer').outerHeight();
        $('.content .container').css('height', thisHeight);
    }
    if (width < 1024 && width >= 640){
        device = 'tablet';
        $('.content .container').css('height', 'auto');
    }
    if (width < 640){
        device = 'mobile';
        $('.content .container').css('height', 'auto');
    }

    return device;
}


function initMobileNavigation(){
    var button = $('.js-mobile-btn');
    var source = $('.js-navigation');
    var target = $('.js-mobile-navigation');
    var social = $('.js-social');
    
    target.html(source.html());
    target.append('<ol>'+$("ul", social).html()+'</ol>');
    
    
    button.on('click', function(event){
        event.preventDefault();
        target.slideToggle();
        button.toggleClass('opened')
    })
    
    $(window).on('resize', function(){
       target.slideUp();
       button.removeClass('opened')
    })
}


function initSelect(){
    $('.js-custom-select').customSelect();
    var fakeSelect = $('.js-mobile-select');
    
    fakeSelect.each(function(){
        var context = $(this)
        var current = $('.js-current-theme', context);
        var list = $('.js-theme-list', context);
        var listItem = $('a', list);
        var field = $('.js-hidden', context)
        
        current.on('click', function(event){
            event.preventDefault();
            list.slideToggle(300);
        });
        listItem.on('click', function(event){
            event.preventDefault();
            current.text($(this).text());
            field.val($(this).text())
            list.slideUp();
        });
    })
}
function initMainAnimation(device){
    var body = $('body');
    var header = $('.header');
    var footer = $('.footer');
    var features = $('.js-features');

    header.addClass('fadeInDown animated');
    footer.addClass('fadeInUp animated');
    features.addClass('fadeInDown animated delay9');

    animationOut();
}

function animationOut(){
    $('.js-navigation, .js-mobile-navigation, .js-features-desktop, .js-features, .js-mobile-features, .js-logo').each(function(){
        var navigation = $(this);
        var link = $('a', this);

        link.on('click', function(event){
            event.preventDefault();
            var src = $(this).attr('href');
                for(i=0; i<=20; i++){
                    $('.delay'+i).removeClass('delay'+i);
                }
                $('.fadeInDown').addClass('fadeOutUp');
                $('.fadeInUp').addClass('fadeOutDown');
                $('.fadeInDownBig').addClass('fadeOutUpBig');
                $('.fadeInUpBig').addClass('fadeOutDownBig');
                $('.fadeInRightBig').addClass('fadeOutRightBig');
                $('.fadeInLeftBig').addClass('fadeOutLeftBig');
                $('.fadeInRight').addClass('fadeOutRight');
                $('.fadeInLeft').addClass('fadeOutLeft');
                $('.fadeIn').addClass('fadeOut');
                $('.bounceIn').addClass('fadeOut');
            
                $('.js-mobile-navigation').slideUp(200);
                $('.js-position-mobile').fadeOut(200);
                $('.js-question-list').fadeOut(200);
                $('.js-circle').fadeOut(200);
                $('.js-support-info').fadeOut(200);
                $('.js-features').fadeOut(200);
                $('.js-answers').fadeOut(200);
                $('.js-helped').fadeOut(200);
                $('.js-support').fadeOut(200);
            setTimeout(function(){
                window.location = src;
            }, 1000)

        })
    })
}
function initFaqAnimation(device){
    if (device == 'desktop'){
        var questionsContext = $('.js-questions');
        var question = $('li a', questionsContext);
        var answersContext = $('.js-answers');
        var answer = $('li', answersContext);
        var helped = $('.js-helped');
        var askSupport = $('.js-support')
        var yes = $('[href="#yes"]', helped)
        var no = $('[href="#no"]', helped)
        var checkVersion = $('.js-check-version');
        
        for(i = 0; i <= question.length; i++){
            question.eq(question.length - i).parent().addClass('fadeInDownBig animated delay' + i);
        }
        setTimeout(function(){
            question.eq(0).trigger('click');
        }, 2200)
        
        checkVersion.addClass('fadeInUpBig animated delay4');
        
        question.on('click', function(event){
            event.preventDefault();
            var element = $(this);
            var target = $(element.attr('href'));
            var others = $('li:not('+ element.attr('href') +')', answersContext);
            var helpTimer = 0;
            
            question.removeClass('current');
            element.addClass('current');
            askSupport.fadeOut(200, function(){
                helped.fadeOut(200, function(){
                    others.fadeOut(200, function(){
                        target.fadeIn(200, function(){
                            helped.fadeIn(200); 
                        });
                    });
                });
            })  
        })
        
        no.on('click', function(event){
            event.preventDefault();
            askSupport.fadeIn(300);
        });
        $('.form-name').focus();
    }
    
    if(device == 'mobile' || device == 'tablet'){
        var questionList = $('.js-question-list');
        var question = $('.question a', questionList);
        
        questionList.delay(1000).fadeIn(300);
        
        question.on('click', function(event){
            event.preventDefault();
            var element = $(this);
            var context = $(this).parents('li');
            var answer = $('.answer-body', context);
            var helped = $('.answer-helped-mobile', context);
            var no = $('[href="#no"]', helped)
            var ask = $('.ask-support-mobile', context);
            
            $('li.opened .answer-body').slideUp(300);
            $('li.opened .answer-helped-mobile').slideUp(300);
            $('li.opened .ask-support-mobile').slideUp(300);

            if (context.hasClass('opened')){
                helped.slideUp(300, function(){
                    ask.slideUp(300, function(){
                        answer.slideUp(300, function(){
                          $('li.opened').removeClass('opened');
                        });
                    });
                });
                    
                
            }else{
                answer.slideDown(300, function(){
                    $('li.opened').removeClass('opened');
                    context.addClass('opened'); 
                })
                helped.slideDown(300);
                no.on('click', function(event){
                    event.preventDefault();
                    ask.fadeIn(300);
                })
            }
        })
    }
}
function initDevTeamAnimations(device){    
    if (device == 'desktop'){
        var teamInfo = $('.js-team-info');
        var teamPhoto = $('.js-team-photo');
        var position = $('.js-position', teamPhoto);
        var photo1 = $('.js-photo-1', teamPhoto);
        var photo2 = $('.js-photo-2', teamPhoto);
        var man = $('.js-man', teamPhoto);
        var cub = $('.js-cub', teamPhoto);
        
        teamPhoto.addClass('fadeInRightBig animated delay2');
        teamInfo.addClass('fadeIn animated delay6');
        
        cub.hover(function(){
            $(this).parents('.team-photo').toggleClass('show');
        });

        cub.on('click', function(event){
            event.preventDefault();
        });

        man.each(function(){
            var currentMan = $(this);
            var target = $($(this).attr('href'));

            currentMan.hover(function(){
                target.addClass('show');
            }, function(){
                target.removeClass('show');
            });

            currentMan.on('click', function(event){
                event.preventDefault();
            });
        });
    }
    if (device == 'tablet') {
        var tabletInfo = $('.js-tablet-info');
        var tabletPhoto = $('.js-tablet-photo');
        var circle = $('.js-targets-tablet .js-circle');
        
        tabletInfo.addClass('fadeInLeft animated delay3');
        tabletPhoto.addClass('fadeInRight animated delay3');
        circle.addClass('fadeIn animated delay9');
        

        circle.each(function(){
            var button = $(this);
            button.fancybox({
                wrapCSS: 'custom-popup',
                padding: 0,
                helpers:{
                    overlay : {
                        locked : false
                    }
                }
            });
        });
    
    }
    if (device == 'mobile') {
        var teamInfoMobile = $('.js-team-info-mobile');
        var positionMobile = $('.js-position-mobile');
        var photo3 = $('.js-photo-3');
        var circle = $('.js-targets-desktop .js-circle');
        var close = $('.js-position-close', positionMobile)
        teamInfoMobile.addClass('fadeIn animated delay6');
        photo3.addClass('fadeInLeftBig animated delay2');
        circle.addClass('fadeIn animated delay9');
        
        var thisCookie = $.cookie('devTeamScrolled');
        
        if(!thisCookie && $('body').hasClass('team') ){
            setTimeout(function(){
                $(window).scrollTo('main', {offset:-1})
            }, 1000);
            $.cookie('devTeamScrolled', 'true');
        }
        circle.each(function(){
            var currentMan = $(this);
            var target = $($(this).attr('href'));
            
            currentMan.on('click', function(event){
                $(window).scrollTo('main', {offset:-1})
                event.preventDefault();
                target.fadeIn(300);   
                close.fadeIn(300);
            });
        });
        
        close.on('click', function(event){
            event.preventDefault();
            positionMobile.children().fadeOut(200);
            close.fadeOut(300);
        })
    }
    
}
function initSupportAnimations(device){
    if (device == 'desktop'){
        var formContext = $('.js-support-form');
        var info = $('.js-support-info');
        var formSend = $('.js-send', formContext);
        var formThank = $('.js-thank', formContext);
        
        
        formContext.addClass('fadeInLeftBig animated delay3');
        info.addClass('fadeInLeftBig animated delay8');

    }
    
    if (device == 'mobile' || device == 'tablet'){
        var formContext = $('.js-support-form-mobile');
        var formSend = $('.js-send', formContext);
        var formThank = $('.js-thank', formContext);


        
        formContext.addClass('fadeIn animated delay3');
   
        $( ".js-mobile-form" ).accordion({ 
            header: "a",
            collapsible: true 
        });
        
        /*theme.each(function(){
            var button = $(this);
            var context = button.parent();
            var form = $('.js-this-form', context);

            button.on('click', function(event){
                event.preventDefault();

                if(context.hasClass('current')){
                    form.slideUp(300);
                    context.removeClass('current')
                }else{
                    
                    form.slideDown(300, function(){
                        context.addClass('current')
                    });
                }
            });
        })*/
    }
    	
}
 function validateForm(){
    $('.js-validate-form').each(function(){
        
        var form = $(this);
        var formSend = $('.js-send', form);
        var formThank = $('.js-thank', form);
        var bigThank = $('.js-form-tnx');
        var close = $('.js-close', bigThank)
        
        
        close.on('click', function(event){
            event.preventDefault();
            bigThank.fadeOut(300, function(){
                form.parent().fadeIn(300);
            })
        })
        
        form.on('submit', function(event){
            event.preventDefault();
        });
        
        
        form.validate({
            onfocusout: false,
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                name: "Please specify your name",
                email: {
                  required: "We need your email address to contact you",
                  email: "Your email address must be in the format of name@domain.com"
                },
                message: {
                    required: "Please enter message",
                    minlength: "min length 5"
                }
            },
            submitHandler: function() {
                form.parent().fadeOut(300, function(){
                    bigThank.fadeIn(300);
                })
                //formSend.addClass('fadeOutRight animated delay3');
                //formThank.addClass('fadeInLeft animated delay3');
                
            }
        });
    })
}