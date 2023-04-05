import { BaseGrid } from "@/components/Elements/BaseGrid";
import { Config } from "@/config";
import { Grid, Paper, Typography, styled } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";

const ClockContainer = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  borderRadius: "50%",
});

const Hand = styled("div")(({ theme }) => ({
  position: "absolute",
  transformOrigin: "bottom center",
  backgroundColor: theme.palette.text.primary,
}));

const Dot = styled("div")(({ theme }) => ({
  width: 15,
  height: 15,
  borderRadius: "50%",
  backgroundColor: theme.palette.text.primary,
  position: "absolute",
}));

const AnalogClock = ({ date, diameter }: { date: Date; diameter: number }) => {
  const hour = date?.getHours() % 12;
  const minute = date?.getMinutes();
  const second = date?.getSeconds();
  const hourAngle = hour * 30 + minute / 2.0;
  const minuteAngle = minute * 6;
  const secondAngle = second * 6;
  const hourHeihgt = diameter / 4;
  const minuteHeihgt = diameter / 2.5;
  const secondHeihgt = diameter / 2.5;

  return (
    <ClockContainer
      elevation={3}
      sx={{
        width: diameter,
        height: diameter,
      }}
    >
      {[...Array(12)].map((_, i) => {
        const angle = i * 30;
        return (
          <Typography
            key={i}
            variant="body1"
            color={i === hour ? "primary" : "textprimary"}
            sx={{
              position: "absolute",
              transform: `rotate(${angle}deg)`,
              left: `${
                diameter * 0.485 + diameter * 0.45 * Math.sin((i * Math.PI) / 6)
              }px`,
              top: `${
                diameter * 0.465 - diameter * 0.45 * Math.cos((i * Math.PI) / 6)
              }px`,
            }}
          >
            {i === 0 ? 12 : i}
          </Typography>
        );
      })}
      <Hand
        sx={{
          backgroundColor: "primary.main",
          transform: `rotate(${hourAngle}deg)`,
          width: 8,
          height: hourHeihgt,
          top: (diameter - hourHeihgt) / 3,
          left: (diameter - 8) / 2,
        }}
      />
      <Hand
        sx={{
          transform: `rotate(${minuteAngle}deg)`,
          width: 4,
          height: minuteHeihgt,
          top: (diameter - minuteHeihgt) / 6,
          left: (diameter - 4) / 2,
        }}
      />
      <Hand
        sx={{
          backgroundColor: "error.main",
          transform: `rotate(${secondAngle}deg)`,
          width: 2,
          height: secondHeihgt,
          top: (diameter - secondHeihgt) / 6,
          left: (diameter - 4) / 2,
        }}
      />
      <Dot />
    </ClockContainer>
  );
};

const DigitalClock = ({ date }: { date: Date }) => {
  return (
    <Typography variant="h1" align="center" gutterBottom>
      {date.toLocaleTimeString()}
    </Typography>
  );
};

export default function Home(): JSX.Element {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{Config.title}</title>
        <meta name="description" content="Generate a random password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseGrid>
        <Grid container direction="column">
          <Grid item xs={12} justifyContent="center" display="flex">
            <DigitalClock date={time} />
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <AnalogClock date={time} diameter={400} />
          </Grid>
        </Grid>
      </BaseGrid>
    </>
  );
}
