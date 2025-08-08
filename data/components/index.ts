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
].sort((a, b) => a.id - b.id);
