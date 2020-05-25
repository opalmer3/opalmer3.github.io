//jshint esversion:6

// event listener for about animation
window.addEventListener('scroll', aboutSkillsAnimation);


// Expand/collapse navbar on click
document.querySelector("#toggler").addEventListener('click', () => {
  let navBar = document.querySelector('nav');
  let navMenu = document.querySelector(".nav-list");
  // If menu is up it is hidden
  if (navMenu.getAttribute('data-status') === 'up') {
    // Set nav width so it is visible
    navBar.setAttribute('style', 'width:100%');
    navMenu.classList.add('show-nav');
    navMenu.setAttribute('data-status', 'down');
  } else {
    navMenu.classList.remove('show-nav');
    //Remove nav width so it doesnt cover clickable elements after transition finished
    setTimeout(function() {
      navBar.removeAttribute('style');
    }, 500);

    navMenu.setAttribute('data-status', 'up');
  }
});


// add event listener to project tags div and filter projects based on user input
document.querySelector('.project-tags').addEventListener('click', e => {
  // save classes of element in array
  let classes = Array.from(e.target.classList);
  // If 'tag' is in the array then a tag was clicked
  if (classes.indexOf('tag') != -1) {
    // if the tag clicked is currently selected return and do nothing
    if (classes.indexOf('selected') != -1) {
      return false;
    }
    // Remove selected class from all other tag divs
    document.querySelectorAll('.tag').forEach(element => {
      element.classList.remove('selected');
    });
    // Add selectedclass to the clicked tag
    e.target.classList.add('selected');
  } else {
    return false;
  }

  // Get the tag selected
  let tag = e.target.getAttribute('data-tag');
  //if show all selected then show all else filter
  if (tag === 'all') {
    //load screen transition
    document.querySelector('.load-screen').setAttribute('style', 'display: flex');
    // wait a tiny bit to allow the flex display to be applied
    setTimeout(function() {
      document.querySelector('.load-left').classList.add('show-load');
      document.querySelector('.load-right').classList.add('show-load');
    }, 10);

    // Allow transition to finish before removing irrelevent projects
    setTimeout(function() {
      // Remove hide class
      document.querySelectorAll('.project-box').forEach(project => {
        project.classList.remove('hide');
      });
    }, 510);

    // Remove load screen
    setTimeout(function() {
      document.querySelector('.load-left').classList.remove('show-load');
      document.querySelector('.load-right').classList.remove('show-load');
    }, 510);

    // Allow load transition to finish before hiding to load screen
    setTimeout(function() {
      document.querySelector('.load-screen').removeAttribute('style');
    }, 1010);

  } else {
    // Iterate through projects
    document.querySelectorAll('.project-box').forEach(project => {
      // convert comma seperated string of words into array of words
      let tags = project.getAttribute('data-tags').split(',');

      // display load screen
      document.querySelector('.load-screen').setAttribute('style', 'display: flex');

      setTimeout(function() {
        document.querySelector('.load-left').classList.add('show-load');
        document.querySelector('.load-right').classList.add('show-load');
      }, 10);

      // allow time for transition to finish
      setTimeout(function() {
        // if selected tag not in array of tags then hide the project else show
        if (tags.indexOf(tag) == -1) {
          project.classList.add('hide');
        } else {
          project.classList.remove('hide');
        }
      }, 500);

      // remove load screen
      setTimeout(function() {
        document.querySelector('.load-left').classList.remove('show-load');
        document.querySelector('.load-right').classList.remove('show-load');
      }, 510);

      setTimeout(function() {
        document.querySelector('.load-screen').removeAttribute('style');
      }, 1010);
    });
  }
});


//scroll elements into view
document.querySelectorAll('.nav-item, .work-btn').forEach(element => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    // get section id from link / button
    let section = this.getAttribute('href') || this.querySelector('a').getAttribute('href');

    // get position of top of window
    let windowPosition = document.documentElement.scrollTop || document.body.scrollTop;
    //get position of sectionPosition relative to window
    let sectionPosition = document.querySelector(section).getBoundingClientRect().y;
    // get height of page content
    let body = document.body,
      html = document.documentElement;
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (sectionPosition > 0) {
      scrollSmooth(section, 'down', sectionPosition, windowPosition, height);
    } else if (sectionPosition < 0) {
      scrollSmooth(section, 'up', sectionPosition, windowPosition, height);
    }
  });
});

// scrolls up/down page smoothly until element is in view
function scrollSmooth(section, direction, sectionPosition, windowPosition, height) {
  // if contact section just scroll to the bottom
  if (section === '#contact') {
    // scroll down until window reaches bottom
    var refreshId = setInterval(function() {
      if (windowPosition != height) {
        window.scrollBy({
          top: 30
        });
        windowPosition = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
      } else {
        clearInterval(refreshId);
      }
    }, 1);
  } else {
    // scroll up/down until window positionpasses position of element
    if (direction === 'down') {
      let refreshId = setInterval(function() {
        if (sectionPosition < 6 && sectionPosition > -5) {
          clearInterval(refreshId);
        } else {
          window.scrollBy({
            top: 10
          });
          sectionPosition = document.querySelector(section).getBoundingClientRect().y;
        }
      }, 1);
    } else {
      let refreshId = setInterval(function() {
        if (sectionPosition < 6 && sectionPosition > -5) {
          clearInterval(refreshId);
        } else {
          window.scrollBy({
            top: -10
          });
          sectionPosition = document.querySelector(section).getBoundingClientRect().y;
        }
      }, 1);
    }
  }
}

// about section animation effect
function aboutSkillsAnimation(){
  // get position of sections relative to bottom of window
  let aboutPosition = document.querySelector('.about-info p').getBoundingClientRect().y - window.innerHeight;
  let skillsPosition = document.querySelector('.skills-wrapper').getBoundingClientRect().y - window.innerHeight +100;
  // if section position less than window position then about section is visible
  if (aboutPosition < 0){
    let elements = document.querySelectorAll('.about-info h3');
    for (var i =0; i<elements.length; i++){
      elements[i].classList.add('show-about');

      if (i === 0 || i === 2){
          elements[i].parentNode.querySelector('p').classList.add('show-about-left');
      }
      else{
          elements[i].parentNode.querySelector('p').classList.add('show-about-right');
      }
    }
  }

  if (skillsPosition < 0){
    document.querySelectorAll('.skill-box:nth-child(odd)').forEach(element=>{
      element.classList.add('show-skill-odd');
    });
    document.querySelectorAll('.skill-box:nth-child(even)').forEach(element=>{
      element.classList.add('show-skill-even');
    });
  }
}
