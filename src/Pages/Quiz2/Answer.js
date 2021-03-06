import * as React from "react";
import Button from "@mui/material/Button";
import NextQuestion from "./NextQuestion";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useScoreContext } from "../../components/Context/ResultContext";
import { useUpdateScoreContext } from "../../components/Context/ResultContext";

import {
  AnswerStyles,
  CorrectStyles,
  DisableStyles,
  WrongStyles,
} from "./Styling";

function CorrectAnswer() {

  // these are the flags that we will use to determine what the 
  // page should do and what elements should be shown
  
  const [correctFlag, setcorrectFlag] = React.useState(true);
  const [disableCorrectFlag, setdisableCorrectFlag] = React.useState(true);
  const [wrongFlag, setWrongFlag] = React.useState(true);
  const [disableWrongFlag, setdisableWrongFlag] = React.useState(true);
  const [next, setNext] = React.useState(true);

  // for updating score -------------------------------------------------
  const score = useScoreContext();
  const updateScore = useUpdateScoreContext();
  // --------------------------------------------------------------------

  // this function will be run if the button containing the wrong option is chosen
  const handleClickWrong = () => {
    setWrongFlag(!wrongFlag);
    setNext(!next);
    setdisableCorrectFlag(!disableCorrectFlag);
  };

  // this function will be run if the button containing the right option is chosen
  const handleClickCorrect = () => {
    setcorrectFlag(!correctFlag);
    setNext(!next);
    setdisableWrongFlag(!disableWrongFlag);
    // next line is where we update the score
    updateScore(Number(score) + 1);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        spacing={13}
        justifyContent="center"
        alignItems="center"
      >
        {disableWrongFlag ? (
          !wrongFlag ? (
            <Button sx={WrongStyles} variant="contained" size="medium">
              <Typography style={{ fontWeight: 600 }}>Wrong!</Typography>
            </Button>
          ) : (
            <Button
              sx={AnswerStyles}
              onClick={handleClickWrong}
              variant="contained"
              size="medium"
            >
              <Typography style={{ fontWeight: 600 }}>Trust!</Typography>
            </Button>
          )
        ) : (
          <Button sx={DisableStyles} variant="contained" size="medium">
            <Typography style={{ fontWeight: 600 }}>Trust!</Typography>
          </Button>
        )}

        {disableCorrectFlag ? (
          !correctFlag ? (
            <Button sx={CorrectStyles} variant="contained" size="medium">
              <Typography style={{ fontWeight: 600 }}>Right!</Typography>
            </Button>
          ) : (
            <Button
              sx={AnswerStyles}
              onClick={handleClickCorrect}
              variant="contained"
              size="medium"
            >
              <Typography style={{ fontWeight: 600 }}>don't trust!</Typography>
            </Button>
          )
        ) : (
          <Button sx={DisableStyles} variant="contained" size="medium">
            <Typography style={{ fontWeight: 600 }}>don't trust!</Typography>
          </Button>
        )}
      </Stack>
      {!next ? (
        <NextQuestion />
      ) : (
        <Button
          style={{
            maxWidth: "600px",
            maxHeight: "45px",
            minWidth: "600px",
            minHeight: "45px",
          }}
          disabled
          variant="contained"
          size="medium"
        >
          Next Question
        </Button>
      )}
    </Stack>
  );
}
export default CorrectAnswer;
