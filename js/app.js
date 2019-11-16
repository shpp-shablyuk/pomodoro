
var DEFAULT_WORK_TIME = 25*60;
var DEFAULT_SHORT_REST_TIME = 5*60;
var DEFAULT_LONG_REST_TIME = 10*60;

new Vue({
  el: "#pomodoro",
  data: {
    work: DEFAULT_WORK_TIME,
    shortRest: DEFAULT_SHORT_REST_TIME,
    longRest: DEFAULT_LONG_REST_TIME,
    currentTime: DEFAULT_WORK_TIME,
    activeTime: DEFAULT_WORK_TIME,
    isActive: false,
    activeTimer: null,
    activeTimerType: 'work',
    soundTimer: null,
    isShowSettings: false,
    sound: null
  },
  computed: {
    time: function() {
      var currentTime = this.secondsTommss(this.currentTime);

      document.title = currentTime;
      return currentTime;
    }
  },
  created: function () {
    this.sound = new Audio('./media/beep-07.wav');
  },
  methods: {
    start: function() {
      this.isActive = true;

      this.activateTimer();
    },
    startWork: function() {
      this.activeTimerType = 'work';

      this.currentTime = this.work;
      this.activeTime = this.work;
      this.isActive = true;

      this.activateTimer();
    },
    startShortRest: function() {
      this.activeTimerType = 'shortRest';

      this.currentTime = this.shortRest;
      this.activeTime = this.shortRest;
      this.isActive = true;

      this.activateTimer();
    },
    startLongRest: function() {
      this.activeTimerType = 'longRest';

      this.currentTime = this.longRest;
      this.activeTime = this.longRest;
      this.isActive = true;

      this.activateTimer();
    },
    pause: function() {
      if (!this.isActive) {
        this.activateTimer();
      } else {
        this.stopTimer();
        this.isActive = false;
      }
    },
    activateTimer: function () {
      this.stopTimer();
      var self = this;
      this.activeTimer = setInterval(function () {
        self.currentTime -= 1;
        if (self.currentTime <= 0) {
          self.stop();
          self.playSound();
        }
      }, 1000);
    },
    stop: function() {
      this.stopSound();
      this.stopTimer();
      this.currentTime = this.activeTime;
      this.isActive = false;
    },
    stopTimer: function () {
      if (this.activeTimer) {
        clearInterval(this.activeTimer);
      }
    },
    changeWorkTime: function (event) {
      if (this.activeTimerType === 'work') {
        this.setActiveTime(event.target.value, DEFAULT_WORK_TIME);
      }
    },
    changeShortRestTime: function (event) {
      if (this.activeTimerType === 'shortRest') {
        this.setActiveTime(event.target.value, DEFAULT_SHORT_REST_TIME);
      }
    },
    changeLongRestTime: function (event) {
      if (this.activeTimerType === 'longRest') {
        this.setActiveTime(event.target.value, DEFAULT_LONG_REST_TIME);
      }
    },
    setActiveTime: function (time, defaultTime) {
      this.activeTime = time ? time : defaultTime;
    },
    secondsTommss: function(totalSeconds) {
      var minutes = Math.floor((totalSeconds) / 60);
      var seconds = totalSeconds - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100;

      var result = (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
      return result;
    },
    playSound: function () {
      var self = this;
      this.soundTimer = setInterval(function () {
        self.sound.play();
      }, 1000);
    },
    stopSound: function () {
      if (this.soundTimer) {
        clearInterval(this.soundTimer);
      }
    }
  }

});
