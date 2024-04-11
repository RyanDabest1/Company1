import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import NavBar from "../components/HomePage/NavBar.jsx";
import HeroSection from "../components/HomePage/Hero.jsx";
import { getCredentials } from "../functions/funct.js";
import { useEffect } from "react";
import {useState} from "react"
import { User } from "../components/utils/userData.js";
// Define a custom styled component for the cross box background

const Home = () => {
  useEffect(() => {
    document.title = 'Aunty Aye';
  }, [])
  return (
    <>
  <Stack spacing={3}>
  <NavBar></NavBar>
  <HeroSection></HeroSection>
</Stack>


</>
)
  
};

export default Home;
