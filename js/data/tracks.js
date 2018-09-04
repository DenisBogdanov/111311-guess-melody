// Music from https://www.youtube.com/audiolibrary/music?feature=blog
const tracks = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Quincas Moreira`,
    name: `Firefly`,
    image: `http://www.atribuna.com.br/fileadmin/_processed_/csm_Quincas-Moreira-Foto-Divulgacao_76d1a8b00e.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    genre: `Electronic`
  }
];

const getRandomTrack = () => {
  return tracks[Math.floor(Math.random() * tracks.length)];
};

const shuffleOptions = (options) => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

const containsOption = (array, option) => {
  return array.filter((item) => item.artist === option.artist && item.name === option.name).length > 0;
};


const getGenreQuestions = (quantity) => {
  const questions = [];
  for (let i = 0; i < quantity; i++) {

    const randomTrack = getRandomTrack();

    const options = [randomTrack];
    while (options.length < 4) {
      const trackToAdd = getRandomTrack();
      if (!containsOption(options, trackToAdd)) {
        options.push(trackToAdd);
      }
    }

    const question = {
      question: `Выберите ${randomTrack.genre}`,
      answer: `${randomTrack.genre}`,
      options: shuffleOptions(options)
    };

    questions.push(question);
  }

  return questions;
};


const getArtistQuestions = (quantity) => {
  const questions = [];
  for (let i = 0; i < quantity; i++) {

    const randomTrack = getRandomTrack();

    const options = [randomTrack];
    while (options.length < 3) {
      const trackToAdd = getRandomTrack();
      if (!containsOption(options, trackToAdd)) {
        options.push(trackToAdd);
      }
    }

    const question = {
      question: `Кто исполняет эту песню?`,
      answer: randomTrack,
      options: shuffleOptions(options)
    };

    questions.push(question);
  }

  return questions;
};

export default (quantityOfEachType) => {
  const questions = [];
  const genreQuestions = getGenreQuestions(5);
  const artistQuestions = getArtistQuestions(5);
  for (let i = 0; i < quantityOfEachType; i++) {
    questions.push(genreQuestions[i]);
    questions.push(artistQuestions[i]);
  }
  return questions;
};
