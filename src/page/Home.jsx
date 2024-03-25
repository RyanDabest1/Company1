import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import NavBar from "../components/HomePage/NavBar.jsx";
import HeroSection from "../components/HomePage/Hero.jsx";
import "../components/assets/css/Home.css";
// Define a custom styled component for the cross box background

const Home = () => {
  return (
    // Apply the custom styled component as the background
    <Stack spacing={3}>
  <NavBar></NavBar>
  <HeroSection></HeroSection>
</Stack>
  );
};

export default Home;
