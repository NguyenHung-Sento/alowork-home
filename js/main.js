// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      mainNav.classList.toggle('open');
    });
  }

   // Header scroll effect and Back to Top functionality
    const header = document.querySelector('.site-header');
    const backToTopBtn = document.getElementById('backToTop');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background effect
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        var el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Set active nav link based on current page
  const currentHref = window.location.href;
  let currentPage = currentHref.split('/').pop().split('?')[0] || 'index.html';
  if (currentPage === '') currentPage = 'index.html';
  const navLinks = document.querySelectorAll('#main-nav a[href]');
  
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Contact form with modal confirmation
  var contactForm = document.getElementById('contact-form');
  var modal = document.getElementById('modal');
  var modalCancel = document.getElementById('modal-cancel');
  var modalConfirm = document.getElementById('modal-confirm');
  var toast = document.getElementById('toast');

  function showModal(){
    modal.setAttribute('aria-hidden','false');
  }
  function hideModal(){
    modal.setAttribute('aria-hidden','true');
  }
  function showToast(msg){
    toast.textContent = msg;
    toast.setAttribute('aria-hidden','false');
    setTimeout(function(){ toast.setAttribute('aria-hidden','true'); }, 3500);
  }

  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      // basic validation: only email + message required
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      if(!email.value.trim() || !message.value.trim()){
        showToast('Vui lòng điền email và nội dung yêu cầu.');
        return;
      }
      // email format
      var emailRe = /^\S+@\S+\.\S+$/;
      if(!emailRe.test(email.value)){
        showToast('Email không hợp lệ');
        return;
      }
      showModal();
    });
  }

  if(modalCancel) modalCancel.addEventListener('click', hideModal);
  if(modalConfirm){
    modalConfirm.addEventListener('click', function(){
      hideModal();
      // simulate submit
      setTimeout(function(){
        showToast('Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ trong 24h.');
        if(contactForm) contactForm.reset();
      }, 600);
    });
  }

});