$(document).ready(function(){
    //hamburger menu for phone	
	
    $(window).resize(function(){
        if(window.innerWidth < 768) {
            $("#logo").after('<div id="menu">&#9776;</div>');
            $("#menu").click(function() {
                $("#hamburger-nav").show();
            });
            $("#hamburger-nav li").click(function (){
                $("#hamburger-nav").hide();
            });  
        }
        else {
            $("#hamburger-nav").removeAttr("style");
        }
    });
    //hover shadow
    $('.shadow').hover(
        function() {
            $(this).fadeIn(1000, function() {
                $(this).addClass('hover');
            });
        },
        function() {
            $(this).removeClass('hover');
        }
    );
    //hover display skills text
    $('.devicon').each(function() {
        $(this).hover(
            function() {
                $(this).children('.devicon-text').fadeIn(1000);
            },
            function() {
                $(this).children('.devicon-text').fadeOut(1000);
            }
        );
    });
    
    $('.project').each(function() {
        $(this).hover(
            function() {
                $(this).children('.layer').slideDown(1000);
            },
            function() {
                $(this).children('.layer').slideUp(1000);
            }
        );
    });
    //scroll
    $('#nav a').each(function() {
        var $position = $(this).attr('href');
        $(this).click(function (evt) {
            evt.preventDefault();
            $('html, body').animate({
                scrollTop: $($position).offset().top
            },1000);
        });
    });
    
});