document.addEventListener('DOMContentLoaded', () => {

  // ====== СТОРИС МОДАЛ ======
  const storyTriggers = document.querySelectorAll('.promotion_item');
  const storiesModalOverlay = document.getElementById('storiesModalOverlay');
  const storiesSlides = document.getElementById('storiesSlides');
  const storiesIndicators = document.getElementById('storiesIndicators');
  const storiesClose = document.getElementById('storiesClose');

  let currentSlideIndex = 0;
  let storyTimer;
  const slideDuration = 15000; //15 секунд на слайд

  const slides = document.querySelectorAll('.story_slide');
  const totalSlides = slides.length;

  // Создаём индикаторы
  if (storiesIndicators.children.length === 0) {
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('story_indicator');
      storiesIndicators.appendChild(indicator);
    });
  }
  const indicators = document.querySelectorAll('.story_indicator');

  // 🔥 Основная функция
  const showSlide = (index) => {
    clearTimeout(storyTimer);

    // Сбрасываем предыдущие состояния
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => {
      ind.classList.remove('active');
      while (ind.firstChild) ind.removeChild(ind.firstChild);
    });

    currentSlideIndex = index;
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Создаём прогресс-бар с правильной длительностью
    const progress = document.createElement('div');
    progress.style.position = 'absolute';
    progress.style.top = '0';
    progress.style.left = '0';
    progress.style.height = '100%';
    progress.style.width = '0%';
    progress.style.backgroundColor = 'white';
    progress.style.transition = `width ${slideDuration}ms linear`;
    indicators[index].appendChild(progress);

    // Запускаем анимацию заполнения
    setTimeout(() => {
      progress.style.width = '100%';
    }, 10);

    // Позиционируем слайд
    storiesSlides.style.transform = `translateX(-${index * 100}%)`;

    // Таймер для следующего слайда
    storyTimer = setTimeout(() => {
      nextSlide();
    }, slideDuration);
  };

  const nextSlide = () => {
    const next = (currentSlideIndex + 1) % totalSlides;
    showSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  };

  // Управление прокруткой body
  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0'; // или добавьте компенсацию, если есть скроллбар
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  // Открытие
  storyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.currentTarget.dataset.slide, 10);
      if (slideIndex >= 0 && slideIndex < totalSlides) {
        storiesModalOverlay.style.display = 'flex';
        showSlide(slideIndex);
        disableBodyScroll(); // 🔒 блокируем прокрутку
      }
    });
  });

  // Закрытие
  const closeStories = () => {
    storiesModalOverlay.style.display = 'none';
    clearTimeout(storyTimer);
    enableBodyScroll(); // 🔓 разблокируем прокрутку
  };

  if (storiesClose) {
    storiesClose.addEventListener('click', closeStories);
  }

  storiesModalOverlay?.addEventListener('click', (e) => {
    if (e.target === storiesModalOverlay) {
      closeStories();
    }
  });

  // Навигация по краям
  const storiesContainer = storiesModalOverlay?.querySelector('.stories-container');
  if (storiesContainer && !storiesContainer.querySelector('.story-nav-left')) {
    const navLeft = document.createElement('div');
    navLeft.className = 'story_nav_left';
    storiesContainer.appendChild(navLeft);

    const navRight = document.createElement('div');
    navRight.className = 'story_nav_right';
    storiesContainer.appendChild(navRight);

    navLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    navRight.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

  // Свайпы
  let startX = 0;
  storiesSlides?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  storiesSlides?.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  });
  
  //МОДАЛ "О ХИРУРГЕ"
  const ReadMore = document.getElementById('readMore');
  const modalOverlay = document.getElementById('modalAboutOverlay');
  const modalContent = document.querySelector('.modal_about_content')
  const modalClose = document.getElementById('modalAboutClose');
  const body = document.body;

  ReadMore.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    setTimeout(() => {
      modalContent.classList.add('show');
    }, 10);
    body.classList.add('no-scroll');
  });

  const hideModal = () => {
    modalContent.classList.remove('show');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
    body.classList.remove('no-scroll');
  };

  modalClose.addEventListener('click', hideModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      hideModal();
    }
  }); 
  
  //МОДАЛ "НАГРАДЫ"
  const SeeAllBtn = document.getElementById('SeeAllBtn');
  const modalOverlay2 = document.getElementById('modalOverlay');
  const modalContent2 = document.querySelector('.modal_content');
  const modalClose2 = document.getElementById('modalClose');

  SeeAllBtn.addEventListener('click', () => {
    modalOverlay2.style.display = 'flex';
    setTimeout(() => {
      modalContent2.classList.add('show');
    }, 10);
    body.classList.add('no-scroll');
  });

  const hideModal2 = () => {
    modalContent2.classList.remove('show');
    setTimeout(() => {
      modalOverlay2.style.display = 'none';
    }, 300);
    body.classList.remove('no-scroll');
  };

  modalClose2.addEventListener('click', hideModal2);

  modalOverlay2.addEventListener('click', (e) => {
    if (e.target === modalOverlay2) {
      hideModal();
    }
  });
});