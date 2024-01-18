export const usePlayerStore = defineStore('player', () => {
  const audioList = [
    {
      id: 1,
      src: '/audio/audio1.mp3',
      img: '/images/music.jpeg',
    },
    {
      id: 2,
      src: '/audio/audio2.mp3',
      img: '/images/music.jpeg',
    },
    {
      id: 3,
      src: '/audio/audio3.mp3',
      img: '/images/music.jpeg',
    },
    {
      id: 4,
      src: '/audio/audio4.mp3',
      img: '/images/music.jpeg',
    },
    {
      id: 5,
      src: '/audio/audio5.mp3',
      img: '/images/music.jpeg',
    },
  ];
  const audioElemntsList = [];
  const activeAudioElement = reactive({
    id: null,
    audio: null,
  });
  const activeAudioCurrentTimeInSeconds = ref(0);
  const audioPlayProgress = ref(0);

  return {
    audioList,
    audioElemntsList,
    activeAudioElement,
    activeAudioCurrentTimeInSeconds,
    audioPlayProgress,
  };
});
