import './styles/main.scss';
import gsapAnimate from './scripts/gsapAnimations';
import threeScenes from './scripts/threeScenes';

threeScenes();
gsapAnimate();

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
