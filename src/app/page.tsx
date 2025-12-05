"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  defaultMyCompProps,
  CompositionProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "../remotion/MyComp/Main";

const Home: NextPage = () => {
  const [text] = useState<string>(defaultMyCompProps.title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
              height: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
        {/* <RenderControls
          text={text}
          setText={setText}
          inputProps={inputProps}
        ></RenderControls>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Tips></Tips> */}
      </div>
    </div>
  );
};

export default Home;
