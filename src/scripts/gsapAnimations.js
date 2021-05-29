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
					delay: 1,
					duration: 1.5,
					opacity: 0,
					y: '-90%',
					rotateX: '30',
					transformOrigin: 'bottom',
					ease: 'power1',
				},
				0
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
				1
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

		const firstSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--first',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 0.6,
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
			.to('.section--first h1', {
				duration: 5,
				delay: 3,
				scale: 0.5,
				ease: 'power1',
			});

		const secondSection = gsap.timeline({
			scrollTrigger: {
				trigger: '.section--second',
				start: 'top 80%',
				end: 'bottom -100%',
				scrub: 0.6,
			},
		});

		secondSection
			.to(
				'.section--first h1',
				{
					duration: 5,
					y: '-500%',
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
					duration: 4,
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
				'.section--second .circle',
				{
					delay: 2,
					duration: 2,
					y: '50%',
					x: '50%',
				},
				1
			)
			.to(
				'.section--second .text-content',
				{
					delay: 2,
					duration: 2,
					opacity: 0,
					x: '-50%',
				},
				1
			)
			.to(
				'.section--second canvas',
				{
					delay: 2,
					duration: 4,
					scale: 1.2,
					x: '40%',
					y: '-50%',
				},
				1
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
		const TOP = 'TOP';
		const BOTTOM = 'BOTTOM';

		function goToSection(section, direction, anim) {
			const scrollDuration = 2;

			if (direction === BOTTOM) {
				gsap.to(window, {
					scrollTo: { y: section, autoKill: false },
					duration: scrollDuration,
				});
			}

			if (direction === TOP) {
				gsap.to(window, {
					scrollTo: { y: section, offsetY: window.innerHeight, autoKill: false },
					duration: scrollDuration,
				});
			}

			anim && anim.restart();
		}

		gsap.utils.toArray('section').forEach((section) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top bottom',
				// start: 'top 95%',
				onEnter: () => goToSection(section, BOTTOM),
				// onEnterBack: () => goToSection(section),
				// end: 'bottom top+=1',
				// pin: true,
				// pinSpacing: false,
				// snap: 1 / 2,
			});
			ScrollTrigger.create({
				trigger: section,
				start: 'bottom top',
				onEnterBack: () => goToSection(section, TOP),
			});
		});

		// ScrollTrigger.create({
		// 	snap: 1 / 4, // snap whole page to the closest section!
		// });
	})();

export default gsapAnimate;
