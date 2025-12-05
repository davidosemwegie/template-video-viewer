import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import SVGComponent from "./svg";

export const Main = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Duration of one complete fade cycle (fade in + fade out)
  const cycleDuration = 2 * fps; // 2 seconds per cycle
  const fadeInDuration = 0.5 * fps; // 0.5 seconds to fade in
  const fadeOutDuration = 0.5 * fps; // 0.5 seconds to fade out
  const visibleDuration = cycleDuration - fadeInDuration - fadeOutDuration; // Time fully visible

  // Total duration for two cycles
  const twoCyclesDuration = 2 * cycleDuration;

  // Calculate opacity: fade in/out twice, then stay at 0
  let opacity = 0;

  if (frame < twoCyclesDuration) {
    // Get the current position within the two cycles
    const cyclePosition = frame % cycleDuration;

    // Calculate opacity for each cycle
    opacity = interpolate(
      cyclePosition,
      [0, fadeInDuration, fadeInDuration + visibleDuration, cycleDuration],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
  }

  return (
    <AbsoluteFill className="bg-white">
      <AbsoluteFill className="justify-center items-center">
        <div style={{ opacity }}>
          <SVGComponent />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
