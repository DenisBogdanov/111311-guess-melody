import {changeScreen} from './util/screen-util';
import WelcomeView from './component/welcome-view';
import play from './controller';

const welcomeView = new WelcomeView();

changeScreen(welcomeView.element);

welcomeView.play = () => {
  play();
};
