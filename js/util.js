const uiMain = document.querySelector(`section.main`);

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper.firstElementChild;
};

export const changeScreen = (element) => {
  uiMain.innerHTML = ``;
  uiMain.appendChild(element);
};
