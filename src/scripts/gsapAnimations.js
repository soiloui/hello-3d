import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

const gsapAnimate = () =>
	(function () {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

		const firstIntro = gsap
			.timeline()
			.from(
				'.section--first h1 span',
				{
					duration: 1.5,
					delay: 1,
					opacity: 0,
					y: '-50%',
					ease: 'power1',
					stagger: 0.15,
				},
				0
			)
			.from(
				'.section--first .dialog img',
				{
					delay: 1.5,
					duration: 1.5,
					opacity: 0,
					y: '-90%',
					rotateX: '30',
					transformOrigin: 'bottom',
					ease: 'power1',
				},
				1
			)
			.from(
				'.section--first .dialog span',
				{
					delay: 1,
					duration: 1.5,
					opacity: 0,
					y: '-50%',
					ease: 'power1',
					stagger: 0.25,
				},
				2
			);

		const secondIntro = gsap
			.timeline({ repeat: -1, repeatDelay: 2 })
			.to('.section--first .dialog img', {
				duration: 0.4,
				opacity: 0.5,
				y: '20%',
				ease: 'power1',
			})
			.to('.section--first .dialog img', {
				duration: 0.4,
				opacity: 1,
				y: '0',
				ease: 'power1',
			});

		const masterIntro = gsap.timeline();
		masterIntro.add(firstIntro).add(secondIntro);

		const rocketBody = gsap.fromTo(
			'.section--first .rocket__body',
			{ scale: 0.99, rotation: 1 },
			{ scale: 1.01, rotation: -2, y: '+=4', repeat: -1, yoyo: true }
		);
		const rocketFireOutside = gsap.to('.section--first .rocket__outside-fire', {
			duration: 0.5,
			scale: 1.05,
			x: '-20%',
			y: '20%',
			opacity: 0,
			repeat: -1,
		});
		const rocketFireInside = gsap.to('.section--first .rocket__inside-fire', {
			duration: 0.6,
			delay: 0.2,
			scale: 1.05,
			x: '-50%',
			y: '50%',
			opacity: 0,
			repeat: -1,
		});
		const rocketFireLast = gsap.to('.section--first .rocket__last-fire', {
			duration: 0.45,
			delay: 0.1,
			scale: 1.05,
			x: '-90%',
			y: '90%',
			opacity: 0,
			repeat: -1,
		});

		const firstSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--first',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 0.8,
				onEnter: () => secondIntro.progress(1).kill(),
			},
		});

		firstSection
			.to(
				'.section--first .dialog__first',
				{
					duration: 5,
					scale: 0.2,
					autoAlpha: 0,
					rotation: '180',
					ease: 'power1',
				},
				0
			)
			.from(
				'.section--first canvas',
				{
					duration: 10,
					scale: 0.2,
					autoAlpha: 0,
					rotation: '360',
					ease: 'power1',
				},
				0
			)
			.from(
				'.section--first h1',
				{
					duration: 8,
					delay: 1,
					scale: 0.5,
					x: '-40%',
					ease: 'power1',
				},
				0
			)
			.from(
				'.section--first .rocket',
				{
					duration: 10,
					scale: 0.3,
					rotation: 30,
					x: '-140vw',
					y: '10vh',
					ease: 'none',
				},
				0
			)
			.to('.section--first h1', {
				duration: 5,
				delay: 2,
				scale: 0.5,
				ease: 'power1',
			});

		const secondSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--second',
				start: 'top bottom',
				end: 'bottom -100%',
				scrub: 0.6,
			},
		});

		secondSection
			.to(
				'.section--first h1',
				{
					duration: 3,
					y: '-300%',
				},
				0
			)
			.to(
				'.section--first canvas',
				{
					duration: 3,
					y: '50%',
					x: '10%',
					scale: 0.1,
					opacity: 0,
				},
				0
			)
			.from(
				'.section--second canvas',
				{
					duration: 2,
					scale: 0.5,
					x: '-40%',
					y: '50%',
				},
				0
			)
			.from(
				'.section--second .text-content',
				{
					duration: 2,
					y: '-20%',
				},
				0
			)
			.from(
				'.section--second .text-content',
				{
					delay: 0.5,
					duration: 1,
					opacity: 0,
				},
				0
			)
			.from(
				'.section--second .circle',
				{
					duration: 2,
					x: '200%',
				},
				0
			)
			.to(
				'.section--second',
				{
					delay: 2,
					duration: 1,
					color: '#fff',
					backgroundColor: '#4ab9a3',
					letterSpacing: '2px',
					lineHeight: 2,
				},
				1
			)
			.to(
				'.section--second .circle',
				{
					delay: 1,
					duration: 1,
					y: '20%',
					x: '-50%',
					scale: 2,
					backgroundColor: '#4ab9a3',
					borderRadius: 0,
				},
				1
			)
			.to(
				'.section--second canvas',
				{
					delay: 1,
					duration: 1,
					scale: 0.8,
					opacity: 0,
				},
				1
			)
			.from(
				'.section--second .additional-text',
				{
					delay: 1,
					duration: 0.5,
					opacity: 0,
					y: '-20%',
					stagger: 0.6,
				},
				2
			)
			.to(
				'.section--second',
				{
					delay: 1.5,
					duration: 1,
					rotation: 90,
				},
				3
			)
			.to(
				'.section--second',
				{
					delay: 3,
					duration: 2,
				},
				4
			);

		const thirdSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--third',
				start: 'top center',
				toggleActions: 'play reset none reset',
			},
		});

		thirdSection
			.from('.section--third h2', {
				duration: 2,
				opacity: 0,
				x: '-50vw',
				text: {
					value: ' ',
				},
			})
			.from('.section--third .text-content > p', {
				duration: 1,
				opacity: 0,
				y: '10vh',
			});

		// ______________ 2__________________
		// const TOP = 'TOP';
		// const BOTTOM = 'BOTTOM';

		// function goToSection(section, direction, anim) {
		// 	const scrollDuration = 2;

		// 	if (direction === BOTTOM) {
		// 		gsap.to(window, {
		// 			scrollTo: { y: section, autoKill: false },
		// 			duration: scrollDuration,
		// 		});
		// 	}

		// 	if (direction === TOP) {
		// 		gsap.to(window, {
		// 			scrollTo: { y: section, offsetY: window.innerHeight, autoKill: false },
		// 			duration: scrollDuration,
		// 		});
		// 	}

		// 	anim && anim.restart();
		// }

		// gsap.utils.toArray('section').forEach((section) => {
		// 	ScrollTrigger.create({
		// 		trigger: section,
		// 		start: 'top bottom',
		// 		onEnter: () => goToSection(section, BOTTOM),
		// 	});
		// 	ScrollTrigger.create({
		// 		trigger: section,
		// 		start: 'bottom top',
		// 		onEnterBack: () => goToSection(section, TOP),
		// 	});
		// });

		// ScrollTrigger.create({
		// 	snap: 1 / 8, // snap whole page to the closest section!
		// });
	})();

export default gsapAnimate;
