import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

const gsapAnimate = () =>
	(function () {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

		gsap.timeline().from('.section--first h1 span', {
			duration: 1.5,
			delay: 1,
			opacity: 0,
			y: '-50%',
			ease: 'power1',
			stagger: 0.15,
		});

		const firstSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--first',
				pin: true,
				start: 'top top',
				end: 'bottom -150%',
				scrub: true,
			},
		});

		firstSection
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
					duration: 5,
					delay: 0.5,
					scale: 0.5,
					x: '-40%',
					ease: 'power1',
				},
				0
			)
			.to('.section--first h1', {
				duration: 5,
				delay: 3,
				scale: 0.5,
				ease: 'power1',
			});

		const secondSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--second',
				start: 'top bottom',
				end: 'bottom -150%',
				scrub: true,
			},
		});

		secondSection
			.to(
				'.section--first h1',
				{
					duration: 5,
					y: '-100%',
				},
				0
			)
			.to(
				'.section--first canvas',
				{
					duration: 5,
					y: '100%',
					x: '10%',
					scale: 0.3,
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
					y: '-150vh',
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
				'.section--second .circle',
				{
					delay: 1,
					duration: 2,
					y: '100%',
					x: '100%',
				},
				1
			)
			.to(
				'.section--second .text-content',
				{
					duration: 2,
					delay: 1,
					opacity: 0,
					x: '-100%',
				},
				1
			)
			.to(
				'.section--second canvas',
				{
					duration: 4,
					delay: 1,
					scale: 1.2,
					x: '40%',
					y: '-190%',
				},
				1
			);

		const thirdSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--third',
				start: 'top 50%',
				end: 'bottom bottom',
				scrub: true,
			},
		});

		thirdSection
			.from(
				'.section--third h2',
				{
					duration: 10,
					opacity: 0,
					x: '-50vw',
					text: {
						value: ' ',
					},
				},
				0
			)
			.from(
				'.section--third .text-content > p',
				{
					duration: 10,
					opacity: 0,
					y: '50vh',
				},
				0
			);

		// ______________ 2__________________
		function goToSection(section, anim) {
			gsap.to(window, {
				scrollTo: { y: section, autoKill: true },
				duration: 2,
				delay: 0,
			});

			if (anim) {
				anim.restart();
			}
		}

		gsap.utils.toArray('section').forEach((section) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top 90%',
				onEnter: () => goToSection(section),
			});

			// ScrollTrigger.create({
			// 	toggleActions: 'play complete reverse reset',
			// 	trigger: section,
			// 	start: 'bottom bottom',
			// 	onEnterBack: () => goToSection(section, index),
			// });
		});
	})();

export default gsapAnimate;
