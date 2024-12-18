"use client";
import { SquareArrowOutUpRight } from 'lucide-react';
import { Box, Link } from "@chakra-ui/react"

export default function LowerBanner() {
  return (
    <Box
      position={"fixed"}
      bottom="0%"
      width="100%"
      marginTop="1"
      borderColor="black"
      borderWidth="0px"
      borderRadius="0"
      bg='grey'
      opacity="95%"
      p="2"
      textAlign={'center'}
      fontSize="16"
      fontWeight="extrabold"
      color="grey.800"
    >

      <Link color="blue.700" href='https://github.com/PhilippeR26/starknet-WebSocket' > Repo<SquareArrowOutUpRight margin-left="2px"  /></Link>
      {" "}-  Powered by {" "}
      <Link color="blue.700" href='https://starknetjs.com' > Starknet.js v6.20.3<SquareArrowOutUpRight margin-left="2px" /></Link>
    </Box>
  )
}