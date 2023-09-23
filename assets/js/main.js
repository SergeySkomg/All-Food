(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

})(jQuery);


// Paralax
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);


//swiper 
const swiper = new Swiper('.swiper', {
  direction : 'horizontal',
  spaceBetween : 50,
  slidePerView : 3,
  loop : true,
  stopOnLastSlide : false,
  autoplay : {
    delay : 2000
  }
});


//hamburger 
$('.mobile_menu').click(function(){
  $('.main-menu').toggleClass('main-menu_active')
  $('.menu-wrapper').toggleClass('menu-wrapper_active')
})
  


//Tabs
$('.nav-item').on('click',function () {
  let currTab = $(this).index();
  
  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.tab-pane').removeClass('show');
  $('.tab-pane').eq(currTab).addClass('show');

  $('.tab-pane').removeClass('active');
  $('.tab-pane').eq(currTab).addClass('active');
})


// Modal window

$('.border-btn').on('click', function (event) {
  event.preventDefault()
  $('.modal-window').addClass('active');
  
  $('.overlay').on('click', function() {
    $('.modal-window').removeClass('active');
  })
});

//Validation form

//Передача инфо о кнопке в модальное окно
$(function() {
  $('button.btn-lg').click(function() {
      var parent = $(this).attr('data-parent');
      var modal = $(this).attr('data-target')
      $(modal).find('input[name=target]').val(parent);
  })
});

//Валидация и отправка формы

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
      e.preventDefault();
      $(this).parent('form').submit();
  })
  $.validator.addMethod(
      "regex",
      function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
      },
      "Please check your input."
  );

  // Функция валидации и вывода сообщений
  function valEl(el) {
      el.validate({
          rules: {
            phone: {
                  required: true,
                  regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
              },
              name: {
                  required: true
              },
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
            phone: {
                  required: 'Поле обязательно для заполнения',
                  regex: 'Телефон может содержать символы + - ()'
              },
              name: {
                  required: 'Поле обязательно для заполнения',
              },
              email: {
                  required: 'Поле обязательно для заполнения',
                  email: 'Неверный формат E-mail'
              }
          },

          // Начинаем проверку id="" формы
          submitHandler: function(form) {
              $('#preloader-active').fadeIn();
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                  // Если у формы id="goToNewPage" - делаем:
                  case 'popupResult':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function() {
                              //ссылка на страницу "спасибо" - редирект
                              location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                              //отправка целей в Я.Метрику и Google Analytics
                              ga('send', 'event', 'masterklass7', 'register');
                              yaCounter27714603.reachGoal('lm17lead');
                          });
                      break;
                  // Если у формы id="popupResult" - делаем:
                  case 'form-top':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize()
                          })
                          .done(function() {
                              console.log('Success');
                          })
                          .fail(function() {
                              console.log('Fail');
                          })
                          .always(function() {
                              console.log('Always');
                              setTimeout(function() {
                                  $('#message-for-user').fadeIn();
                                  $form.trigger('reset');
                                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                              }, 1100);
                              $('#message-for-user').on('click', function(e) {
                                  $(this).fadeOut();
                              });

                          });
                      break;
              }
              return false;
          }
      })
  }

  // Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.js-form').each(function() {
      valEl($(this));
  });
  
});