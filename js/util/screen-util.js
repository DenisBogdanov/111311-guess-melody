export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper.firstElementChild;
  // return wrapper;
};

export const changeScreen = (element) => {
  const uiMain = document.querySelector(`section.main`);
  uiMain.innerHTML = ``;
  uiMain.appendChild(element);
};
