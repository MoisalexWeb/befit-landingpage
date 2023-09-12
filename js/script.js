const header = document.querySelector(".header"),
	body = document.body,
	menu = document.querySelector(".nav__menu"),
	aboutImg = document.querySelector(".about__figure-img"),
	sections = [...document.querySelectorAll("section")],
	form = document.querySelector(".register__form");

menu.style.transition = 'transform 0.3s ease';

// For scroll animation
AOS.init();

// Expression for validate form's fields
const expression = {
	name: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/,
  	lastName: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/,
  	email: /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4}$/,
  	number: /^[0-9]+$/,
 	message: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 .,;:]*$/
};



/*
	*************
	* FUNCTIONS *
	*************
*/

// Change nav styles
const changeNav = () => {
	if (window.scrollY >= 120) header.classList.add("header-2")
	else header.classList.remove("header-2")
}

// Scroll spy
const scrollSpy = () => {
	const scrollY = window.pageYOffset

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight,
            sectionTop = section.offsetTop - 50,
            sectionId = section.id,
            sectionLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        	sectionLink.classList.add('active-section')
        } else sectionLink.classList.remove('active-section');
    });
}

// Remove transition from menu when view port width is at less 768px
const responsiveStylesMenu = () => {
	const breakpoint = window.matchMedia("(min-width: 900px)")

	const responsive = e => {
		if (e.matches) {
			menu.removeAttribute("style")
			body.classList.remove("active-menu")
		}
		else menu.style.transition = 'transform 0.3s ease';
	}

	breakpoint.addListener(responsive)
	responsive(breakpoint)
}

// Validate form
const validateForm = (exp, field, max, min) => {
	const error = field.nextElementSibling;

	// Email
	if (exp === 'email') {
		if (!expression.email.test(field.value)) {			
			error.style.display = "block"
			error.textContent = `Please, enter a valid ${field.getAttribute('name')} (domain between 2 and 4 characters)`
			return;
		}		
	}

	if (exp === 'name') {
		if (!expression.name.test(field.value)) {			
			error.style.display = "block"
			error.textContent = `Please, enter a valid ${field.getAttribute('name')} (letters only)`
			return;
		}
	}

	if (exp === 'lastName') {
		if (!expression.lastName.test(field.value)) {			
			error.style.display = "block"
			error.textContent = `Please, enter a valid ${field.getAttribute('name')} (letters only)`
			return;
		}
	}

	if (exp === 'number') {
		if (!expression.number.test(field.value)) {			
			error.style.display = "block"
			error.textContent = `Please, enter a valid ${field.getAttribute('name')}`
			return;
		}
	}

	if (exp === 'message') {
		if (!expression.message.test(field.value)) {			
			error.style.display = "block"
			error.textContent = `Please, enter a valid ${field.getAttribute('name')}`
			return;
		}
	}


	if (field.value.length < min) {			
		error.style.display = "block"
		error.textContent = `Enter a ${field.getAttribute('name')} with at least ${min} characters`
		return;
	}

	if (field.value.length > max) {
		error.style.display = "block"
		error.textContent = `Please, enter a ${field.getAttribute('name')} with a max of ${max} characters`
		return
	}

	error.removeAttribute("style")
}

// regular expressions 

/*
	*************
	* LISTENERS *
	*************
*/

// Form validation
form.addEventListener('submit', e => {
	e.preventDefault();
	validateForm('email', form.email, 35, 10)
	validateForm('name', form.name, 10, 4)
	validateForm('lastName', form.lastname, 20, 4)
	validateForm('number', form.number, 11, 11)
	validateForm('message', form.message, 300, 30)
})


// Add hover effect to about image 
aboutImg.addEventListener('mousemove', (e) => {
	let height = aboutImg.clientHeight
    let width = aboutImg.clientWidth
    const {layerX,layerY} = e
    const rotationY = ((layerX - width / 2) / width) * 20
    const rotationX = ((layerY - height / 2) / height) * 20
    const styles = `perspective(500px) scale(1.02) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`

    aboutImg.style.transform = styles
})

// Remove hover effect to about image 
aboutImg.addEventListener('mouseout', () => {
    aboutImg.removeAttribute('style')
})

// Show and hide menu
document.addEventListener('click', e => {
	if (e.target.matches(".nav__hamburger")) {
		body.classList.toggle("active-menu")
	}
	
	else if (e.target.matches(".nav__menu-link")) {
		body.classList.remove("active-menu")
	}
})

window.addEventListener('scroll', () => {
	changeNav()
	scrollSpy()
})

document.addEventListener('DOMContentLoaded', () => {
	changeNav()
	scrollSpy()
	responsiveStylesMenu()
})

window.addEventListener('resize', () => {
	responsiveStylesMenu()
})