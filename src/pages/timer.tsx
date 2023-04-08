import { BaseGrid } from "@/components/Elements/BaseGrid";
import { Config } from "@/config";
import { CopyAll } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import Head from "next/head";

const TimerCentralizeGrid = styled(Grid)({
  display: "flex",
  flex: "auto",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
});

const CodeBlock = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: theme.spacing(1),
  overflow: "auto",
  whiteSpace: "nowrap",
  width: "500px",
  cursor: "pointer",
  "& > *": {
    margin: 0,
  },
}));

const bookmarkletPattern = [
  { name: "Normal(Alarm, Title)", value: "normal" },
  { name: "No Sound(Title)", value: "no-sound" },
  { name: "Full Screen(Alarm, Title, FullScreen)", value: "full-screen" },
  {
    name: "Full Screen No Sound(Title, FullScreen)",
    value: "full-screen-no-sound",
  },
];
const generateBookmarklet = (pattern: string) => {
  const code = `javascript: (function (pattern) {
    const PATTERN = {
      NORMAL: "normal",
      NO_SOUND: "no-sound",
      FULL_SCREEN: "full-screen",
      FULL_SCREEN_NO_SOUND: "full-screen-no-sound",
    };

    const isFullScreen = () => {
      return (
        pattern === PATTERN.FULL_SCREEN ||
        pattern === PATTERN.FULL_SCREEN_NO_SOUND
      );
    };

    const isNoSound = () => {
      return (
        pattern === PATTERN.NO_SOUND || pattern === PATTERN.FULL_SCREEN_NO_SOUND
      );
    };

    class Alarm {
      constructor() {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        this.audioContext.resume();
      }

      play() {
        const startTime = this.audioContext.currentTime;
        const beepFrequency = 2000; /* Frequency in Hz */

        Array.from({ length: 3 }).forEach((_, index) => {
          const beep = this.createBeep(beepFrequency, startTime + index * 0.2);
          beep.start(startTime + index * 0.2);
          beep.stop(startTime + index * 0.2 + 0.1);
        });
      }

      createBeep(frequency, startTime) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(1, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        return oscillator;
      }
    }

    class CountdownTimer {
      constructor() {
        this.intervalId = null;
        this.pageTitle = document.title;
        if (isFullScreen()) this.timerBoard = this.createBoard();
      }

      start(seconds = 0, interval = 1) {
        let remaining = seconds;
        let timerId = null;

        this.updateTitle(remaining);
        if (isFullScreen()) {
          this.showBoard();
          this.updateBoard(remaining);
        }

        if (!timerId) {
          timerId = setInterval(() => {
            remaining -= interval;

            this.updateTitle(remaining);
            if (isFullScreen()) this.updateBoard(remaining);

            if (remaining <= 0) {
              clearInterval(timerId);
              timerId = null;
              this.resetTitle();
              if (isFullScreen()) this.timerBoard.innerHTML = "Time's up!";
              if (!isNoSound()) this.playAlarm();
            }
          }, interval * 1000);
        }
      }

      createBoard() {
        const timerBoard = document.createElement("div");
        timerBoard.style.position = "fixed";
        timerBoard.style.top = "0";
        timerBoard.style.left = "0";
        timerBoard.style.width = "100%";
        timerBoard.style.height = "100%";
        timerBoard.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        timerBoard.style.zIndex = "999999";
        timerBoard.style.display = "none";
        timerBoard.style.justifyContent = "center";
        timerBoard.style.alignItems = "center";
        timerBoard.style.color = "white";
        timerBoard.style.fontSize = "10rem";
        timerBoard.style.fontWeight = "bold";
        timerBoard.style.textAlign = "center";
        timerBoard.onclick = () => {
          if (this.intervalId) clearInterval(this.intervalId);
          this.timerBoard.remove();
        };
        document.body.appendChild(timerBoard);
        return timerBoard;
      }

      showBoard() {
        console.log("showBoard");
        this.timerBoard.style.display = "flex";
      }

      updateBoard(seconds) {
        const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secondsString = String(seconds % 60).padStart(2, "0");
        this.timerBoard.innerHTML = \`\${minutesString}:\${secondsString}\`;
      }

      updateTitle(seconds) {
        const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secondsString = String(seconds % 60).padStart(2, "0");
        document.title = \`\${minutesString}:\${secondsString}\`;
      }

      resetTitle() {
        document.title = this.pageTitle;
      }

      playAlarm() {
        const alarm = new Alarm();
        const interval = 1100; /* in milliseconds */
        this.intervalId = setInterval(() => {
          alarm.play();
        }, interval);

        const totalDuration = 5000; /* in milliseconds */
        alarm.play();
        setTimeout(() => {
          if (this.intervalId) clearInterval(this.intervalId);
        }, totalDuration);
      }
    }

    const timer = new CountdownTimer();
    const seconds = Number(
      prompt("Enter timer seconds in seconds:", String(300))
    );
    if (seconds > 0) timer.start(seconds);
  })("${pattern}");
  `;

  return code.replace(/\r?\n/g, "");
};

/* Countdown Timer */
export default function Timer() {
  return (
    <>
      <Head>
        <title>{"Timer | " + Config.title}</title>
      </Head>
      <BaseGrid>
        <TimerCentralizeGrid container spacing={2}>
          <Grid item>
            <Typography variant="h2" gutterBottom>
              TBD: Online Timer
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h2" gutterBottom>
              Bookmarklets
            </Typography>
            <Typography variant="body1" gutterBottom>
              Drag the following links to your bookmarks bar.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {bookmarkletPattern.map((pattern) => (
                <Grid item key={pattern.name}>
                  <Typography variant="body1" gutterBottom>
                    {pattern.name}
                  </Typography>
                  <CodeBlock
                    onClick={(event) => {
                      // Click to select text in the code block
                      const range = document.createRange();
                      range.selectNodeContents(event.target as Node);
                      const selection = window.getSelection();
                      if (!selection) return;
                      selection.removeAllRanges();
                      selection.addRange(range);
                    }}
                  >
                    {generateBookmarklet(pattern.value)}
                  </CodeBlock>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </TimerCentralizeGrid>
      </BaseGrid>
    </>
  );
}
