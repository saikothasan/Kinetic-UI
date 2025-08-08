import { type ComponentProps } from "../types";
import shinyButton from "./shiny-button";
import typewriterEffect from "./typewriter-effect";
import auroraBackground from "./aurora-background";
import parallaxScroll from "./parallax-scroll";
import dockMenu from "./dock-menu";
import floatingCard from "./floating-card";
import animatedTabs from "./animated-tabs";
import confettiCannon from "./confetti-cannon";
import textReveal from "./text-reveal";
import bentoGrid from "./bento-grid";
import spotlightCard from "./spotlight-card";
import animatedBarChart from "./animated-bar-chart";
import meteorEffect from "./meteor-effect";
import numberTicker from "./number-ticker";
import animatedGradientText from "./animated-gradient-text";
import draggableSlider from "./draggable-slider";
import interactiveGlobe from "./interactive-globe";
import animatedTimeline from "./animated-timeline";
import lampEffect from "./lamp-effect";
import magicInput from "./magic-input";
import rippleButton from "./ripple-button";
import gridDotBackground from "./grid-dot-background";
import followerPointer from "./follower-pointer";
import cardStack from "./card-stack";
import evervaultCard from "./evervault-card";
import sparklesEffect from "./sparkles-effect";

export const componentsData: ComponentProps[] = [
  shinyButton,
  typewriterEffect,
  auroraBackground,
  parallaxScroll,
  dockMenu,
  floatingCard,
  animatedTabs,
  confettiCannon,
  textReveal,
  bentoGrid,
  spotlightCard,
  animatedBarChart,
  meteorEffect,
  numberTicker,
  animatedGradientText,
  draggableSlider,
  interactiveGlobe,
  animatedTimeline,
  lampEffect,
  magicInput,
  rippleButton,
  gridDotBackground,
  followerPointer,
  cardStack,
  evervaultCard,
  sparklesEffect,
].sort((a, b) => a.id - b.id);
